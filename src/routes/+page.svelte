<script lang="ts">
	import {
		MapLibre,
		NavigationControl,
		ScaleControl,
		GeoJSONSource,
		CircleLayer,
		SymbolLayer,
		Popup,
		GeolocateControl
	} from 'svelte-maplibre-gl';
	import { osm } from './style';
	import { base } from '$app/paths';
	import Fuse from 'fuse.js';
	import type { FuseResult } from 'fuse.js';
	import { distance } from '@turf/distance';
	import { fade } from 'svelte/transition';

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
	type GeoJSON = {
		type: string;
		name: string;
		crs: object;
		features: {
			type: string;
			properties: {
				brand: string | null;
				opening_hours: string | null;
				name: string | null;
			};
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
	let userLocation = $state<LatLng>();
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
	const findNearestPoint = () => {
		if (typeof atm === 'undefined' || typeof convenience === 'undefined') return null;
		if (typeof userLocation === 'undefined') return null;
		const target = [...atm.features, ...convenience.features];
		let minDistancePoint: {
			distance: number;
			feature: { brand: string | null; opening_hours: string | null; name: string | null } | null;
		} = { distance: Infinity, feature: null };
		target.forEach((point) => {
			const d = distance(userLocation, point.geometry.coordinates);
			if (d < minDistancePoint.distance) {
				minDistancePoint = {
					distance: d,
					feature: point.properties
				};
			}
		});
		return minDistancePoint;
	};
	const findNearestPointWithQuery = () => {
		if (typeof filteredAtmData === 'undefined' || typeof filteredConvenienceData === 'undefined')
			return null;
		if (typeof userLocation === 'undefined') return null;
		const target = [...filteredAtmData.features, ...filteredConvenienceData.features];
		let minDistancePoint: {
			distance: number;
			feature: { brand: string | null; opening_hours: string | null; name: string | null } | null;
		} = { distance: Infinity, feature: null };
		target.forEach((point) => {
			const d = distance(userLocation, point.geometry.coordinates);
			if (d < minDistancePoint.distance) {
				minDistancePoint = {
					distance: d,
					feature: point.properties
				};
			}
		});
		return minDistancePoint;
	};

	let filteredAtmData = $derived.by(() => {
		if (typeof atmIndex === 'undefined') return createGeoJsonFromIndex([]);
		if (typeof query === 'undefined' || query === '') {
			if (typeof atm !== 'undefined') return atm;
			return createGeoJsonFromIndex([]);
		}
		if (queryMacroMap.has(query)) {
			const q = queryMacroMap.get(query);
			const result = atmIndex.search(q!);
			return createGeoJsonFromIndex(result);
		}
		const result = atmIndex.search(query);
		return createGeoJsonFromIndex(result);
	});
	let filteredConvenienceData = $derived.by(() => {
		if (typeof convenienceIndex === 'undefined') return createGeoJsonFromIndex([]);
		if (typeof query === 'undefined' || query === '') {
			if (typeof convenience !== 'undefined') return convenience;
			return createGeoJsonFromIndex([]);
		}
		if (queryMacroMap.has(query)) {
			const q = queryMacroMap.get(query);
			const result = convenienceIndex.search(q!);
			return createGeoJsonFromIndex(result);
		}
		const result = convenienceIndex.search(query);
		return createGeoJsonFromIndex(result);
	});
	let nearPoint = $derived.by(() => {
		if (query === 'undefined' || query === '') {
			if (typeof convenience === 'undefined' && typeof atm === 'undefined') return;
			return findNearestPoint();
		}
		if (typeof filteredAtmData === 'undefined' && typeof filteredConvenienceData === 'undefined')
			return;
		return findNearestPointWithQuery();
	});
	$effect(() => {
		fetchAtmData();
		fetchConvenienceData();
	});
</script>

<div class="fixed bottom-0 top-14">
	<MapLibre
		class="h-full w-screen"
		style={osm}
		zoom={4}
		center={{ lng: 141.350331, lat: 43.068643 }}
	>
		<NavigationControl />
		<ScaleControl />
		<GeolocateControl
			trackUserLocation={true}
			ongeolocate={(e) => (userLocation = [e.coords.longitude, e.coords.latitude])}
		/>
		<GeoJSONSource data={filteredAtmData as any}>
			<CircleLayer
				paint={{
					'circle-color': '#FFC300',
					'circle-opacity': 0.8,
					'circle-stroke-color': 'white',
					'circle-stroke-width': 1
				}}
				onclick={(e) => {
					popup = {
						lat: e.lngLat.lat,
						lng: e.lngLat.lng,
						content:
							typeof e.features !== 'undefined'
								? `<p>${e.features[0].properties['name']}</p><p>営業時間: ${e.features[0].properties['opening_hours']}</p>`
								: ''
					};
				}}
			/>
			<SymbolLayer
				layout={{
					'text-field': ['format', ['coalesce', ['get', 'brand'], ['get', 'name']]],
					'text-font': ['Open Sans Bold'],
					'text-offset': [0, 1]
				}}
				paint={{
					'text-halo-width': 2,
					'text-halo-color': 'white'
				}}
			/>
		</GeoJSONSource>
		<GeoJSONSource data={filteredConvenienceData as any} cluster={true}>
			<SymbolLayer
				layout={{
					'text-font': ['Noto Sans JP Bold'],
					'text-field': '{brand}',
					'text-offset': [0, 1]
				}}
				paint={{
					'text-halo-width': 2,
					'text-halo-color': 'white'
				}}
			/>
			<CircleLayer
				paint={{
					'circle-color': 'blue',
					'circle-opacity': 0.8,
					'circle-stroke-color': 'gray',
					'circle-stroke-width': 1
				}}
				onclick={(e) => {
					popup = {
						lat: e.lngLat.lat,
						lng: e.lngLat.lng,
						content:
							typeof e.features !== 'undefined'
								? `<p>${e.features[0].properties['name']}</p><p>営業時間: ${e.features[0].properties['opening_hours']}</p>`
								: ''
					};
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
<div class="absolute top-16 left-2 w-64">
	<input
		type="text"
		id="q"
		bind:value={query}
		placeholder="ここから絞り込み検索"
		class="bg-neutral-500 p-2 rounded-full w-[17rem]"
		onfocus={() => (isTextFieldFocused = true)}
		onblur={() => (isTextFieldFocused = false)}
	/>
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
{#if isTextFieldFocused && typeof query !== 'undefined' && query.length == 0}
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

{#if typeof nearPoint !== 'undefined' && nearPoint !== null && nearPoint.feature !== null}
	<div class="absolute bottom-14 left-2">
		<p class="bg-red-200 p-2">
			{#if nearPoint.feature.brand !== null}
				{nearPoint.feature.brand}
			{:else}
				{nearPoint.feature.name}
			{/if}
			({Math.round(nearPoint.distance * 1000)} m)
		</p>
		<!-- TODO: ここをclickするとpopupが出てきてpanするとうれしい気がする -->
	</div>
{/if}
