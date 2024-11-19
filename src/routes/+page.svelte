<script lang="ts">
	import { MapLibre, NavigationControl, ScaleControl, GlobeControl, GeoJSONSource, CircleLayer, SymbolLayer } from 'svelte-maplibre-gl';
    import Atm from "./atm.json";
    import Convenience from "./convenience.json";
    const atm = Atm as any;
    const convenience = Convenience as any;
</script>

<MapLibre
	class="h-[60vh] min-h-[300px]"
	style="https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json"
	zoom={4}
	center={{ lng: 137, lat: 36 }}
>
	<NavigationControl />
	<ScaleControl />
	<GlobeControl />
	<GeoJSONSource
		data={atm}
        cluster={true}
	>
		<CircleLayer
			paint={{
				'circle-color': "#FFC300",
				'circle-opacity': 0.8,
				"circle-stroke-color": "white",
				"circle-stroke-width": 1,
			}}
		/>
        <SymbolLayer
			layout={{
				"text-field": "{brand}",
				"text-font" : ["Open Sans Bold"],
				"text-offset": [0,1]
			}}
			paint={{
				"text-halo-width": 2,
				"text-halo-color": "white",
			}}
        />
	</GeoJSONSource>
	<GeoJSONSource
		data={convenience}
        cluster={true}
	>
		<CircleLayer
			paint={{
				'circle-color': "green",
				'circle-opacity': 0.8,
				"circle-stroke-color": "white",
				"circle-stroke-width": 1,
			}}
		/>
        <SymbolLayer
			layout={{
				"text-font" : ["Open Sans Bold"],
				"text-field": "{brand}",
				"text-offset": [0,1]
			}}
			paint={{
				"text-halo-width": 2,
				"text-halo-color": "white",
			}}
        />
	</GeoJSONSource>
</MapLibre>
