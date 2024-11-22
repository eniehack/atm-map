<script lang="ts">
	import {
		MapLibre,
		NavigationControl,
		ScaleControl,
		GeoJSONSource,
		CircleLayer,
		SymbolLayer,
		Popup,
		GeolocateControl,
		FillLayer,
		LineLayer
	} from 'svelte-maplibre-gl';
	import maplibregl from 'maplibre-gl';
	import { osm, dark } from './style';
	import { base } from '$app/paths';
	import Fuse from 'fuse.js';
	import type { FuseResult } from 'fuse.js';
	import { distance } from '@turf/distance';
	import { buffer } from '@turf/buffer';
	import { point } from '@turf/helpers';
	import { fade } from 'svelte/transition';
	import { debounce } from 'es-toolkit';
	import { Protocol } from 'pmtiles';
	import openingHours from 'opening_hours';

	let protocol = new Protocol();
	maplibregl.addProtocol('pmtiles', protocol.tile);

	type PopupArgument = {
		lng: number;
		lat: number;
		content: string;
	};
	let popup = $state<null | PopupArgument>(null);
	// NOTE: https://www.wikidata.org/wiki/Q11500940 をリンクしている銀行をリストアップする
	const queryMacroMap: Map<string, object> = new Map([
		[
			'ソニー銀行',
			{
				$or: [
					{ brand: '^セブン' },
					{ brand: '"7-ELEVEN"' },
					{ brand: '^LAWSON' },
					{ brand: '^ローソン' },
					{ brand: '^イオン' },
					{ brand: '"ミニストップ"' },
					{ brand: '"ミニストップ"' },
					{ brand: '三菱UFJ' },
					{ brand: '^三井住友' },
					{ brand: 'イーネット' }
				]
			}
		],
		['UI銀行', {}],
		['みんなの銀行', {}],
		['大和ネクスト銀行', {}],
		['auじぶん銀行', {}],
		['住信SBIネット銀行', {}],
		['ゆうちょ銀行', { $or: [{ name: '郵便局' }, { brand: 'ゆうちょ銀行' }] }]
	]);

	type LatLng = [number, number];
	type Index = {
		brand: string | null;
		opening_hours: string | null;
		name: string | null;
		geom: LatLng;
	};

	type GeoJSONFeature = {
		fid: number;
		brand: string | null;
		opening_hours: string | null;
		name: string | null;
	};
	type GeoJSON = {
		type: string;
		name?: string;
		crs?: object;
		features: {
			type: string;
			properties: GeoJSONFeature;
			geometry: {
				type: string;
				coordinates: [number, number];
			};
		}[];
	};
	let atmIndex = $state<Fuse<Index>>();
	let atm = $state<GeoJSON>();
	let convenienceIndex = $state<Fuse<Index>>();
	let convenience = $state<GeoJSON>();
	let query = $state<string>();
	let userLocation = $state<[number, number]>();
	let isTextFieldFocused = $state(false);

	const fetchAtmData = async () => {
		const resp = await fetch(`${base}/atm.json`);
		const json = (await resp.json()) as GeoJSON;
		atm = json;
		const index = [] as Index[];
		json.features.forEach((feature) => {
			index.push({
				brand: feature.properties.brand,
				opening_hours: feature.properties.opening_hours,
				name: feature.properties.name,
				fid: feature.properties.fid,
				geom: feature.geometry.coordinates
			} as Index);
		});
		atmIndex = new Fuse(index, { keys: ['brand', 'name'] });
	};

	const fetchConvenienceData = async () => {
		const resp = await fetch(`${base}/convenience.json`);
		const json = (await resp.json()) as GeoJSON;
		convenience = json;
		const index = [] as Index[];
		json.features.forEach((feature) => {
			index.push({
				brand: feature.properties.brand,
				opening_hours: feature.properties.opening_hours,
				name: feature.properties.name,
				fid: feature.properties.fid,
				geom: feature.geometry.coordinates
			} as Index);
		});
		convenienceIndex = new Fuse(index, { keys: ['brand', 'name'] });
	};

	const createGeoJsonFromIndex = (result: FuseResult<Index>[]): GeoJSON => {
		let root = {
			type: 'FeatureCollection',
			name: 'searchResults',
			crs: { type: 'name', properties: { name: 'urn:ogc:def:crs:OGC:1.3:CRS84' } },
			features: []
		} as GeoJSON;
		result.forEach((elem) => {
			root.features.push({
				type: 'Feature',
				properties: {
					fid: elem.item.fid,
					brand: elem.item.brand,
					opening_hours: elem.item.opening_hours,
					name: elem.item.name
				},
				geometry: {
					type: 'Point',
					coordinates: elem.item.geom
				}
			});
		});
		return root;
	};
	type NearPoint = {
		distance: number;
		feature: GeoJSONFeature;
		coordinate: [number, number];
	};
	const findNearestPoint = () => {
		if (typeof atm === 'undefined' || typeof convenience === 'undefined') return null;
		if (typeof userLocation === 'undefined') return null;
		const target = [...filteredAtmData.features, ...filteredConvenienceData.features];
		const filteredPoints = [] as NearPoint[];
		target.forEach((point) => {
			const d = distance(userLocation, point.geometry.coordinates);
			if (d < thresholdDistance) {
				filteredPoints.push({
					distance: d,
					feature: point.properties,
					coordinate: point.geometry.coordinates
				});
			}
		});
		filteredPoints.sort((a, b) => a.distance - b.distance);
		return filteredPoints.slice(0, 9);
	};
	const findNearestPointWithQuery = () => {
		if (typeof filteredAtmData === 'undefined' || typeof filteredConvenienceData === 'undefined')
			return null;
		if (typeof userLocation === 'undefined') return null;
		const target = [...filteredAtmData.features, ...filteredConvenienceData.features];
		const filteredPoints = [] as NearPoint[];
		target.forEach((point) => {
			const d = distance(userLocation!, point.geometry.coordinates);
			if (d < thresholdDistance) {
				filteredPoints.push({
					distance: d,
					feature: point.properties,
					coordinate: point.geometry.coordinates
				});
			}
		});
		filteredPoints.sort((a, b) => a.distance - b.distance);
		return filteredPoints.slice(0, 9);
	};

	let filteredAtmData = $state(createGeoJsonFromIndex([]));
	let filteredConvenienceData = $state(createGeoJsonFromIndex([]));

	/**
	 * Fuseインデックスの検索を実行し、stateを更新する
	 */
	const handleQuery = debounce((query: string) => {
		if (typeof atmIndex === 'undefined') {
			filteredAtmData = createGeoJsonFromIndex([]);
			return;
		}
		if (typeof convenienceIndex === 'undefined') {
			filteredConvenienceData = createGeoJsonFromIndex([]);
			return;
		}

		if (typeof query === 'undefined' || query === '') {
			filteredAtmData = atm ?? createGeoJsonFromIndex([]);
			filteredConvenienceData = convenience ?? createGeoJsonFromIndex([]);
			return;
		}

		const q = queryMacroMap.has(query) ? queryMacroMap.get(query) : query;
		const resultAtm = atmIndex.search(q!);
		const resultConvenience = convenienceIndex.search(q!);
		filteredAtmData = createGeoJsonFromIndex(resultAtm);
		filteredConvenienceData = createGeoJsonFromIndex(resultConvenience);
	}, 500); // 500ms

	let nearPoint = $derived.by(() => {
		if (typeof query === 'undefined' || query.length === 0) {
			if (typeof convenience === 'undefined' && typeof atm === 'undefined') return;
			return findNearestPoint();
		}
		if (typeof filteredAtmData === 'undefined' && typeof filteredConvenienceData === 'undefined')
			return;
		return findNearestPointWithQuery();
	});

	$effect(() => {
		Promise.all([fetchAtmData(), fetchConvenienceData()]).then(() => {
			handleQuery('');
			map?.loadImage(`${base}/icon-atm.png`).then((img) => {
				map?.addImage('icon-atm', img.data, { sdf: true });
			});
			map?.loadImage(`${base}/icon-convenience.png`).then((img) => {
				map?.addImage('icon-convenience', img.data, { sdf: true });
			});
		});
	});

	const distances = [
		{
			name: '100m',
			value: 0.1
		},
		{
			name: '200m',
			value: 0.2
		},
		{
			name: '500m',
			value: 0.5
		},
		{
			name: '1km',
			value: 1
		},
		{
			name: '5km',
			value: 5
		}
	];
	let thresholdDistance = $state<number>(0.1);

	let map = $state<maplibregl.Map | undefined>(undefined);

	let circleFromUserPosition: any = $derived.by(() => {
		if (typeof userLocation === 'undefined')
			return {
				type: 'FeatureCollection',
				features: []
			};
		const p = point(userLocation);
		const buffered = buffer(p, thresholdDistance);
		return buffered;
	});

	let nowAvailableFilterFlag = $state(false);
	const filterByOpeningHour = (targetPoints: GeoJSON, targetDate: Date): GeoJSON => {
		const feat = targetPoints.features.filter((val) => {
			if (val.properties.opening_hours === null) return false;
			try {
				const oh = new openingHours(val.properties.opening_hours, null, {
					mode: 0,
					tag_key: undefined,
					map_value: undefined,
					warnings_severity: undefined,
					locale: 'JP'
				});
				return oh.getState(targetDate);
			} catch (error) {
				return false;
			}
		});

		return {
			type: 'FeatureCollection',
			name: 'searchResults',
			crs: { type: 'name', properties: { name: 'urn:ogc:def:crs:OGC:1.3:CRS84' } },
			features: feat
		};
	};

	let isDarkMode = $state(false);
	const title = "ATMマップ"
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="og:title" content={title} />
	<meta name="og:type" content="website" />
	<meta name="og:url" content={base} />
	<meta name="og:locale" content="ja-JP" />
	<meta name="og:description" content="身近にあるATMの場所を一覧できるサイト" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content="身近にあるATMの場所を一覧できるサイト" />
	<meta name="twitter:creators" content="@eniehack" />
	<meta name="twitter:card" content="summary" />
