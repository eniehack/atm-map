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
	import DarkmodeControl from '$lib/DarkmodeControl.svelte';
	import { mapStyle, isDarkMode } from '$lib/store';

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

	type Index = {
		feature_id: number;
		brand: string | null;
		opening_hours: string | null;
		name: string | null;
		geom: Position;
	};

	type MyGeoJSONFeature = {
		feature_id: number;
		brand: string | null;
		opening_hours: string | null;
		name: string | null;
	};
	type MyGeoJSON = GeoJSON.FeatureCollection<GeoJSON.Point, MyGeoJSONFeature> & {
		name?: string;
		crs?: {
			type: string;
			properties: {
				name: string;
			};
		};
	};
	type Position = [number, number];
	let atmIndex = $state<Fuse<Index>>();
	let atm = $state<MyGeoJSON>();
	let convenienceIndex = $state<Fuse<Index>>();
	let convenience = $state<MyGeoJSON>();
	let query = $state<string>();
	let userLocation = $state<[number, number]>();
	let isTextFieldFocused = $state(false);

	const fetchAtmData = async () => {
		const resp = await fetch(`${base}/atm.json`);
		const json = (await resp.json()) as MyGeoJSON;
		atm = json;
		const index = [] as Index[];
		json.features.forEach((feature) => {
			index.push({
				brand: feature.properties.brand,
				opening_hours: feature.properties.opening_hours,
				name: feature.properties.name,
				feature_id: feature.properties.feature_id,
				geom: feature.geometry.coordinates
			} as Index);
		});
		atmIndex = new Fuse(index, { keys: ['brand', 'name'] });
	};

	const fetchConvenienceData = async () => {
		const resp = await fetch(`${base}/convenience.json`);
		const json = (await resp.json()) as MyGeoJSON;
		convenience = json;
		const index = [] as Index[];
		json.features.forEach((feature) => {
			index.push({
				brand: feature.properties.brand,
				opening_hours: feature.properties.opening_hours,
				name: feature.properties.name,
				feature_id: feature.properties.feature_id,
				geom: feature.geometry.coordinates
			} as Index);
		});
		convenienceIndex = new Fuse(index, { keys: ['brand', 'name'] });
	};

	const createGeoJsonFromIndex = (result: FuseResult<Index>[]): MyGeoJSON => {
		let root = {
			type: 'FeatureCollection',
			name: 'searchResults',
			crs: { type: 'name', properties: { name: 'urn:ogc:def:crs:OGC:1.3:CRS84' } },
			features: []
		} as MyGeoJSON;
		result.forEach((elem) => {
			root.features.push({
				type: 'Feature',
				properties: {
					feature_id: elem.item.feature_id,
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
		feature: MyGeoJSONFeature;
		coordinate: Position;
	};
	const findNearestPoint = () => {
		if (typeof atm === 'undefined' || typeof convenience === 'undefined') return null;
		if (typeof userLocation === 'undefined') return null;
		const target = [...filteredAtmData.features, ...filteredConvenienceData.features];
		const filteredPoints = [] as NearPoint[];
		target.forEach((p) => {
			if (typeof userLocation === 'undefined') return;
			const d = distance(userLocation, p.geometry.coordinates);
			if (d < thresholdDistance) {
				filteredPoints.push({
					distance: d,
					feature: p.properties,
					coordinate: p.geometry.coordinates as [number, number]
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
					coordinate: point.geometry.coordinates as [number, number]
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
		const darkmodeConfig = localStorage.getItem('atm-map.darkmode');
		if (darkmodeConfig !== null) {
			isDarkMode.set(JSON.parse(darkmodeConfig));
		}
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
	const filterByOpeningHour = (targetPoints: MyGeoJSON, targetDate: Date): MyGeoJSON => {
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

	const title = 'ATMマップ';

	const createPopup = (
		coord: { lng: number; lat: number },
		feature: { opening_hours: string | undefined | null; name: string | null }
	): { lng: number; lat: number; content: string } => {
		let content = '';
		if (typeof feature.opening_hours === 'undefined' || feature.opening_hours === null) {
			content = `<p class="text-gray-500">営業時間不明</p>`;
		} else {
			// @ts-ignore
			const oh = new openingHours(feature.opening_hours, {
				// @ts-ignore
				lon: userLocation[0],
				// @ts-ignore
				lat: userLocation[1],
				// @ts-ignore
				address: { country_code: 'jp', country: '日本' }
			});
			if (oh.getState()) {
				content = `<p class="text-green-500">営業中</p>`;
			} else {
				content = `<p class="text-red-500">営業時間外</p>`;
			}
		}
		return {
			lat: coord.lat,
			lng: coord.lng,
			content: `<p>${feature.name}</p>${content}`
		};
	};
	const iconLayerCommonProperty = {
		paint: {} as maplibregl.SymbolLayerSpecification['paint'],
		layout: {
			'icon-size': 0.6,
			'icon-allow-overlap': true
		} as maplibregl.SymbolLayerSpecification['layout']
	};
	const labelLayerCommonProperty = {
		layout: {
			'text-font': ['Noto Sans Bold'],
			'text-field': ['format', ['coalesce', ['get', 'brand'], ['get', 'name']]],
			'text-offset': [0, 1]
		} as maplibregl.SymbolLayerSpecification['layout'],
		paint: {
			'text-halo-width': 2,
			'text-halo-color': 'white'
		} as maplibregl.SymbolLayerSpecification['paint']
	};
	const circleLayerCommonProperty = {
		paint: {
			'circle-color': 'white',
			'circle-radius': 15
		}
	};
	const circleLayerOnClick = (e: maplibregl.MapLayerMouseEvent) => {
		if (typeof e.features === 'undefined') return;
		popup = createPopup(
			{ lng: e.lngLat.lng, lat: e.lngLat.lat },
			{
				opening_hours: e.features[0].properties['opening_hours'],
				name: e.features[0].properties['name']
			}
		);
		map?.flyTo({ center: e.lngLat });
	};
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
		style={$mapStyle}
		zoom={4}
		center={{ lng: 141.350331, lat: 43.068643 }}
	>
		<NavigationControl />
		<ScaleControl />
		<GeolocateControl
			trackUserLocation={true}
			ongeolocate={(e) => (userLocation = [e.coords.longitude, e.coords.latitude])}
		/>
		<DarkmodeControl />
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
			<CircleLayer paint={{ ...circleLayerCommonProperty.paint }} onclick={circleLayerOnClick} />
			<SymbolLayer
				paint={{
					...iconLayerCommonProperty.paint,
					'icon-color': [
						'case',
						[
							'in',
							['get', 'feature_id'],
							['literal', (nearPoint ?? []).map((val) => val.feature.feature_id)]
						],
						'red',
						'blue'
					]
				}}
				layout={{
					'icon-image': 'icon-convenience',
					...iconLayerCommonProperty.layout
				}}
			/>
			<SymbolLayer
				layout={{
					...labelLayerCommonProperty.layout
				}}
				paint={{
					...labelLayerCommonProperty.paint
				}}
			/>
		</GeoJSONSource>
		<GeoJSONSource data={filteredAtmData as any}>
			<CircleLayer paint={{ ...circleLayerCommonProperty.paint }} onclick={circleLayerOnClick} />
			<SymbolLayer
				paint={{
					...iconLayerCommonProperty.paint,
					'icon-color': [
						'case',
						[
							'in',
							['get', 'feature_id'],
							['literal', (nearPoint ?? []).map((val) => val.feature.feature_id)]
						],
						'red',
						'#FFC300'
					]
				}}
				layout={{
					'icon-image': 'icon-atm',
					...iconLayerCommonProperty.layout
				}}
			/>
			<SymbolLayer
				layout={{
					...labelLayerCommonProperty.layout
				}}
				paint={{
					...labelLayerCommonProperty.paint
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
							popup = createPopup(
								{ lng: point.coordinate[0], lat: point.coordinate[1] },
								{ opening_hours: point.feature.opening_hours, name: point.feature.name }
							);
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
