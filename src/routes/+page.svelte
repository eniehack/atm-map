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
	import { onMount } from 'svelte';
	import { distance } from '@turf/distance';

	type PopupArgument = {
		lng: number;
		lat: number;
		content: string;
	};
	let popup = $state<null | PopupArgument>(null);

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
		let minDistancePoint: {distance: number, feature: {brand: string | null, opening_hours: string | null, name: string | null} | null} = {distance: Infinity, feature: null}
		target.forEach((point) => {
			const d = distance(userLocation, point.geometry.coordinates);
			if (d < minDistancePoint.distance) {
				minDistancePoint = {
					distance: d,
					feature: point.properties,
				}
			}
		});
		return minDistancePoint;
	};
	const findNearestPointWithQuery = () => {
		if (typeof filteredAtmData === 'undefined' || typeof filteredConvenienceData === 'undefined') return null;
		if (typeof userLocation === 'undefined') return null;
		const target = [...filteredAtmData.features, ...filteredConvenienceData.features];
		let minDistancePoint: {distance: number, feature: {brand: string | null, opening_hours: string | null, name: string | null} | null} = {distance: Infinity, feature: null}
		target.forEach((point) => {
			const d = distance(userLocation, point.geometry.coordinates);
			if (d < minDistancePoint.distance) {
				minDistancePoint = {
					distance: d,
					feature: point.properties,
				}
			}
		});
		return minDistancePoint;
	}

	let filteredAtmData = $derived.by(() => {
		if (typeof atmIndex === 'undefined') return createGeoJsonFromIndex([]);
		if (typeof query === 'undefined' || query === '') {
			if (typeof atm !== 'undefined') return atm;
			return createGeoJsonFromIndex([]);
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
		const result = convenienceIndex.search(query);
		return createGeoJsonFromIndex(result);
	});
	let nearPoint = $derived.by(() => {
		if (query === "undefined" || query === "") {
			if (typeof convenience === 'undefined' && typeof atm === 'undefined') return;
			return findNearestPoint()
		}
		if (typeof filteredAtmData === 'undefined' && typeof filteredConvenienceData === 'undefined') return;
		return findNearestPointWithQuery()
	})
	onMount(() => {
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
			<SymbolLayer
				layout={{
					'text-font': ['Open Sans Bold'],
					'text-field': '{brand}',
					'text-offset': [0, 1]
				}}
				paint={{
					'text-halo-width': 2,
					'text-halo-color': 'white'
				}}
				filter={[
					'any',
					['==', ['get', 'brand'], 'ファミリーマート'],
					['==', ['get', 'name'], 'ファミリーマート'],
					['==', ['get', 'brand'], 'FamilyMart'],
					['==', ['get', 'name'], 'FamilyMart']
				]}
			/>
		{/if}
	</GeoJSONSource>
	{#if popup !== null}
		<Popup lnglat={{ lng: popup.lng, lat: popup.lat }} onclose={() => (popup = null)}
			>{@html popup.content}</Popup
		>
	{/if}
</MapLibre>

<select
	name="brand"
	id="select-brand"
	bind:value={convenienceSelectedBrand}
	onchange={() => console.log($state.snapshot(convenienceSelectedBrand))}
>
	{#each brands as brand (brand.name)}
		<option value={brand.name}>{brand.displayName[0]}</option>
	{/each}
</select>

<input type="text" id="q" bind:value={query} />

{#if typeof nearPoint !== "undefined" && nearPoint !== null && nearPoint.feature !== null}
<p>{nearPoint.distance}: {nearPoint.feature.brand} {nearPoint.feature.name}</p>
{/if}