</svelte:head>

<div class="fixed bottom-0 top-14">
	<MapLibre
		bind:map
		class="h-full w-screen"
		style={isDarkMode ? dark : osm}
		zoom={4}
		center={{ lng: 141.350331, lat: 43.068643 }}
	>
		<NavigationControl />
		<ScaleControl />
		<GeolocateControl
			trackUserLocation={true}
			ongeolocate={(e) => (userLocation = [e.coords.longitude, e.coords.latitude])}
		/>
		<GeoJSONSource data={circleFromUserPosition}>
			<FillLayer
				paint={{
					'fill-color': '#00bfff',
					'fill-opacity': 0.5
				}}
			/>
			<LineLayer
				paint={{
					'line-color': 'white',
					'line-width': 2
				}}
			/>
		</GeoJSONSource>
		<GeoJSONSource data={filteredConvenienceData as any} cluster={true}>
			<CircleLayer
				paint={{ 'circle-color': 'white', 'circle-radius': 15 }}
				onclick={(e) => {
					popup = {
						lat: e.lngLat.lat,
						lng: e.lngLat.lng,
						content:
							typeof e.features !== 'undefined'
								? `<p>${e.features[0].properties['name']}</p><p>営業時間: ${e.features[0].properties['opening_hours']}</p>`
								: ''
					};
					map?.flyTo({ center: e.lngLat });
				}}
			/>
			<SymbolLayer
				paint={{
					'icon-color': [
						'case',
						['in', ['get', 'fid'], ['literal', (nearPoint ?? []).map((val) => val.feature.fid)]],
						'red',
						'blue'
					]
				}}
				layout={{
					'icon-image': 'icon-convenience',
					'icon-size': 0.6,
					'icon-allow-overlap': true
				}}
			/>
			<SymbolLayer
				layout={{
					'text-font': ['Noto Sans Bold'],
					'text-field': '{brand}',
					'text-offset': [0, 1]
				}}
				paint={{
					'text-halo-width': 2,
					'text-halo-color': 'white'
				}}
			/>
		</GeoJSONSource>
		<GeoJSONSource data={filteredAtmData as any}>
			<CircleLayer
				paint={{ 'circle-color': 'white', 'circle-radius': 15 }}
				onclick={(e) => {
					const oh = new openingHours(e.features[0].properties['opening_hours']);
					popup = {
						lat: e.lngLat.lat,
						lng: e.lngLat.lng,
						content:
							typeof e.features !== 'undefined'
								? `<p>${e.features[0].properties['name']}</p><p>営業時間: ${e.features[0].properties['opening_hours']}（${oh.getStateString()}）</p>`
								: ''
					};
					map?.flyTo({ center: e.lngLat });
				}}
			/>
			<SymbolLayer
				paint={{
					'icon-color': [
						'case',
						['in', ['get', 'fid'], ['literal', (nearPoint ?? []).map((val) => val.feature.fid)]],
						'red',
						'#FFC300'
					]
				}}
				layout={{
					'icon-image': 'icon-atm',
					'icon-size': 0.6,
					'icon-allow-overlap': true
				}}
			/>
			<SymbolLayer
				layout={{
					'text-field': ['format', ['coalesce', ['get', 'brand'], ['get', 'name']]],
					'text-font': ['Noto Sans Bold'],
					'text-offset': [0, 1]
				}}
				paint={{
					'text-halo-width': 2,
					'text-halo-color': 'white'
				}}
			/>
		</GeoJSONSource>

		{#if popup !== null}
			<Popup lnglat={{ lng: popup.lng, lat: popup.lat }} onclose={() => (popup = null)}
				>{@html popup.content}</Popup
			>
		{/if}
	</MapLibre>
</div>
<div class="absolute top-16 left-2 bg-white rounded-lg p-2">
	<input
		type="text"
		id="q"
		bind:value={query}
		oninput={(e) => {
			// @ts-ignore
			handleQuery(e.target.value);
		}}
		placeholder="ここから絞り込み検索"
		class="bg-neutral-500 p-2 rounded-full w-[17rem]"
		onfocus={() => (isTextFieldFocused = true)}
		onblur={() => (isTextFieldFocused = false)}
	/>
	<div>
		<label for="now-available">現在営業中</label>
		<input
			type="checkbox"
			name="now-available"
			bind:checked={nowAvailableFilterFlag}
			onchange={() => {
				if (typeof atm === 'undefined') return;
				if (nowAvailableFilterFlag) {
					filteredAtmData = filterByOpeningHour(filteredAtmData, new Date());
				} else {
					handleQuery(query ?? '');
				}
			}}
		/>
	</div>
	<!--<select
		name="brand"
		id="select-brand"
		bind:value={convenienceSelectedBrand}
		onchange={() => console.log($state.snapshot(convenienceSelectedBrand))}
	>
		{#each brands as brand (brand.name)}
			<option value={brand.name}>{brand.displayName[0]}</option>
		{/each}
	</select>-->
</div>
{#if isTextFieldFocused && ((typeof query !== 'undefined' && query.length == 0) || typeof query === 'undefined')}
	<div
		class="absolute top-28 left-4 w-64 p-2 bg-gray-100 border border-gray-300 rounded shadow text-gray-600"
		transition:fade
	>
		<p>あいまい検索に対応しています。例: 「ファミマ」→ファミリーマートが表示される、など。</p>
		<p>完全一致させたい場合は「"」で囲ってください。例: 「"北海道銀行"」</p>
		<p>
			ネット銀行などATMを持たない一部の金融機関もそのまま銀行名を入力することで対応するATMを検索できます。
		</p>
	</div>
{/if}
<div
	class="absolute top-[13rem] right-2.5 bg-white rounded size-[29px]"
	onclick={() => {
		isDarkMode = !isDarkMode;
		if (isDarkMode) {
			document.body.className = 'dark';
		} else {
			document.body.className = '';
		}
	}}
>
	<span class="grid place-items-center p-1 text-red-200">
		{#if isDarkMode}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="100%"
				height="100%"
				fill="#2D7BBE"
				class="bi bi-moon-fill"
				viewBox="0 0 16 16"
			>
				<path
					d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278"
				/>
			</svg>
		{:else}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="100%"
				height="100%"
				fill="#ffc300"
				class="bi bi-sun-fill"
				viewBox="0 0 16 16"
			>
				<path
					d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"
				/>
			</svg>
		{/if}
	</span>
</div>
<div class="absolute bottom-10 left-2 bg-white rounded-lg p-2">
	<p class="font-semibold pb-2">現在地から近いATMを検索する</p>
	<div class="pb-2">
		<select
			id="near-threshold"
			onchange={(e) => {
				if (e.target !== null) {
					// @ts-ignore
					thresholdDistance = Number(e.target.value);
				}
			}}
		>
			{#each distances as d (d.name)}
				<option value={d.value}>{d.name} 圏内</option>
			{/each}
		</select>
	</div>
	{#if typeof nearPoint !== 'undefined' && nearPoint !== null}
		{#if nearPoint.length !== 0}
			<div class="overflow-y-auto h-[160px]">
				{#each nearPoint as point}
					<div
						role="button"
						tabindex="0"
						class="block bg-red-200 md:p-1.5 p-1 cursor-pointer hover:bg-red-400"
						onkeydown={() => {}}
						onclick={() => {
							map?.flyTo({ center: point.coordinate });
							const oh =
								point.feature.opening_hours !== null
									? new openingHours(point.feature.opening_hours)
									: null;
							if (oh !== null) {
								//console.log(oh.getIterator())
								//console.log(oh.getOpenIntervals())
								var from = new Date('08 Jan 2012');
								var to = new Date('15 Jan 2012');
								const intervals = oh.getOpenIntervals(from, to);
								console.log(intervals);
							}
							popup = {
								lat: point.coordinate[1],
								lng: point.coordinate[0],
								content: `<p>${point.feature.name}</p><p>営業時間: ${point.feature.opening_hours}${oh !== null ? '（' + oh.getState() + '）' : ''}</p>`
							};
						}}
					>
						{#if point.feature.brand !== null}
							{point.feature.brand}
						{:else}
							{point.feature.name}
						{/if}
						({Math.round(point.distance * 1000)} m)
					</div>
				{/each}
			</div>
		{:else}
			<p>なにもありません。検索範囲を広げてみてください。</p>
		{/if}
		<!-- TODO: ここをclickするとpopupが出てきてpanするとうれしい気がする -->
	{/if}
</div>
