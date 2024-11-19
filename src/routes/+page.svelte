<script lang="ts">
	import {
		MapLibre,
		NavigationControl,
		ScaleControl,
		GeoJSONSource,
		CircleLayer,
		SymbolLayer,
		Popup
	} from 'svelte-maplibre-gl';
	import { osm } from './style';

	type PopupArgument = {
		lng: number,
		lat: number,
		content: string,
	}

	const brands = [
		{
			name: "seven",
			displayName: ["セブン-イレブン"],
		},
		{
			name: "lawson",
			displayName: ["ローソン", "LAWSON"],
		},
		{
			name: "familymart",
			displayName: ["ファミリーマート", "FamilyMart"],
		},
		{
			name: "seicomart",
			displayName: ["セイコーマート", "Seicomart"],
		},
	]
	let convenienceSelectedBrand = $state();
	let popup = $state<null | PopupArgument>(null);
</script>

<MapLibre class="h-[60vh] min-h-[300px]" style={osm} zoom={4} center={{ lng: 137, lat: 36 }}>
	<NavigationControl />
	<ScaleControl />
	<GeoJSONSource data={"./atm.json"} cluster={true}>
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
					content: typeof e.features !== "undefined" ? `<p>${e.features[0].properties["name"]}</p><p>営業時間: ${e.features[0].properties["opening_hours"]}</p>` : ""
				}
			}}
		/>
		<SymbolLayer
			layout={{
				'text-field': '{brand}',
				'text-font': ['Open Sans Bold'],
				'text-offset': [0, 1]
			}}
			paint={{
				'text-halo-width': 2,
				'text-halo-color': 'white'
			}}
		/>
	</GeoJSONSource>
	<GeoJSONSource data={"./convenience.json"} cluster={true}>
		{#if convenienceSelectedBrand == "lawson"}
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
			filter={["any", ["==", ["get","brand"], "ローソン"], ["==", ["get","name"], "ローソン"], ["==", ["get", "brand"], "LAWSON"], ["==", ["get", "name"], "LAWSON"]]}
		/>
		<CircleLayer
			paint={{
				'circle-color': 'blue',
				'circle-opacity': 0.8,
				'circle-stroke-color': 'gray',
				'circle-stroke-width': 1
			}}
			filter={["any", ["==", ["get","brand"], "ローソン"], ["==", ["get","name"], "ローソン"], ["==", ["get", "brand"], "LAWSON"], ["==", ["get", "name"], "LAWSON"]]}
			onclick={(e) => {
				popup = {
					lat: e.lngLat.lat,
					lng: e.lngLat.lng,
					content: typeof e.features !== "undefined" ? `<p>${e.features[0].properties["name"]}</p><p>営業時間: ${e.features[0].properties["opening_hours"]}</p>` : ""
				}
			}}
		/>
		{:else if convenienceSelectedBrand == "seven"}
		<CircleLayer
			paint={{
				'circle-color': 'red',
				'circle-opacity': 0.8,
				'circle-stroke-color': 'gray',
				'circle-stroke-width': 1
			}}
			filter={["any", ["==", ["get","brand"], "セブン-イレブン"], ["==", ["get","name"], "セブン-イレブン"], ["==", ["get", "brand"], "7-ELEVEN"], ["==", ["get", "name"], "7-ELEVEN"]]}
			onclick={(e) => {
				popup = {
					lat: e.lngLat.lat,
					lng: e.lngLat.lng,
					content: typeof e.features !== "undefined" ? `<p>${e.features[0].properties["name"]}</p><p>営業時間: ${e.features[0].properties["opening_hours"]}</p>` : ""
				}
			}}
		/>
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
			filter={["any", ["==", ["get","brand"], "セブン-イレブン"], ["==", ["get","name"], "セブン-イレブン"], ["==", ["get", "brand"], "7-ELEVEN"], ["==", ["get", "name"], "7-ELEVEN"]]}
		/>
		{:else if convenienceSelectedBrand == "familymart"}
		<CircleLayer
			paint={{
				'circle-color': 'green',
				'circle-opacity': 0.8,
				'circle-stroke-color': 'gray',
				'circle-stroke-width': 1
			}}
			filter={["any", ["==", ["get","brand"], "ファミリーマート"], ["==", ["get","name"], "ファミリーマート"], ["==", ["get", "brand"], "FamilyMart"], ["==", ["get", "name"], "FamilyMart"]]}
			onclick={(e) => {
				popup = {
					lat: e.lngLat.lat,
					lng: e.lngLat.lng,
					content: typeof e.features !== "undefined" ? `<p>${e.features[0].properties["name"]}</p><p>営業時間: ${e.features[0].properties["opening_hours"]}</p>` : ""
				}
			}}
		/>
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
			filter={["any", ["==", ["get","brand"], "ファミリーマート"], ["==", ["get","name"], "ファミリーマート"], ["==", ["get", "brand"], "FamilyMart"], ["==", ["get", "name"], "FamilyMart"]]}
		/>
		{/if}
	</GeoJSONSource>
	{#if popup !== null}
	<Popup lnglat={{lng:popup.lng, lat:popup.lat}} onclose={() => popup = null}>{@html popup.content }</Popup>
	{/if}
</MapLibre>

<select name="brand" id="select-brand" bind:value={convenienceSelectedBrand} onchange={() => console.log($state.snapshot(convenienceSelectedBrand))}>
	{#each brands as brand (brand.name)}
		<option value={brand.name}>{brand.displayName[0]}</option>
	{/each}
</select>