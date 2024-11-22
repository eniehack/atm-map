import { type StyleSpecification } from 'maplibre-gl';

export const osm: StyleSpecification = {
	version: 8,
	name: 'OSM OpenMapTiles',
	id: 'openmaptiles',
	center: [0, 0],
	zoom: 1,
	bearing: 0,
	pitch: 0,
	sources: {
		openmaptiles: {
			type: 'vector',
			url: 'pmtiles://https://tile.openstreetmap.jp/static/planet.pmtiles',
			attribution:
				'<a href="https://www.openmaptiles.org/" target="_blank">&copy; OpenMapTiles</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
		},
		takeshima: { type: 'vector', url: 'https://tile.openstreetmap.jp/data/takeshima.json' },
		hoppo: { type: 'vector', url: 'https://tile.openstreetmap.jp/data/hoppo.json' }
	},
	glyphs: 'https://tile.openstreetmap.jp/fonts/{fontstack}/{range}.pbf',
	sprite: 'https://tile.openstreetmap.jp/styles/openmaptiles/sprite',
	layers: [
		{
			id: 'background',
			type: 'background',
			layout: { visibility: 'visible' },
			paint: { 'background-color': '#f2efe9' }
		},
		{
			id: 'landuse_classes',
			type: 'fill',
			source: 'openmaptiles',
			'source-layer': 'landuse',
			minzoom: 7,
			layout: { visibility: 'visible' },
			paint: {
				'fill-color': [
					'match',
					['get', 'class'],
					'railway',
					'#ebdbe8',
					'residential',
					'#e0dfdf',
					'cemetery',
					'#aacbaf',
					'military',
					'#fceaea',
					'commercial',
					'#f2dad9',
					'industrial',
					'#ebdbe8',
					'garages',
					'#dfddce',
					'retail',
					'#ffd6d1',
					'bus_station',
					'#e9e7e2',
					'school',
					'#ffffe5',
					'university',
					'#ffffe5',
					'kindergarten',
					'#ffffe5',
					'college',
					'#ffffe5',
					'hospital',
					'#ffffe5',
					'stadium',
					'#d5ffd9',
					'pitch',
					'#aae0cb',
					'playground',
					'#d5ffd9',
					'track',
					'#aae0cb',
					'dam',
					'#adadad',
					'#000'
				],
				'fill-opacity': 1
			},
			metadata: {},
			filter: [
				'all',
				[
					'in',
					'class',
					'railway',
					'cemetery',
					'military',
					'residential',
					'commercial',
					'industrial',
					'garages',
					'retail',
					'bus_station',
					'school',
					'university',
					'kindergarten',
					'college',
					'hospital',
					'stadium',
					'pitch',
					'playground',
					'track',
					'dam'
				],
				['==', '$type', 'Polygon']
			]
		},
		{
			id: 'landuse_residential',
			type: 'fill',
			source: 'openmaptiles',
			'source-layer': 'landuse',
			minzoom: 6,
			maxzoom: 24,
			layout: { visibility: 'visible' },
			paint: {
				'fill-color': {
					stops: [
						[7, '#d0d0d0'],
						[11, '#dddddd'],
						[12, '#e0dfdf']
					]
				}
			},
			metadata: {},
			filter: ['all', ['in', 'class', 'residential', 'suburbs', 'neighbourhood']]
		},
		{
			id: 'aeroway_fill',
			type: 'fill',
			source: 'openmaptiles',
			'source-layer': 'aeroway',
			minzoom: 11,
			layout: { visibility: 'visible' },
			paint: {
				'fill-color': {
					stops: [
						[6, 'rgba(223, 223, 228, 1)'],
						[12, 'rgba(232, 231, 223, 1)']
					]
				},
				'fill-opacity': 1
			},
			metadata: {},
			filter: ['==', '$type', 'Polygon']
		},
		{
			id: 'landcover_classes',
			type: 'fill',
			source: 'openmaptiles',
			'source-layer': 'landcover',
			maxzoom: 13,
			layout: { visibility: 'visible' },
			paint: {
				'fill-color': [
					'match',
					['get', 'class'],
					'farmland',
					'#eef0d5',
					'wood',
					'#add19e',
					'rock',
					'#eee5dc',
					'grass',
					'#cdebb0',
					'sand',
					'#f5e9c6',
					'wetland',
					'#add19e',
					'#000'
				],
				'fill-opacity': {
					stops: [
						[7, 0.5],
						[10, 1]
					]
				},
				'fill-antialias': false
			},
			metadata: {},
			filter: ['all', ['in', 'class', 'farmland', 'wood', 'rock', 'grass', 'wetland', 'sand']]
		},
		{
			id: 'landcover_class_outline',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'landcover',
			layout: { visibility: 'visible' },
			paint: { 'line-color': '#c7c9ae', 'line-width': 0.5 },
			filter: ['all', ['in', 'class', 'farmland']]
		},
		{
			id: 'landcover_park',
			type: 'fill',
			source: 'openmaptiles',
			'source-layer': 'landcover',
			minzoom: 13,
			layout: { visibility: 'visible' },
			paint: { 'fill-color': '#c8facc', 'fill-antialias': true },
			filter: ['all', ['==', 'subclass', 'park']]
		},
		{
			id: 'landcover_subclasses',
			type: 'fill',
			source: 'openmaptiles',
			'source-layer': 'landcover',
			minzoom: 13,
			layout: { visibility: 'visible' },
			paint: {
				'fill-color': [
					'match',
					['get', 'subclass'],
					'allotments',
					'#c9e1bf',
					'bare_rock',
					'#eee5dc',
					'beach',
					'#fff1ba',
					'bog',
					'#d6d99f',
					'dune',
					'#f5e9c6',
					'scrub',
					'#c8d7ab',
					'farm',
					'#f5dcba',
					'farmland',
					'#eef0d5',
					'forest',
					'#add19e',
					'grass',
					'#cdebb0',
					'grassland',
					'#cdebb0',
					'golf_course',
					'#def6c0',
					'heath',
					'#d6d99f',
					'mangrove',
					'#c8d7ab',
					'meadow',
					'#cdebb0',
					'orchard',
					'#aedfa3',
					'park',
					'#c8facc',
					'garden',
					'#cdebb0',
					'plant_nursery',
					'#aedfa3',
					'recreation_ground',
					'#d5ffd9',
					'reedbed',
					'#cdebb0',
					'saltmarsh',
					'#cdebb0',
					'sand',
					'#f5e9c6',
					'scree',
					'#eee5dc',
					'swamp',
					'#add19e',
					'tidalflat',
					'#DED6CF',
					'village_green',
					'#cdebb0',
					'vineyard',
					'#aedfa3',
					'wet_meadow',
					'#cdebb0',
					'wetland',
					'#add19e',
					'wood',
					'#add19e',
					'marsh',
					'#ff0',
					'#FFFFFF'
				],
				'fill-antialias': true
			},
			filter: [
				'all',
				[
					'in',
					'subclass',
					'allotments',
					'bare_rock',
					'beach',
					'dune',
					'scrub',
					'farm',
					'farmland',
					'forest',
					'garden',
					'grass',
					'grassland',
					'golf_course',
					'heath',
					'meadow',
					'orchard',
					'plant_nursery',
					'recreation_ground',
					'reedbed',
					'saltmarsh',
					'sand',
					'scree',
					'swamp',
					'tidalflat',
					'tundra',
					'village_green',
					'vineyard',
					'wet_meadow',
					'wetland',
					'wood'
				]
			]
		},
		{
			id: 'landcover_subclass_patterns',
			type: 'fill',
			source: 'openmaptiles',
			'source-layer': 'landcover',
			minzoom: 13,
			layout: { visibility: 'visible' },
			paint: {
				'fill-opacity': [
					'match',
					['get', 'subclass'],
					'beach',
					0.4,
					'forest',
					0.4,
					'bare_rock',
					0.3,
					'scrub',
					0.6,
					'garden',
					0.6,
					'scree',
					0.3,
					'wood',
					0.4,
					1
				],
				'fill-pattern': [
					'match',
					['get', 'subclass'],
					'allotments',
					'allotments',
					'bare_rock',
					'rock_overlay',
					'beach',
					'beach',
					'bog',
					'wetland_bog',
					'scrub',
					'scrub',
					'forest',
					'leaftype_unknown',
					'garden',
					'plant_nursery',
					'mangrove',
					'wetland_mangrove',
					'marsh',
					'wetland_marsh',
					'orchard',
					'orchard',
					'plant_nursery',
					'plant_nursery',
					'reedbed',
					'wetland_reed',
					'saltmarsh',
					'wetland_marsh',
					'scree',
					'scree_overlay',
					'swamp',
					'wetland_swamp',
					'vineyard',
					'vineyard',
					'wet_meadow',
					'wetland_marsh',
					'wetland',
					'wetland',
					'wood',
					'leaftype_unknown',
					''
				]
			},
			metadata: {},
			filter: [
				'all',
				[
					'in',
					'subclass',
					'allotments',
					'bare_rock',
					'beach',
					'bog',
					'dune',
					'scrub',
					'farm',
					'farmland',
					'forest',
					'garden',
					'grass',
					'grassland',
					'golf_course',
					'heath',
					'mangrove',
					'marsh',
					'meadow',
					'orchard',
					'park',
					'plant_nursery',
					'recreation_ground',
					'reedbed',
					'saltern',
					'saltmarsh',
					'sand',
					'scree',
					'swamp',
					'village_green',
					'vineyard',
					'wet_meadow',
					'wetland',
					'wood'
				]
			]
		},
		{
			id: 'landcover_subclass_outline',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'landcover',
			minzoom: 15,
			layout: { visibility: 'visible' },
			paint: {
				'line-color': [
					'match',
					['get', 'subclass'],
					'allotments',
					'#B1C6A8',
					'farm',
					'#d1b48c',
					'farmland',
					'#c7c9ae',
					'recreation_ground',
					'#3c6640',
					'#000'
				],
				'line-width': ['match', ['get', 'subclass'], 'recreation_ground', 0.3, 0.5],
				'line-opacity': 1
			},
			filter: ['all', ['in', 'subclass', 'allotments', 'farm', 'farmland', 'recreation_ground']]
		},
		{
			id: 'landcover_ice',
			type: 'fill',
			source: 'openmaptiles',
			'source-layer': 'landcover',
			minzoom: 5,
			paint: { 'fill-color': '#ddecec', 'fill-antialias': false },
			metadata: {},
			filter: ['all', ['in', 'class', 'ice']]
		},
		{
			id: 'landcover_ice_outline',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'landcover',
			minzoom: 5,
			layout: { visibility: 'visible' },
			paint: {
				'line-color': '#9cf',
				'line-width': {
					stops: [
						[5, 1],
						[10, 1.5]
					]
				},
				'line-dasharray': {
					stops: [
						[5, [1, 0]],
						[10, [4, 2]]
					]
				}
			},
			filter: ['all', ['in', 'class', 'ice']]
		},
		{
			id: 'waterway_tunnel',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'waterway',
			minzoom: 14,
			layout: { 'line-cap': 'round', visibility: 'visible' },
			paint: {
				'line-color': '#a0c8f0',
				'line-width': {
					base: 1.3,
					stops: [
						[13, 0.5],
						[20, 6]
					]
				},
				'line-dasharray': [2, 4]
			},
			filter: ['all', ['==', 'brunnel', 'tunnel']]
		},
		{
			id: 'waterway_river',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'waterway',
			layout: { 'line-cap': 'round', visibility: 'visible' },
			paint: {
				'line-color': '#a0c8f0',
				'line-width': {
					base: 1.2,
					stops: [
						[11, 0.5],
						[20, 6]
					]
				}
			},
			metadata: {},
			filter: [
				'all',
				['==', 'class', 'river'],
				['!=', 'brunnel', 'tunnel'],
				['!=', 'intermittent', 1]
			]
		},
		{
			id: 'waterway_river_intermittent',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'waterway',
			layout: { 'line-cap': 'round' },
			paint: {
				'line-color': '#a0c8f0',
				'line-width': {
					base: 1.2,
					stops: [
						[11, 0.5],
						[20, 6]
					]
				},
				'line-dasharray': [3, 2]
			},
			metadata: {},
			filter: [
				'all',
				['==', 'class', 'river'],
				['!=', 'brunnel', 'tunnel'],
				['==', 'intermittent', 1]
			]
		},
		{
			id: 'waterway_other',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'waterway',
			layout: { 'line-cap': 'round', visibility: 'visible' },
			paint: {
				'line-color': '#a0c8f0',
				'line-width': {
					base: 1.3,
					stops: [
						[13, 0.5],
						[20, 6]
					]
				}
			},
			metadata: {},
			filter: [
				'all',
				['!=', 'class', 'river'],
				['!=', 'brunnel', 'tunnel'],
				['!=', 'intermittent', 1]
			]
		},
		{
			id: 'waterway_other_intermittent',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'waterway',
			layout: { 'line-cap': 'round', visibility: 'visible' },
			paint: {
				'line-color': '#a0c8f0',
				'line-width': {
					base: 1.3,
					stops: [
						[13, 0.5],
						[20, 6]
					]
				},
				'line-dasharray': [4, 3]
			},
			metadata: {},
			filter: [
				'all',
				['!=', 'class', 'river'],
				['!=', 'brunnel', 'tunnel'],
				['==', 'intermittent', 1]
			]
		},
		{
			id: 'water_intermittent',
			type: 'fill',
			source: 'openmaptiles',
			'source-layer': 'water',
			layout: { visibility: 'visible' },
			paint: { 'fill-color': 'rgba(172, 218, 251, 1)', 'fill-opacity': 0.85 },
			metadata: {},
			filter: ['all', ['==', 'intermittent', 1]]
		},
		{
			id: 'water',
			type: 'fill',
			source: 'openmaptiles',
			'source-layer': 'water',
			layout: { visibility: 'visible' },
			paint: { 'fill-color': '#aad3df' },
			metadata: {},
			filter: ['all', ['!=', 'intermittent', 1], ['!=', 'brunnel', 'tunnel']]
		},
		{
			id: 'building',
			type: 'fill',
			source: 'openmaptiles',
			'source-layer': 'building',
			minzoom: 12,
			maxzoom: 24,
			layout: { visibility: 'visible' },
			paint: {
				'fill-color': {
					stops: [
						[13, 'rgba(222, 213, 207, 1)'],
						[16, '#d9d0c9']
					]
				},
				'fill-outline-color': {
					base: 1,
					stops: [
						[13, '#9A918A'],
						[16, 'rgba(166, 157, 150, 1)']
					]
				}
			},
			metadata: {}
		},
		{
			id: 'national_parks',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'park',
			minzoom: 8,
			layout: { visibility: 'visible' },
			paint: {
				'line-color': 'rgba(154, 199, 136, 1)',
				'line-width': {
					base: 1,
					stops: [
						[8, 1.2],
						[9, 1.5],
						[10, 3.6],
						[24, 3.6]
					]
				},
				'line-offset': 1,
				'line-opacity': 0.8
			}
		},
		{
			id: 'national_parks_thin',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'park',
			minzoom: 10,
			layout: { visibility: 'none' },
			paint: { 'line-color': 'rgba(93, 156, 76, 1)', 'line-width': 1.5 }
		},
		{
			id: 'aeroway_runway',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'aeroway',
			minzoom: 11,
			layout: { visibility: 'visible' },
			paint: {
				'line-color': 'rgba(178, 181, 209, 1)',
				'line-width': {
					base: 1.2,
					stops: [
						[11, 3],
						[20, 48]
					]
				},
				'line-opacity': 1
			},
			metadata: {},
			filter: ['all', ['==', '$type', 'LineString'], ['==', 'class', 'runway']]
		},
		{
			id: 'aeroway_taxiway',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'aeroway',
			minzoom: 11,
			layout: { visibility: 'visible' },
			paint: {
				'line-color': 'rgba(178, 181, 209, 1)',
				'line-width': {
					base: 1.2,
					stops: [
						[11, 1],
						[20, 24]
					]
				},
				'line-opacity': 1
			},
			metadata: {},
			filter: ['all', ['==', '$type', 'LineString'], ['==', 'class', 'taxiway']]
		},
		{
			id: 'ferry',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			minzoom: 4,
			layout: { 'line-join': 'round', visibility: 'visible' },
			paint: {
				'line-color': '#66f',
				'line-width': {
					stops: [
						[10, 0.5],
						[14, 1.1]
					]
				},
				'line-dasharray': [6, 6]
			},
			filter: ['all', ['in', 'class', 'ferry']]
		},
		{
			id: 'landuse_class_pattern',
			type: 'fill',
			source: 'openmaptiles',
			'source-layer': 'landuse',
			layout: { visibility: 'visible' },
			paint: {
				'fill-color': '#000000',
				'fill-opacity': 1,
				'fill-pattern': [
					'match',
					['get', 'class'],
					'military',
					'military_red_hatch',
					'cemetery',
					'grave_yard_generic',
					''
				]
			},
			metadata: {},
			filter: ['all', ['in', 'class', 'military', 'cemetery']]
		},
		{
			id: 'landuse_class_outline',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'landuse',
			minzoom: 13,
			layout: { visibility: 'visible' },
			paint: {
				'line-color': [
					'match',
					['get', 'class'],
					'railway',
					'#c6b3c3',
					'military',
					'#ff5555',
					'residential',
					'#b9b9b9',
					'commercial',
					'#f2dad9',
					'industrial',
					'#c6b3c3',
					'retail',
					'#d99c95',
					'school',
					'#A6A68C',
					'university',
					'#A6A68C',
					'kindergarten',
					'#A6A68C',
					'college',
					'#A6A68C',
					'hospital',
					'#A6A68C',
					'stadium',
					'#7ca680',
					'pitch',
					'#7aaa97',
					'playground',
					'#3c6640',
					'track',
					'#7aaa96',
					'theme_park',
					'#660033',
					'zoo',
					'#660033',
					'dam',
					'#444444',
					'#000'
				],
				'line-width': [
					'match',
					['get', 'class'],
					'railway',
					0.7,
					'military',
					2,
					'residential',
					0.5,
					'commercial',
					0.5,
					'industrial',
					0.5,
					'retail',
					0.5,
					'school',
					0.3,
					'university',
					0.3,
					'kindergarten',
					0.3,
					'college',
					0.3,
					'hospital',
					0.3,
					'stadium',
					0.3,
					'pitch',
					0.5,
					'playground',
					0.3,
					'track',
					0.5,
					'theme_park',
					1,
					'zoo',
					1,
					'dam',
					2,
					1
				],
				'line-offset': ['match', ['get', 'class'], 'military', 1, 0],
				'line-opacity': ['match', ['get', 'class'], 'military', 0.24, 1]
			},
			filter: [
				'all',
				[
					'in',
					'class',
					'railway',
					'military',
					'residential',
					'commercial',
					'industrial',
					'retail',
					'school',
					'university',
					'kindergarten',
					'college',
					'hospital',
					'stadium',
					'pitch',
					'playground',
					'track',
					'theme_park',
					'zoo',
					'dam'
				]
			]
		},
		{
			id: 'landuse_class_themepark',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'landuse',
			minzoom: 13,
			layout: { 'line-cap': 'square', 'line-join': 'round', visibility: 'visible' },
			paint: {
				'line-color': '#660033',
				'line-width': {
					stops: [
						[9, 3.5],
						[14, 5.5]
					]
				},
				'line-offset': 2,
				'line-opacity': {
					stops: [
						[9, 0.1],
						[12, 0.3]
					]
				}
			},
			filter: ['all', ['in', 'class', 'theme_park', 'zoo']]
		},
		{
			id: 'tunnel_motorway_link_casing',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			minzoom: 11,
			layout: { 'line-join': 'round', visibility: 'visible' },
			paint: {
				'line-color': {
					stops: [
						[11, '#c24e6b'],
						[12, '#dc2a67']
					]
				},
				'line-width': {
					base: 1.2,
					stops: [
						[11, 1.5],
						[12, 4],
						[14, 7.8],
						[16, 12],
						[17, 13],
						[18, 16],
						[19, 17]
					]
				}
			},
			metadata: {},
			filter: [
				'all',
				['==', 'class', 'motorway_link'],
				['==', 'ramp', 1],
				['==', 'brunnel', 'tunnel']
			]
		},
		{
			id: 'tunnel_service_track_casing',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			layout: { 'line-join': 'round', visibility: 'visible' },
			paint: {
				'line-color': '#cfcdca',
				'line-width': {
					base: 1.2,
					stops: [
						[15, 1],
						[16, 4],
						[20, 11]
					]
				},
				'line-dasharray': [0.5, 0.25]
			},
			metadata: {},
			filter: ['all', ['==', 'brunnel', 'tunnel'], ['in', 'class', 'service', 'track']]
		},
		{
			id: 'tunnel_link_casing',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			layout: { 'line-join': 'round', visibility: 'visible' },
			paint: {
				'line-color': '#e9ac77',
				'line-width': {
					base: 1.2,
					stops: [
						[12, 1],
						[13, 3],
						[14, 4],
						[20, 15]
					]
				},
				'line-opacity': 1
			},
			metadata: {},
			filter: ['all', ['==', 'ramp', '1'], ['==', 'brunnel', 'tunnel'], ['>', 'layer', 0]]
		},
		{
			id: 'tunnel_street_casing',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			layout: { 'line-join': 'round', visibility: 'visible' },
			paint: {
				'line-color': '#cfcdca',
				'line-width': {
					base: 1.2,
					stops: [
						[12, 0.5],
						[13, 1],
						[14, 4],
						[20, 15]
					]
				},
				'line-opacity': {
					stops: [
						[12, 0],
						[12.5, 1]
					]
				}
			},
			metadata: {},
			filter: ['all', ['==', 'brunnel', 'tunnel'], ['in', 'class', 'street', 'street_limited']]
		},
		{
			id: 'tunnel_tertiary_casing',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			minzoom: 11,
			layout: { 'line-join': 'round', visibility: 'visible' },
			paint: {
				'line-color': '#8f8f8f',
				'line-width': {
					base: 1.2,
					stops: [
						[11, 2.5],
						[12, 5],
						[13, 5],
						[14, 9],
						[15, 10],
						[16, 18],
						[17, 21],
						[18, 27]
					]
				},
				'line-opacity': 1,
				'line-dasharray': [0.5, 0.25]
			},
			metadata: {},
			filter: ['all', ['==', 'brunnel', 'tunnel'], ['in', 'class', 'tertiary']]
		},
		{
			id: 'tunnel_secondary_casing',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			minzoom: 11,
			layout: { 'line-join': 'round', visibility: 'visible' },
			paint: {
				'line-color': '#707d05',
				'line-width': {
					base: 1.2,
					stops: [
						[11, 3.5],
						[12, 5],
						[13, 5],
						[14, 9],
						[15, 10],
						[16, 18],
						[17, 21],
						[18, 27]
					]
				},
				'line-opacity': 1,
				'line-dasharray': [0.5, 0.25]
			},
			metadata: {},
			filter: ['all', ['==', 'brunnel', 'tunnel'], ['in', 'class', 'secondary']]
		},
		{
			id: 'tunnel_trunk_casing',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			minzoom: 11,
			layout: { 'line-join': 'round', visibility: 'visible' },
			paint: {
				'line-color': {
					stops: [
						[11, '#cf6649'],
						[12, '#c84e2f']
					]
				},
				'line-width': {
					base: 1.2,
					stops: [
						[11, 3.5],
						[12, 6],
						[15, 10],
						[16, 18],
						[17, 21],
						[18, 27]
					]
				},
				'line-dasharray': [0.5, 0.25]
			},
			metadata: {},
			filter: ['all', ['==', 'brunnel', 'tunnel'], ['in', 'class', 'trunk']]
		},
		{
			id: 'tunnel_trunk_construction_casing',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			minzoom: 11,
			layout: { 'line-join': 'round', visibility: 'visible' },
			paint: {
				'line-color': 'rgba(255, 255, 255, 1)',
				'line-width': {
					base: 1.2,
					stops: [
						[11, 3.5],
						[12, 6],
						[15, 10],
						[16, 18],
						[17, 21],
						[18, 25]
					]
				},
				'line-dasharray': [1, 0]
			},
			metadata: {},
			filter: ['all', ['==', 'brunnel', 'tunnel'], ['in', 'class', 'trunk_construction']]
		},
		{
			id: 'tunnel_primary_casing',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			minzoom: 11,
			layout: { 'line-join': 'round', visibility: 'visible' },
			paint: {
				'line-color': {
					stops: [
						[6, '#a06b00'],
						[10, 'rgba(160, 116, 0, 1)']
					]
				},
				'line-width': {
					base: 1.2,
					stops: [
						[11, 3.5],
						[12, 6],
						[15, 10],
						[16, 18],
						[17, 21],
						[18, 27]
					]
				},
				'line-dasharray': [0.5, 0.25]
			},
			metadata: {},
			filter: ['all', ['==', 'brunnel', 'tunnel'], ['in', 'class', 'primary']]
		},
		{
			id: 'tunnel_motorway_construction_casing',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			layout: { 'line-join': 'round', visibility: 'visible' },
			paint: {
				'line-color': {
					stops: [
						[6, '#dc2a67'],
						[10, '#c24e6b']
					]
				},
				'line-width': {
					base: 1.2,
					stops: [
						[5, 0],
						[7, 1.75],
						[18, 27]
					]
				},
				'line-dasharray': [0.5, 0.25]
			},
			metadata: {},
			filter: ['all', ['==', 'class', 'motorway_construction'], ['==', 'brunnel', 'tunnel']]
		},
		{
			id: 'tunnel_motorway_casing',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			layout: { 'line-join': 'round', visibility: 'visible' },
			paint: {
				'line-color': {
					stops: [
						[6, '#dc2a67'],
						[10, '#c24e6b']
					]
				},
				'line-width': {
					base: 1.2,
					stops: [
						[5, 0],
						[7, 1.75],
						[18, 27]
					]
				},
				'line-dasharray': [0.5, 0.25]
			},
			metadata: {},
			filter: ['all', ['==', 'class', 'motorway'], ['==', 'brunnel', 'tunnel']]
		},
		{
			id: 'tunnel_path_casing_casing',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			layout: { visibility: 'visible' },
			paint: {
				'line-color': 'rgba(50, 50, 50, 1)',
				'line-width': {
					base: 1.2,
					stops: [
						[13, 3.7],
						[14, 4],
						[15, 4.3],
						[17, 4.3],
						[18, 4.6]
					]
				},
				'line-dasharray': [1, 0.5]
			},
			metadata: {},
			filter: [
				'all',
				['==', '$type', 'LineString'],
				['==', 'brunnel', 'tunnel'],
				['==', 'class', 'path']
			]
		},
		{
			id: 'tunnel_path_casing',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			layout: { visibility: 'visible' },
			paint: {
				'line-color': 'rgba(255, 255, 255, 1)',
				'line-width': {
					base: 1.2,
					stops: [
						[13, 2.7],
						[14, 3],
						[15, 3.3],
						[17, 3.3],
						[18, 3.6]
					]
				},
				'line-dasharray': [1, 0]
			},
			metadata: {},
			filter: [
				'all',
				['==', '$type', 'LineString'],
				['==', 'brunnel', 'tunnel'],
				['==', 'class', 'path']
			]
		},
		{
			id: 'tunnel_path_cycleway',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			minzoom: 13,
			paint: {
				'line-color': '#0000ff',
				'line-width': {
					base: 1.2,
					stops: [
						[13, 0.8],
						[14, 1],
						[15, 1.3],
						[17, 1.3],
						[18, 1.6]
					]
				},
				'line-dasharray': [2, 2]
			},
			metadata: {},
			filter: [
				'all',
				['==', '$type', 'LineString'],
				['==', 'brunnel', 'tunnel'],
				['in', 'class', 'path'],
				['any', ['==', 'subclass', 'cycleway'], ['==', 'bicycle', 'designated']]
			]
		},
		{
			id: 'tunnel_path_bridleway',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			minzoom: 13,
			paint: {
				'line-color': '#008000',
				'line-width': {
					base: 1.2,
					stops: [
						[13, 0.8],
						[14, 1],
						[15, 1.3],
						[17, 1.3],
						[18, 1.6]
					]
				},
				'line-dasharray': [2, 2]
			},
			metadata: {},
			filter: [
				'all',
				['==', '$type', 'LineString'],
				['==', 'brunnel', 'tunnel'],
				['in', 'class', 'path'],
				['any', ['==', 'subclass', 'bridleway'], ['==', 'horse', 'designated']],
				['!=', 'bicycle', 'designated']
			]
		},
		{
			id: 'tunnel_path_footway',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			minzoom: 13,
			paint: {
				'line-color': '#fa8072',
				'line-width': {
					base: 1.2,
					stops: [
						[13, 0.8],
						[14, 1],
						[15, 1.3],
						[17, 1.3],
						[18, 1.6]
					]
				},
				'line-dasharray': [2, 2]
			},
			metadata: {},
			filter: [
				'all',
				['==', '$type', 'LineString'],
				['==', 'brunnel', 'tunnel'],
				['in', 'class', 'path'],
				['in', 'subclass', 'footway', 'path'],
				['!=', 'bicycle', 'designated'],
				['!=', 'horse', 'designated']
			]
		},
		{
			id: 'tunnel_motorway_link',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			minzoom: 8,
			layout: { 'line-join': 'round', visibility: 'visible' },
			paint: {
				'line-color': '#f1bcc6',
				'line-width': {
					base: 1.2,
					stops: [
						[8, 0.7],
						[11, 0.9],
						[12, 3],
						[14, 6.6],
						[16, 10.4],
						[17, 11.4],
						[18, 14.4],
						[19, 15.4]
					]
				},
				'line-opacity': 1,
				'line-dasharray': [0.5, 0.25]
			},
			metadata: {},
			filter: ['all', ['==', 'class', 'motorway'], ['==', 'ramp', 1], ['==', 'brunnel', 'tunnel']]
		},
		{
			id: 'tunnel_service_track',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			minzoom: 15,
			layout: { 'line-join': 'round', visibility: 'visible' },
			paint: {
				'line-color': '#f2f2f2',
				'line-width': {
					base: 1.2,
					stops: [
						[15, 0.8],
						[16, 1.9],
						[17, 3.1],
						[18, 3.9],
						[19, 6.9]
					]
				}
			},
			metadata: {},
			filter: ['all', ['==', 'brunnel', 'tunnel'], ['in', 'class', 'service', 'track']]
		},
		{
			id: 'tunnel_service_track_construction',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			minzoom: 15,
			layout: { 'line-join': 'round', visibility: 'visible' },
			paint: {
				'line-color': '#fff',
				'line-width': {
					base: 1.2,
					stops: [
						[15, 0.8],
						[16, 1.9],
						[17, 3.1],
						[18, 3.9],
						[19, 6.9]
					]
				},
				'line-dasharray': [2, 2]
			},
			metadata: {},
			filter: [
				'all',
				['==', 'brunnel', 'tunnel'],
				['in', 'class', 'service_construction', 'track_construction']
			]
		},
		{
			id: 'tunnel_link',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			layout: { 'line-join': 'round', visibility: 'visible' },
			paint: {
				'line-color': '#fff4c6',
				'line-width': {
					base: 1.2,
					stops: [
						[12.5, 0],
						[13, 1.5],
						[14, 2.5],
						[20, 11.5]
					]
				}
			},
			metadata: {},
			filter: ['all', ['==', 'ramp', '1'], ['==', 'brunnel', 'tunnel'], ['>', 'layer', 0]]
		},
		{
			id: 'tunnel_minor',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			layout: { 'line-join': 'round', visibility: 'visible' },
			paint: {
				'line-color': '#fff',
				'line-width': {
					base: 1.2,
					stops: [
						[13.5, 0],
						[14, 2.5],
						[20, 11.5]
					]
				},
				'line-opacity': 1
			},
			metadata: {},
			filter: ['all', ['==', 'brunnel', 'tunnel'], ['in', 'class', 'minor']]
		},
		{
			id: 'tunnel_minor_construction',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			layout: { 'line-join': 'round', visibility: 'visible' },
			paint: {
				'line-color': '#fff',
				'line-width': {
					base: 1.2,
					stops: [
						[13.5, 0],
						[14, 2.5],
						[20, 11.5]
					]
				},
				'line-opacity': 1,
				'line-dasharray': [2, 2]
			},
			metadata: {},
			filter: ['all', ['==', 'brunnel', 'tunnel'], ['in', 'class', 'minor_construction']]
		},
		{
			id: 'tunnel_tertiary',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			layout: { 'line-join': 'round', visibility: 'visible' },
			paint: {
				'line-color': '#ffffff',
				'line-width': {
					base: 1.2,
					stops: [
						[11, 1.9],
						[12, 3],
						[13, 3.9],
						[14, 7.8],
						[15, 8.8],
						[16, 16.4],
						[17, 19.4],
						[18, 25.4]
					]
				}
			},
			metadata: {},
			filter: ['all', ['==', 'brunnel', 'tunnel'], ['in', 'class', 'tertiary']]
		},
		{
			id: 'tunnel_tertiary_construction',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			layout: { 'line-join': 'round', visibility: 'visible' },
			paint: {
				'line-color': '#ffffff',
				'line-width': {
					base: 1.2,
					stops: [
						[11, 1.9],
						[12, 3],
						[13, 3.9],
						[14, 7.8],
						[15, 8.8],
						[16, 16.4],
						[17, 19.4],
						[18, 25.4]
					]
				},
				'line-dasharray': [2, 2]
			},
			metadata: {},
			filter: ['all', ['==', 'brunnel', 'tunnel'], ['in', 'class', 'tertiary_construction']]
		},
		{
			id: 'tunnel_secondary',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			minzoom: 8,
			layout: { 'line-join': 'round', visibility: 'visible' },
			paint: {
				'line-color': '#fafcd7',
				'line-width': {
					base: 1.2,
					stops: [
						[8, 1],
						[9, 1.1],
						[10, 1.1],
						[11, 2.9],
						[12, 4.3],
						[12, 4.3],
						[14, 7.6],
						[15, 8.6],
						[16, 16],
						[17, 19],
						[18, 25]
					]
				}
			},
			metadata: {},
			filter: ['all', ['==', 'brunnel', 'tunnel'], ['in', 'class', 'secondary']]
		},
		{
			id: 'tunnel_secondary_construction',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			minzoom: 8,
			layout: { 'line-join': 'round', visibility: 'visible' },
			paint: {
				'line-color': '#fafcd7',
				'line-width': {
					base: 1.2,
					stops: [
						[8, 1],
						[9, 1.1],
						[10, 1.1],
						[11, 2.9],
						[12, 4.3],
						[12, 4.3],
						[14, 7.6],
						[15, 8.6],
						[16, 16],
						[17, 19],
						[18, 25]
					]
				},
				'line-dasharray': [2, 2]
			},
			metadata: {},
			filter: ['all', ['==', 'brunnel', 'tunnel'], ['in', 'class', 'secondary_construction']]
		},
		{
			id: 'tunnel_primary',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			minzoom: 11,
			layout: { 'line-join': 'round', visibility: 'visible' },
			paint: {
				'line-color': '#feecd5',
				'line-width': {
					base: 1.2,
					stops: [
						[5, 0.4],
						[6, 0.6],
						[7, 1],
						[8, 1.4],
						[9, 1.9],
						[10, 1.9],
						[11, 4.5],
						[12, 5],
						[15, 8.6],
						[16, 16],
						[17, 19],
						[18, 25]
					]
				},
				'line-opacity': 1
			},
			metadata: {},
			filter: ['all', ['==', 'brunnel', 'tunnel'], ['in', 'class', 'primary']]
		},
		{
			id: 'tunnel_primary_construction',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			minzoom: 11,
			layout: { 'line-join': 'round', visibility: 'visible' },
			paint: {
				'line-color': '#feecd5',
				'line-width': {
					base: 1.2,
					stops: [
						[5, 0.4],
						[6, 0.6],
						[7, 1],
						[8, 1.4],
						[9, 1.9],
						[10, 1.9],
						[11, 4.5],
						[12, 5],
						[15, 8.6],
						[16, 16],
						[17, 19],
						[18, 25]
					]
				},
				'line-opacity': 1,
				'line-dasharray': [2, 2]
			},
			metadata: {},
			filter: ['all', ['==', 'brunnel', 'tunnel'], ['in', 'class', 'primary_construction']]
		},
		{
			id: 'tunnel_trunk',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			layout: { 'line-join': 'round', visibility: 'visible' },
			paint: {
				'line-color': {
					stops: [
						[5, '#f5977a'],
						[11, '#fcd7cc']
					]
				},
				'line-width': {
					base: 1.2,
					stops: [
						[5, 0.4],
						[6, 0.6],
						[7, 1],
						[8, 1.4],
						[9, 1.9],
						[10, 1.9],
						[11, 4.5],
						[12, 5],
						[15, 8.6],
						[16, 16],
						[17, 19],
						[18, 25]
					]
				},
				'line-opacity': 1
			},
			metadata: {},
			filter: ['all', ['==', 'brunnel', 'tunnel'], ['in', 'class', 'trunk']]
		},
		{
			id: 'tunnel_trunk_construction',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			layout: { 'line-join': 'round', visibility: 'visible' },
			paint: {
				'line-color': '#f9b29c',
				'line-width': {
					base: 1.2,
					stops: [
						[5, 0.4],
						[6, 0.6],
						[7, 1],
						[8, 1.4],
						[9, 1.9],
						[10, 1.9],
						[11, 4.5],
						[12, 5],
						[15, 8.6],
						[16, 16],
						[17, 19],
						[18, 25]
					]
				},
				'line-opacity': 1,
				'line-dasharray': [2, 2]
			},
			metadata: {},
			filter: ['all', ['==', 'brunnel', 'tunnel'], ['in', 'class', 'trunk_construction']]
		},
		{
			id: 'tunnel_motorway',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			layout: { 'line-join': 'round', visibility: 'visible' },
			paint: {
				'line-color': {
					stops: [
						[5, '#e66e89'],
						[11, '#f1bcc6']
					]
				},
				'line-width': {
					base: 1.2,
					stops: [
						[5, 0],
						[7, 1],
						[18, 25]
					]
				}
			},
			metadata: {},
			filter: ['all', ['==', 'class', 'motorway'], ['==', 'brunnel', 'tunnel']]
		},
		{
			id: 'tunnel_motorway_construction',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			layout: { 'line-join': 'round', visibility: 'visible' },
			paint: {
				'line-color': {
					stops: [
						[5, '#e66e89'],
						[11, '#f1bcc6']
					]
				},
				'line-width': {
					base: 1.2,
					stops: [
						[5, 0],
						[7, 1],
						[18, 25]
					]
				},
				'line-dasharray': [2, 2]
			},
			metadata: {},
			filter: ['all', ['==', 'class', 'motorway_construction'], ['==', 'brunnel', 'tunnel']]
		},
		{
			id: 'tunnel_major_rail',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			layout: { visibility: 'visible' },
			paint: {
				'line-color': 'rgba(166, 166, 166, 1)',
				'line-width': {
					base: 1.4,
					stops: [
						[8, 0.8],
						[15, 3],
						[20, 5.4]
					]
				}
			},
			metadata: {},
			filter: ['all', ['==', 'brunnel', 'tunnel'], ['in', 'class', 'rail']]
		},
		{
			id: 'tunnel_major_rail_hatching',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			minzoom: 9,
			layout: { visibility: 'visible' },
			paint: {
				'line-color': {
					stops: [
						[8, 'rgba(114, 114, 114, 0.44)'],
						[10, 'rgba(199, 199, 199, 1)']
					]
				},
				'line-width': {
					base: 1.4,
					stops: [
						[8, 0],
						[15, 2],
						[20, 4]
					]
				},
				'line-dasharray': [2, 2]
			},
			metadata: {},
			filter: ['all', ['in', 'brunnel', 'tunnel', 'tunnel'], ['==', 'class', 'rail']]
		},
		{
			id: 'road_area_pier',
			type: 'fill',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			layout: { visibility: 'visible' },
			paint: { 'fill-color': 'rgba(246, 241, 229, 1)', 'fill-antialias': true },
			metadata: {},
			filter: ['all', ['==', '$type', 'Polygon'], ['==', 'class', 'pier']]
		},
		{
			id: 'road_pier',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			layout: { 'line-cap': 'round', 'line-join': 'round' },
			paint: {
				'line-color': 'rgba(246, 241, 229, 1)',
				'line-width': {
					base: 1.2,
					stops: [
						[15, 1],
						[17, 4]
					]
				}
			},
			metadata: {},
			filter: ['all', ['==', '$type', 'LineString'], ['==', 'class', 'pier']]
		},
		{
			id: 'road_area_bridge',
			type: 'fill',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			minzoom: 11,
			layout: { visibility: 'visible' },
			paint: { 'fill-color': '#b8b8b8', 'fill-antialias': true },
			metadata: {},
			filter: ['all', ['==', '$type', 'Polygon'], ['==', 'class', 'bridge']]
		},
		{
			id: 'road_area_platform',
			type: 'fill',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			layout: { visibility: 'visible' },
			paint: { 'fill-color': '#bababa' },
			metadata: {},
			filter: [
				'all',
				['==', '$type', 'Polygon'],
				['!has', 'brunnel'],
				['==', 'class', 'path'],
				['==', 'subclass', 'platform']
			]
		},
		{
			id: 'road_area_pedestrian',
			type: 'fill',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			layout: { visibility: 'visible' },
			paint: { 'fill-color': '#dddde8' },
			metadata: {},
			filter: [
				'all',
				['==', '$type', 'Polygon'],
				['!has', 'brunnel'],
				['!in', 'class', 'bridge', 'pier']
			]
		},
		{
			id: 'road_service_track_casing',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			minzoom: 13,
			layout: { 'line-cap': 'round', 'line-join': 'round' },
			paint: {
				'line-color': '#bbbbbb',
				'line-width': {
					base: 1.2,
					stops: [
						[13, 2],
						[15, 3.5],
						[16, 7],
						[17, 8.5],
						[18, 11],
						[19, 12]
					]
				}
			},
			metadata: {},
			filter: ['all', ['!in', 'brunnel', 'bridge', 'tunnel'], ['in', 'class', 'service', 'track']]
		},
		{
			id: 'road_primary_link_casing',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			minzoom: 11,
			layout: { 'line-cap': 'butt', 'line-join': 'round', visibility: 'visible' },
			paint: {
				'line-color': {
					stops: [
						[11, '#c38a27'],
						[12, '#a06b00']
					]
				},
				'line-width': {
					base: 1.2,
					stops: [
						[11, 1.5],
						[12, 4],
						[13, 4],
						[14, 7.8],
						[16, 12],
						[17, 13],
						[18, 16]
					]
				}
			},
			metadata: {},
			filter: [
				'all',
				['!in', 'brunnel', 'bridge', 'tunnel'],
				['==', 'ramp', 1],
				['in', 'class', 'primary']
			]
		},
		{
			id: 'road_trunk_link_casing',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			minzoom: 11,
			layout: { 'line-cap': 'butt', 'line-join': 'round', visibility: 'visible' },
			paint: {
				'line-color': {
					stops: [
						[11, '#cf6649'],
						[12, '#c84e2f']
					]
				},
				'line-width': {
					base: 1.2,
					stops: [
						[11, 1.5],
						[12, 4],
						[14, 7.8],
						[16, 12],
						[17, 13],
						[18, 16]
					]
				}
			},
			metadata: {},
			filter: [
				'all',
				['!in', 'brunnel', 'bridge', 'tunnel'],
				['==', 'ramp', 1],
				['in', 'class', 'trunk']
			]
		},
		{
			id: 'road_motorway_link_casing',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			minzoom: 11,
			layout: { 'line-cap': 'butt', 'line-join': 'round', visibility: 'visible' },
			paint: {
				'line-color': {
					stops: [
						[11, '#c24e6b'],
						[12, '#dc2a67']
					]
				},
				'line-width': {
					base: 1.2,
					stops: [
						[11, 1.5],
						[12, 4],
						[14, 7.8],
						[16, 12],
						[17, 13],
						[18, 16],
						[19, 17]
					]
				},
				'line-opacity': 1
			},
			metadata: {},
			filter: [
				'all',
				['!in', 'brunnel', 'bridge', 'tunnel'],
				['==', 'class', 'motorway'],
				['==', 'ramp', 1]
			]
		},
		{
			id: 'road_minor_casing',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			minzoom: 13,
			layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
			paint: {
				'line-color': '#bbbbbb',
				'line-width': {
					base: 1.2,
					stops: [
						[13, 3],
						[14, 5],
						[15, 6],
						[16, 12],
						[17, 13],
						[18, 17]
					]
				},
				'line-opacity': {
					stops: [
						[10, 0],
						[12.5, 1]
					]
				}
			},
			metadata: {},
			filter: [
				'all',
				['==', '$type', 'LineString'],
				['!in', 'brunnel', 'bridge', 'tunnel'],
				['in', 'class', 'minor'],
				['!=', 'ramp', '1']
			]
		},
		{
			id: 'road_tertiary_casing',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			minzoom: 11,
			layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
			paint: {
				'line-color': '#8f8f8f',
				'line-width': {
					base: 1.2,
					stops: [
						[11, 2.5],
						[12, 4],
						[13, 5],
						[14, 9],
						[15, 10],
						[16, 18],
						[17, 21],
						[18, 27]
					]
				},
				'line-opacity': 1
			},
			metadata: {},
			filter: [
				'all',
				['!in', 'brunnel', 'bridge', 'tunnel'],
				['in', 'class', 'tertiary'],
				['!=', 'ramp', 1]
			]
		},
		{
			id: 'road_secondary_link_casing',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			minzoom: 11,
			layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
			paint: {
				'line-color': {
					stops: [
						[11, '#9eae23'],
						[12, '#707d05']
					]
				},
				'line-width': {
					base: 1.2,
					stops: [
						[11, 3.5],
						[12, 5],
						[13, 5],
						[14, 9],
						[15, 10],
						[16, 18],
						[17, 21],
						[18, 27]
					]
				},
				'line-opacity': 1
			},
			metadata: {},
			filter: [
				'all',
				['!in', 'brunnel', 'bridge', 'tunnel'],
				['in', 'class', 'secondary'],
				['==', 'ramp', 1]
			]
		},
		{
			id: 'road_secondary_casing',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			minzoom: 11,
			layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
			paint: {
				'line-color': {
					stops: [
						[11, '#9eae23'],
						[12, '#707d05']
					]
				},
				'line-width': {
					base: 1.2,
					stops: [
						[11, 3.5],
						[12, 5],
						[13, 5],
						[14, 9],
						[15, 10],
						[16, 18],
						[17, 21],
						[18, 27]
					]
				},
				'line-opacity': 1
			},
			metadata: {},
			filter: [
				'all',
				['!in', 'brunnel', 'bridge', 'tunnel'],
				['in', 'class', 'secondary'],
				['!=', 'ramp', 1]
			]
		},
		{
			id: 'road_trunk_casing',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			minzoom: 11,
			layout: { 'line-cap': 'butt', 'line-join': 'round', visibility: 'visible' },
			paint: {
				'line-color': {
					stops: [
						[11, 'rgba(160, 116, 0, 1)'],
						[12, '#c84e2f']
					]
				},
				'line-width': {
					base: 1.2,
					stops: [
						[9, 6],
						[11, 3.5],
						[12, 5],
						[13, 5],
						[15, 10],
						[16, 18],
						[17, 21],
						[18, 27]
					]
				},
				'line-opacity': 1
			},
			metadata: {},
			filter: [
				'all',
				['!in', 'brunnel', 'bridge', 'tunnel'],
				['!=', 'ramp', 1],
				['in', 'class', 'trunk'],
				['!=', 'ramp', 1]
			]
		},
		{
			id: 'road_primary_casing',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			minzoom: 9,
			layout: { 'line-cap': 'butt', 'line-join': 'round', visibility: 'visible' },
			paint: {
				'line-color': {
					stops: [
						[10.9, 'rgba(255, 250, 234, 0.47)'],
						[11, 'rgba(160, 116, 0, 1)']
					]
				},
				'line-width': {
					base: 1.2,
					stops: [
						[9, 6],
						[11, 3.5],
						[12, 5],
						[13, 5],
						[15, 10],
						[16, 18],
						[17, 21],
						[18, 27]
					]
				},
				'line-opacity': 1
			},
			metadata: {},
			filter: [
				'all',
				['!in', 'brunnel', 'bridge', 'tunnel'],
				['!=', 'ramp', 1],
				['in', 'class', 'primary'],
				['!=', 'ramp', 1]
			]
		},
		{
			id: 'road_motorway_casing',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			minzoom: 5,
			layout: { 'line-cap': 'butt', 'line-join': 'round', visibility: 'visible' },
			paint: {
				'line-color': {
					stops: [
						[11, '#c24e6b'],
						[12, '#dc2a67']
					]
				},
				'line-width': {
					base: 1.2,
					stops: [
						[5, 0],
						[7, 1.75],
						[18, 27]
					]
				}
			},
			metadata: {},
			filter: [
				'all',
				['!in', 'brunnel', 'bridge', 'tunnel'],
				['==', 'class', 'motorway'],
				['!=', 'ramp', 1]
			]
		},
		{
			id: 'road_pedestrian_casing',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			layout: { visibility: 'visible' },
			paint: {
				'line-color': '#999999',
				'line-width': {
					stops: [
						[13, 3],
						[14, 5],
						[15, 6],
						[16, 12],
						[17, 13],
						[18, 17]
					]
				}
			},
			filter: [
				'all',
				['==', '$type', 'LineString'],
				['==', 'class', 'path'],
				['==', 'subclass', 'pedestrian'],
				['!=', 'brunel', 'tunnel']
			]
		},
		{
			id: 'road_pedestrian',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			layout: { visibility: 'visible' },
			paint: {
				'line-color': '#dddde8',
				'line-width': {
					stops: [
						[13, 1.9],
						[14, 3.8],
						[15, 4.8],
						[16, 10.4],
						[17, 11.4],
						[18, 15.4]
					]
				}
			},
			filter: [
				'all',
				['==', '$type', 'LineString'],
				['==', 'class', 'path'],
				['==', 'subclass', 'pedestrian'],
				['!=', 'brunel', 'tunnel']
			]
		},
		{
			id: 'road_path_steps_casing',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			minzoom: 15,
			layout: { 'line-join': 'round', visibility: 'visible' },
			paint: {
				'line-color': 'rgba(236, 236, 236, 1)',
				'line-width': {
					base: 1.2,
					stops: [
						[14, 4],
						[15, 4.3],
						[17, 4.3],
						[18, 4.6]
					]
				},
				'line-opacity': 0.6
			},
			metadata: {},
			filter: [
				'all',
				['==', '$type', 'LineString'],
				['!in', 'brunnel', 'bridge', 'tunnel'],
				['in', 'class', 'path'],
				['==', 'subclass', 'steps']
			]
		},
		{
			id: 'road_path_bridleway_casing',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			minzoom: 15,
			layout: { 'line-join': 'round', visibility: 'visible' },
			paint: {
				'line-color': 'rgba(236, 236, 236, 1)',
				'line-width': {
					base: 1.2,
					stops: [
						[14, 3],
						[15, 3.3],
						[17, 3.3],
						[18, 3.6]
					]
				},
				'line-opacity': 0.6
			},
			metadata: {},
			filter: [
				'all',
				['==', '$type', 'LineString'],
				['!in', 'brunnel', 'bridge', 'tunnel'],
				['in', 'class', 'path'],
				['any', ['==', 'subclass', 'bridleway'], ['==', 'horse', 'designated']],
				['!=', 'bicycle', 'designated']
			]
		},
		{
			id: 'road_path_cycleway_casing',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			minzoom: 15,
			layout: { 'line-join': 'round', visibility: 'visible' },
			paint: {
				'line-color': 'rgba(236, 236, 236, 1)',
				'line-width': {
					base: 1.2,
					stops: [
						[14, 3],
						[15, 3.3],
						[17, 3.3],
						[18, 3.6]
					]
				},
				'line-opacity': 0.6
			},
			metadata: {},
			filter: [
				'all',
				['==', '$type', 'LineString'],
				['!in', 'brunnel', 'bridge', 'tunnel'],
				['in', 'class', 'path'],
				['any', ['==', 'subclass', 'cycleway'], ['==', 'bicycle', 'designated']]
			]
		},
		{
			id: 'road_path_footway_casing',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			minzoom: 15,
			layout: { 'line-join': 'round', visibility: 'visible' },
			paint: {
				'line-color': 'rgba(236, 236, 236, 1)',
				'line-width': {
					base: 1.2,
					stops: [
						[14, 2.7],
						[15, 3],
						[17, 3.3],
						[18, 3.6]
					]
				},
				'line-opacity': 0.6
			},
			metadata: {},
			filter: [
				'all',
				['==', '$type', 'LineString'],
				['!in', 'brunnel', 'bridge', 'tunnel'],
				['in', 'class', 'path'],
				['in', 'subclass', 'footway', 'path'],
				['!=', 'bicycle', 'designated'],
				['!=', 'horse', 'designated']
			]
		},
		{
			id: 'road_path_cycleway',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			minzoom: 12,
			layout: { 'line-join': 'round', visibility: 'visible' },
			paint: {
				'line-color': '#0000ff',
				'line-width': {
					base: 1.2,
					stops: [
						[12, 0.7],
						[14, 0.9],
						[17, 1],
						[18, 1.3]
					]
				},
				'line-dasharray': [2, 2]
			},
			metadata: {},
			filter: [
				'all',
				['==', '$type', 'LineString'],
				['!in', 'brunnel', 'bridge', 'tunnel'],
				['in', 'class', 'path'],
				['any', ['==', 'subclass', 'cycleway'], ['==', 'bicycle', 'designated']]
			]
		},
		{
			id: 'road_path_steps',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			minzoom: 12,
			layout: { 'line-join': 'round', visibility: 'visible' },
			paint: {
				'line-color': '#fa8072',
				'line-width': {
					base: 1.2,
					stops: [
						[12, 1.7],
						[14, 1.9],
						[17, 2],
						[18, 2.3]
					]
				},
				'line-dasharray': [0.5, 0.5]
			},
			metadata: {},
			filter: [
				'all',
				['==', '$type', 'LineString'],
				['!in', 'brunnel', 'bridge', 'tunnel'],
				['in', 'class', 'path'],
				['==', 'subclass', 'steps']
			]
		},
		{
			id: 'road_path_bridleway',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			minzoom: 12,
			layout: { 'line-join': 'round', visibility: 'visible' },
			paint: {
				'line-color': '#008000',
				'line-width': {
					base: 1.2,
					stops: [
						[12, 0.7],
						[14, 0.9],
						[17, 1],
						[18, 1.3]
					]
				},
				'line-dasharray': [2, 2]
			},
			metadata: {},
			filter: [
				'all',
				['==', '$type', 'LineString'],
				['!in', 'brunnel', 'bridge', 'tunnel'],
				['in', 'class', 'path'],
				['any', ['==', 'subclass', 'bridleway'], ['==', 'horse', 'designated']],
				['!=', 'bicycle', 'designated']
			]
		},
		{
			id: 'road_path_footway',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			minzoom: 12,
			layout: { 'line-join': 'round', visibility: 'visible' },
			paint: {
				'line-color': '#fa8072',
				'line-width': {
					base: 1.2,
					stops: [
						[13, 0.6],
						[14, 1],
						[15, 1.3],
						[17, 1.3],
						[18, 1.6]
					]
				},
				'line-dasharray': [2, 1]
			},
			metadata: {},
			filter: [
				'all',
				['==', '$type', 'LineString'],
				['!in', 'brunnel', 'bridge', 'tunnel'],
				['in', 'class', 'path'],
				['in', 'subclass', 'footway', 'path'],
				['!=', 'bicycle', 'designated'],
				['!=', 'horse', 'designated']
			]
		},
		{
			id: 'road_primary_link',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
			paint: {
				'line-color': '#fcd6a4',
				'line-width': {
					base: 1.2,
					stops: [
						[11, 1.5],
						[12, 3],
						[13, 3],
						[14, 6.6],
						[16, 10.4],
						[17, 11.4],
						[18, 14.4]
					]
				}
			},
			metadata: {},
			filter: [
				'all',
				['!in', 'brunnel', 'bridge', 'tunnel'],
				['==', 'ramp', 1],
				['in', 'class', 'primary']
			]
		},
		{
			id: 'road_trunk_link',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			minzoom: 11,
			layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
			paint: {
				'line-color': {
					stops: [
						[6, '#fdb59e'],
						[11, '#f9b29c']
					]
				},
				'line-width': {
					base: 1.2,
					stops: [
						[11, 0.9],
						[12, 3],
						[14, 6.6],
						[16, 10.4],
						[17, 11.4],
						[18, 14.4]
					]
				}
			},
			metadata: {},
			filter: [
				'all',
				['!in', 'brunnel', 'bridge', 'tunnel'],
				['==', 'ramp', 1],
				['in', 'class', 'trunk']
			]
		},
		{
			id: 'road_motorway_link',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			minzoom: 8,
			layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
			paint: {
				'line-color': {
					stops: [
						[6, '#e66e89'],
						[10, '#e892a2']
					]
				},
				'line-width': {
					base: 1.2,
					stops: [
						[8, 0.7],
						[11, 0.9],
						[12, 3],
						[14, 6.6],
						[16, 10.4],
						[17, 11.4],
						[18, 14.4],
						[19, 15.4]
					]
				}
			},
			metadata: {},
			filter: [
				'all',
				['!in', 'brunnel', 'bridge', 'tunnel'],
				['==', 'class', 'motorway'],
				['==', 'ramp', 1]
			]
		},
		{
			id: 'road_service_track',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			minzoom: 12,
			layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
			paint: {
				'line-color': '#fff',
				'line-width': {
					base: 1.2,
					stops: [
						[13, 0.9],
						[15, 2.3],
						[15, 0.5],
						[16, 5.4],
						[17, 6.9],
						[18, 9.4],
						[19, 10.4]
					]
				}
			},
			metadata: {},
			filter: ['all', ['!in', 'brunnel', 'bridge', 'tunnel'], ['in', 'class', 'service', 'track']]
		},
		{
			id: 'road_service_track_construction',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			minzoom: 12,
			layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
			paint: {
				'line-color': '#fff',
				'line-width': {
					base: 1.2,
					stops: [
						[13, 0.9],
						[15, 2.3],
						[15, 0.5],
						[16, 5.4],
						[17, 6.9],
						[18, 9.4],
						[19, 10.4]
					]
				},
				'line-dasharray': [2, 2]
			},
			metadata: {},
			filter: [
				'all',
				['!in', 'brunnel', 'bridge', 'tunnel'],
				['in', 'class', 'service_construction', 'track_construction']
			]
		},
		{
			id: 'road_raceway',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			minzoom: 9,
			layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
			paint: {
				'line-color': 'rgba(254, 190, 200, 1)',
				'line-width': {
					base: 1.2,
					stops: [
						[11, 0.7],
						[12, 1.9],
						[13, 3.9],
						[14, 5.1],
						[15, 5.1],
						[16, 11.5],
						[17, 11.5],
						[18, 12.7]
					]
				}
			},
			metadata: {},
			filter: ['all', ['in', 'class', 'raceway']]
		},
		{
			id: 'road_minor',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			minzoom: 12,
			layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
			paint: {
				'line-color': {
					stops: [
						[12, '#d3d3d3'],
						[13, 'rgba(255, 255, 255, 1)']
					]
				},
				'line-width': {
					base: 1.2,
					stops: [
						[12, 1],
						[13, 1.9],
						[14, 3.8],
						[15, 4.8],
						[16, 10.4],
						[17, 11.4],
						[18, 15.4]
					]
				},
				'line-opacity': 1
			},
			metadata: {},
			filter: [
				'all',
				['==', ['geometry-type'], 'LineString'],
				[
					'all',
					['match', ['get', 'brunnel'], ['bridge', 'tunnel'], false, true],
					['match', ['get', 'class'], ['minor'], true, false]
				]
			]
		},
		{
			id: 'road_minor_construction',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			minzoom: 12,
			layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
			paint: {
				'line-color': {
					stops: [
						[12, '#d3d3d3'],
						[13, 'rgba(255, 255, 255, 1)']
					]
				},
				'line-width': {
					base: 1.2,
					stops: [
						[12, 1],
						[13, 1.9],
						[14, 3.8],
						[15, 4.8],
						[16, 10.4],
						[17, 11.4],
						[18, 15.4]
					]
				},
				'line-opacity': 1,
				'line-dasharray': [2, 2]
			},
			metadata: {},
			filter: [
				'all',
				['==', ['geometry-type'], 'LineString'],
				[
					'all',
					['match', ['get', 'brunnel'], ['bridge', 'tunnel'], false, true],
					['match', ['get', 'class'], ['minor_construction'], true, false]
				]
			]
		},
		{
			id: 'road_secondary',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			minzoom: 8,
			layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
			paint: {
				'line-color': {
					stops: [
						[10.5, '#bbbbbb'],
						[10.6, '#f7fabf']
					]
				},
				'line-width': {
					base: 1.2,
					stops: [
						[8, 1],
						[9, 1.1],
						[10, 1.1],
						[11, 2.9],
						[12, 4.3],
						[13, 4.3],
						[14, 7.6],
						[15, 8.6],
						[16, 16],
						[17, 19],
						[18, 25]
					]
				}
			},
			metadata: {},
			filter: ['all', ['!in', 'brunnel', 'bridge', 'tunnel'], ['in', 'class', 'secondary']]
		},
		{
			id: 'road_tertiary',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			minzoom: 9,
			layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
			paint: {
				'line-color': {
					stops: [
						[10.5, '#bbbbbb'],
						[10.6, '#FFFFFF']
					]
				},
				'line-width': {
					base: 1.2,
					stops: [
						[9, 0.7],
						[10, 0.7],
						[11, 1.9],
						[12, 3],
						[13, 3.9],
						[14, 7.8],
						[15, 8.8],
						[16, 16.4],
						[17, 19.4],
						[18, 25.4]
					]
				}
			},
			metadata: {},
			filter: ['all', ['!in', 'brunnel', 'bridge', 'tunnel'], ['in', 'class', 'tertiary']]
		},
		{
			id: 'road_tertiary_construction',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			minzoom: 9,
			layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
			paint: {
				'line-color': {
					stops: [
						[10.5, '#bbbbbb'],
						[10.6, '#fff']
					]
				},
				'line-width': {
					base: 1.2,
					stops: [
						[9, 0.7],
						[11, 1.9],
						[12, 3],
						[13, 3.9],
						[14, 7.8],
						[15, 8.8],
						[16, 16.4],
						[17, 19.4],
						[18, 25.4]
					]
				},
				'line-dasharray': [2, 2]
			},
			metadata: {},
			filter: [
				'all',
				['!in', 'brunnel', 'bridge', 'tunnel'],
				['in', 'class', 'tertiary_construction']
			]
		},
		{
			id: 'road_secondary_construction',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			minzoom: 8,
			layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
			paint: {
				'line-color': {
					stops: [
						[10.5, '#bbbbbb'],
						[10.6, '#f7fabf']
					]
				},
				'line-width': {
					base: 1.2,
					stops: [
						[8, 1],
						[9, 1.1],
						[10, 1.1],
						[11, 2.9],
						[12, 4.3],
						[13, 4.3],
						[14, 7.6],
						[15, 8.6],
						[16, 16],
						[17, 19],
						[18, 25]
					]
				},
				'line-dasharray': [2, 2]
			},
			metadata: {},
			filter: [
				'all',
				['!in', 'brunnel', 'bridge', 'tunnel'],
				['in', 'class', 'secondary_construction']
			]
		},
		{
			id: 'road_primary_construction',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			minzoom: 7,
			layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
			paint: {
				'line-color': {
					stops: [
						[7, '#f3c380'],
						[11, '#fcd6a4']
					]
				},
				'line-width': {
					base: 1.2,
					stops: [
						[7, 1],
						[8, 1.4],
						[9, 1.8],
						[10, 1.8],
						[11, 2.5],
						[12, 4],
						[13, 4],
						[15, 8.6],
						[16, 16],
						[17, 19],
						[18, 25]
					]
				}
			},
			metadata: {},
			filter: [
				'all',
				['!in', 'brunnel', 'bridge', 'tunnel'],
				['!=', 'ramp', 1],
				['in', 'class', 'primary_construction']
			]
		},
		{
			id: 'road_primary',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			minzoom: 7,
			layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
			paint: {
				'line-color': {
					stops: [
						[7, '#f3c380'],
						[11, '#fcd6a4']
					]
				},
				'line-width': {
					base: 1.2,
					stops: [
						[7, 1],
						[8, 1.4],
						[9, 1.8],
						[10, 1.8],
						[11, 2.5],
						[12, 4],
						[13, 4],
						[15, 8.6],
						[16, 16],
						[17, 19],
						[18, 25]
					]
				}
			},
			metadata: {},
			filter: [
				'all',
				['!in', 'brunnel', 'bridge', 'tunnel'],
				['!=', 'ramp', 1],
				['in', 'class', 'primary']
			]
		},
		{
			id: 'road_trunk',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			minzoom: 7,
			layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
			paint: {
				'line-color': {
					stops: [
						[5, '#fdb59e'],
						[11, '#f9b29c']
					]
				},
				'line-width': {
					base: 1.2,
					stops: [
						[7, 1],
						[8, 1.4],
						[9, 1.8],
						[10, 1.8],
						[11, 2.5],
						[12, 4],
						[13, 4],
						[15, 8.6],
						[16, 16],
						[17, 19],
						[18, 25]
					]
				}
			},
			metadata: {},
			filter: [
				'all',
				['!in', 'brunnel', 'bridge', 'tunnel'],
				['!=', 'ramp', 1],
				['in', 'class', 'trunk']
			]
		},
		{
			id: 'road_trunk_construction',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			minzoom: 7,
			layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
			paint: {
				'line-color': {
					stops: [
						[6, '#fdb59e'],
						[11, '#f9b29c']
					]
				},
				'line-width': {
					base: 1.2,
					stops: [
						[7, 1],
						[8, 1.4],
						[9, 1.8],
						[10, 1.8],
						[11, 2.5],
						[12, 4],
						[13, 4],
						[15, 8.6],
						[16, 16],
						[17, 19],
						[18, 25]
					]
				},
				'line-dasharray': [2, 2]
			},
			metadata: {},
			filter: [
				'all',
				['!in', 'brunnel', 'bridge', 'tunnel'],
				['!=', 'ramp', 1],
				['in', 'class', 'trunk_construction']
			]
		},
		{
			id: 'road_motorway',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			minzoom: 5,
			layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
			paint: {
				'line-color': {
					stops: [
						[6, '#e66e89'],
						[10, '#e892a2']
					]
				},
				'line-width': {
					base: 1.2,
					stops: [
						[5, 0],
						[7, 1],
						[18, 25]
					]
				}
			},
			metadata: {},
			filter: [
				'all',
				['!in', 'brunnel', 'bridge', 'tunnel'],
				['==', 'class', 'motorway'],
				['!=', 'ramp', 1]
			]
		},
		{
			id: 'road_motorway_construction',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			minzoom: 5,
			layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
			paint: {
				'line-color': {
					base: 1,
					stops: [
						[6, '#e892a2'],
						[10, '#e66e89']
					]
				},
				'line-width': {
					base: 1.2,
					stops: [
						[5, 0],
						[7, 1],
						[20, 18]
					]
				},
				'line-dasharray': [2, 2]
			},
			metadata: {},
			filter: [
				'all',
				['!in', 'brunnel', 'bridge', 'tunnel'],
				['==', 'class', 'motorway_construction'],
				['!=', 'ramp', 1]
			]
		},
		{
			id: 'rail_subway',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			layout: { visibility: 'visible' },
			paint: {
				'line-color': '#81817f',
				'line-width': {
					stops: [
						[14, 1],
						[18, 3]
					]
				},
				'line-opacity': 1,
				'line-dasharray': [1, 1.2]
			},
			metadata: {},
			filter: ['all', ['==', 'class', 'transit'], ['==', 'subclass', 'subway']]
		},
		{
			id: 'rail_major',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			layout: { visibility: 'visible' },
			paint: {
				'line-color': {
					stops: [
						[8, ' #787878'],
						[14, 'rgba(129, 129, 129, 1)']
					]
				},
				'line-width': {
					base: 1.4,
					stops: [
						[8, 0.8],
						[11, 1.5],
						[15, 3],
						[20, 5.4]
					]
				}
			},
			metadata: {},
			filter: ['all', ['!in', 'brunnel', 'bridge', 'tunnel'], ['in', 'class', 'rail']]
		},
		{
			id: 'rail_minor',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			layout: { visibility: 'visible' },
			paint: {
				'line-color': 'rgba(129, 129, 129, 1)',
				'line-width': {
					base: 1.4,
					stops: [
						[12, 0.8],
						[15, 1.2],
						[20, 4]
					]
				}
			},
			metadata: {},
			filter: [
				'all',
				['!in', 'brunnel', 'bridge', 'tunnel'],
				['in', 'subclass', 'tram', 'light_rail']
			]
		},
		{
			id: 'rail_major_hatching',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			minzoom: 8,
			layout: { visibility: 'visible' },
			paint: {
				'line-color': {
					stops: [
						[8, 'rgba(255, 255, 255, 0.44)'],
						[10, 'rgba(242, 242, 242, 0.44)']
					]
				},
				'line-width': {
					base: 1.4,
					stops: [
						[9, 0],
						[15, 2],
						[20, 4]
					]
				},
				'line-dasharray': [2, 2]
			},
			metadata: {},
			filter: ['all', ['!in', 'brunnel', 'bridge', 'tunnel'], ['==', 'class', 'rail']]
		},
		{
			id: 'rail_minor_hatching',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			layout: { visibility: 'visible' },
			paint: {
				'line-color': '#bbb',
				'line-width': {
					base: 1.4,
					stops: [
						[14.5, 0],
						[15, 2],
						[20, 6]
					]
				},
				'line-dasharray': [0.2, 4]
			},
			metadata: {},
			filter: [
				'all',
				['!in', 'brunnel', 'bridge', 'tunnel'],
				['in', 'subclass', 'tram', 'light_rail']
			]
		},
		{
			id: 'waterway-bridge-case',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'waterway',
			layout: { 'line-cap': 'butt', 'line-join': 'miter' },
			paint: {
				'line-color': '#bbbbbb',
				'line-width': {
					base: 1.6,
					stops: [
						[12, 0.5],
						[20, 5]
					]
				},
				'line-gap-width': {
					base: 1.3,
					stops: [
						[13, 0.5],
						[20, 6]
					]
				}
			},
			filter: ['all', ['==', '$type', 'LineString'], ['==', 'brunnel', 'bridge']]
		},
		{
			id: 'waterway-bridge',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'waterway',
			layout: { 'line-cap': 'round', 'line-join': 'round' },
			paint: {
				'line-color': 'rgba(134, 204, 250, 1)',
				'line-width': {
					base: 1.3,
					stops: [
						[13, 0.5],
						[20, 6]
					]
				}
			},
			filter: ['all', ['==', '$type', 'LineString'], ['==', 'brunnel', 'bridge']]
		},
		{
			id: 'bridge_motorway_link_casing',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			layout: { 'line-join': 'round', visibility: 'visible' },
			paint: {
				'line-color': {
					stops: [
						[11, '#c24e6b'],
						[12, '#dc2a67']
					]
				},
				'line-width': {
					base: 1.2,
					stops: [
						[12, 4],
						[14, 7],
						[18, 16],
						[19, 17]
					]
				},
				'line-opacity': 1
			},
			metadata: {},
			filter: ['all', ['==', 'class', 'motorway'], ['==', 'ramp', 1], ['==', 'brunnel', 'bridge']]
		},
		{
			id: 'bridge_service_track_casing',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			layout: { 'line-join': 'round' },
			paint: {
				'line-color': '#cfcdca',
				'line-width': {
					base: 1.2,
					stops: [
						[15, 1],
						[16, 4],
						[20, 11]
					]
				}
			},
			metadata: {},
			filter: ['all', ['==', 'brunnel', 'bridge'], ['in', 'class', 'service', 'track']]
		},
		{
			id: 'bridge_link_casing',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			layout: { 'line-join': 'round' },
			paint: {
				'line-color': '#e9ac77',
				'line-width': {
					base: 1.2,
					stops: [
						[12, 1],
						[13, 3],
						[14, 4],
						[20, 15]
					]
				},
				'line-opacity': 1
			},
			metadata: {},
			filter: ['all', ['==', 'class', 'link'], ['==', 'brunnel', 'bridge']]
		},
		{
			id: 'bridge_street_casing',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			layout: { 'line-join': 'round' },
			paint: {
				'line-color': 'hsl(36, 6%, 74%)',
				'line-width': {
					base: 1.2,
					stops: [
						[12, 0.5],
						[13, 1],
						[14, 4],
						[20, 25]
					]
				},
				'line-opacity': {
					stops: [
						[12, 0],
						[12.5, 1]
					]
				}
			},
			metadata: {},
			filter: ['all', ['==', 'brunnel', 'bridge'], ['in', 'class', 'street', 'street_limited']]
		},
		{
			id: 'bridge_path_casing_casing',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			minzoom: 13,
			layout: { 'line-join': 'miter', visibility: 'visible' },
			paint: {
				'line-color': 'rgba(0, 0, 0, 1)',
				'line-width': {
					base: 1.2,
					stops: [
						[13, 3.7],
						[14, 4],
						[15, 4.3],
						[17, 4.3],
						[18, 4.6]
					]
				},
				'line-dasharray': [1, 0]
			},
			metadata: {},
			filter: [
				'all',
				['==', '$type', 'LineString'],
				['==', 'brunnel', 'bridge'],
				['in', 'class', 'path']
			]
		},
		{
			id: 'bridge_path_casing',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			minzoom: 13,
			layout: { 'line-join': 'miter', visibility: 'visible' },
			paint: {
				'line-color': 'rgba(255, 255, 255, 1)',
				'line-width': {
					base: 1.2,
					stops: [
						[13, 2.7],
						[14, 3],
						[15, 3.3],
						[17, 3.3],
						[18, 3.6]
					]
				},
				'line-dasharray': [1, 0]
			},
			metadata: {},
			filter: [
				'all',
				['==', '$type', 'LineString'],
				['==', 'brunnel', 'bridge'],
				['in', 'class', 'path']
			]
		},
		{
			id: 'bridge_secondary_casing',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			minzoom: 12,
			layout: { 'line-join': 'round' },
			paint: {
				'line-color': '#000000',
				'line-width': {
					base: 1.2,
					stops: [
						[12, 5],
						[13, 5],
						[14, 9],
						[15, 10],
						[16, 18],
						[17, 21],
						[18, 27]
					]
				},
				'line-opacity': 1
			},
			metadata: {},
			filter: ['all', ['==', 'brunnel', 'bridge'], ['in', 'class', 'secondary', 'tertiary']]
		},
		{
			id: 'bridge_tertiary_casing',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			layout: { 'line-join': 'round' },
			paint: {
				'line-color': 'rgba(195, 189, 187, 1)',
				'line-width': {
					base: 1.2,
					stops: [
						[8, 1.5],
						[20, 17]
					]
				},
				'line-opacity': 1
			},
			metadata: {},
			filter: ['all', ['==', 'brunnel', 'bridge'], ['in', 'class', 'secondary', 'tertiary']]
		},
		{
			id: 'bridge_trunk_casing',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			minzoom: 11,
			layout: { 'line-join': 'round' },
			paint: {
				'line-color': {
					stops: [
						[11, '#cf6649'],
						[12, '#c84e2f']
					]
				},
				'line-width': {
					base: 1.2,
					stops: [
						[11, 3.5],
						[12, 6],
						[15, 10],
						[16, 18],
						[17, 21],
						[18, 27]
					]
				}
			},
			metadata: {},
			filter: ['all', ['==', 'brunnel', 'bridge'], ['in', 'class', 'trunk']]
		},
		{
			id: 'bridge_primary_casing',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			minzoom: 12,
			layout: { 'line-join': 'round' },
			paint: {
				'line-color': '#000000',
				'line-width': {
					base: 1.2,
					stops: [
						[12, 5],
						[13, 5],
						[15, 10],
						[16, 18],
						[17, 21],
						[18, 27]
					]
				}
			},
			metadata: {},
			filter: ['all', ['==', 'brunnel', 'bridge'], ['in', 'class', 'primary']]
		},
		{
			id: 'bridge_motorway_casing',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			layout: { 'line-join': 'round', visibility: 'visible' },
			paint: {
				'line-color': '#000000',
				'line-width': {
					base: 1.2,
					stops: [
						[5, 0],
						[7, 1.75],
						[18, 27]
					]
				}
			},
			metadata: {},
			filter: ['all', ['==', 'class', 'motorway'], ['==', 'brunnel', 'bridge'], ['!=', 'ramp', 1]]
		},
		{
			id: 'bridge_path_cycleway',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			minzoom: 13,
			paint: {
				'line-color': '#0000ff',
				'line-width': {
					base: 1.2,
					stops: [
						[13, 0.8],
						[14, 1],
						[15, 1.3],
						[17, 1.3],
						[18, 1.6]
					]
				},
				'line-dasharray': [2, 2]
			},
			metadata: {},
			filter: [
				'all',
				['==', '$type', 'LineString'],
				['==', 'brunnel', 'bridge'],
				['in', 'class', 'path'],
				['any', ['==', 'subclass', 'cycleway'], ['==', 'bicycle', 'designated']]
			]
		},
		{
			id: 'bridge_path_bridleway',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			minzoom: 13,
			paint: {
				'line-color': '#008000',
				'line-width': {
					base: 1.2,
					stops: [
						[13, 0.8],
						[14, 1],
						[15, 1.3],
						[17, 1.3],
						[18, 1.6]
					]
				},
				'line-dasharray': [2, 2]
			},
			metadata: {},
			filter: [
				'all',
				['==', '$type', 'LineString'],
				['==', 'brunnel', 'bridge'],
				['in', 'class', 'path'],
				['any', ['==', 'subclass', 'bridleway'], ['==', 'horse', 'designated']],
				['!=', 'bicycle', 'designated']
			]
		},
		{
			id: 'bridge_path_footway',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			minzoom: 13,
			paint: {
				'line-color': '#fa8072',
				'line-width': {
					base: 1.2,
					stops: [
						[13, 0.8],
						[14, 1],
						[15, 1.3],
						[17, 1.3],
						[18, 1.6]
					]
				},
				'line-dasharray': [2, 2]
			},
			metadata: {},
			filter: [
				'all',
				['==', '$type', 'LineString'],
				['==', 'brunnel', 'bridge'],
				['in', 'class', 'path'],
				['in', 'subclass', 'footway', 'path'],
				['!=', 'bicycle', 'designated'],
				['!=', 'horse', 'designated']
			]
		},
		{
			id: 'bridge_motorway_link',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			layout: { 'line-join': 'round', visibility: 'visible' },
			paint: {
				'line-color': {
					stops: [
						[6, '#e66e89'],
						[10, '#e892a2']
					]
				},
				'line-width': {
					base: 1.2,
					stops: [
						[12, 3],
						[14, 6],
						[18, 15],
						[19, 16]
					]
				}
			},
			metadata: {},
			filter: ['all', ['==', 'class', 'motorway'], ['==', 'ramp', 1], ['==', 'brunnel', 'bridge']]
		},
		{
			id: 'bridge_service_track',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			layout: { 'line-join': 'round', visibility: 'visible' },
			paint: {
				'line-color': '#fff',
				'line-width': {
					base: 1.2,
					stops: [
						[15.5, 0],
						[16, 2],
						[20, 7.5]
					]
				}
			},
			metadata: {},
			filter: ['all', ['==', 'brunnel', 'bridge'], ['in', 'class', 'service', 'track']]
		},
		{
			id: 'bridge_service_track_construction',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			layout: { 'line-join': 'round', visibility: 'visible' },
			paint: {
				'line-color': '#fff',
				'line-width': {
					base: 1.2,
					stops: [
						[15.5, 0],
						[16, 2],
						[20, 7.5]
					]
				},
				'line-dasharray': [2, 2]
			},
			metadata: {},
			filter: [
				'all',
				['==', 'brunnel', 'bridge'],
				['in', 'class', 'service_construction', 'track_construction']
			]
		},
		{
			id: 'bridge_link',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			layout: { 'line-join': 'round', visibility: 'visible' },
			paint: {
				'line-color': '#fea',
				'line-width': {
					base: 1.2,
					stops: [
						[12.5, 0],
						[13, 1.5],
						[14, 2.5],
						[20, 11.5]
					]
				}
			},
			metadata: {},
			filter: ['all', ['==', 'class', 'link'], ['==', 'brunnel', 'bridge']]
		},
		{
			id: 'bridge_minor',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			layout: { 'line-join': 'round' },
			paint: {
				'line-color': '#fff',
				'line-width': {
					base: 1.2,
					stops: [
						[13.5, 0],
						[14, 2.5],
						[20, 18]
					]
				},
				'line-opacity': 1
			},
			metadata: {},
			filter: ['all', ['==', 'brunnel', 'bridge'], ['in', 'class', 'minor']]
		},
		{
			id: 'bridge_minor_construction',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			layout: { 'line-join': 'round', visibility: 'visible' },
			paint: {
				'line-color': '#fff',
				'line-width': {
					base: 1.2,
					stops: [
						[13.5, 0],
						[14, 2.5],
						[20, 18]
					]
				},
				'line-opacity': 1,
				'line-dasharray': [2, 2]
			},
			metadata: {},
			filter: ['all', ['==', 'brunnel', 'bridge'], ['in', 'class', 'minor_construction']]
		},
		{
			id: 'bridge_tertiary',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			minzoom: 11,
			layout: { 'line-join': 'round', visibility: 'visible' },
			paint: {
				'line-color': '#ffffff',
				'line-width': {
					base: 1.2,
					stops: [
						[11, 2.3],
						[12, 3],
						[13, 4],
						[14, 7.5],
						[15, 8.5],
						[16, 16.4],
						[17, 19.4],
						[18, 25.4]
					]
				}
			},
			metadata: {},
			filter: ['all', ['==', 'brunnel', 'bridge'], ['in', 'class', 'tertiary']]
		},
		{
			id: 'bridge_secondary',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			minzoom: 7,
			layout: { 'line-join': 'round', visibility: 'visible' },
			paint: {
				'line-color': '#f7fabf',
				'line-width': {
					base: 1.2,
					stops: [
						[7, 1.5],
						[11, 3.3],
						[12, 4],
						[13, 3.8],
						[14, 7.5],
						[15, 8.5],
						[16, 16],
						[17, 19],
						[18, 25]
					]
				}
			},
			metadata: {},
			filter: ['all', ['==', 'brunnel', 'bridge'], ['in', 'class', 'secondary']]
		},
		{
			id: 'bridge_secondary_construction-copy',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			layout: { 'line-join': 'round' },
			paint: {
				'line-color': '#fff',
				'line-width': {
					base: 1.2,
					stops: [
						[6.5, 0],
						[8, 0.5],
						[20, 13]
					]
				},
				'line-dasharray': [2, 2]
			},
			metadata: {},
			filter: ['all', ['==', 'brunnel', 'bridge'], ['in', 'class', 'secondary_construction']]
		},
		{
			id: 'bridge_tertiary_construction',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			layout: { 'line-join': 'round' },
			paint: {
				'line-color': '#fff',
				'line-width': {
					base: 1.2,
					stops: [
						[6.5, 0],
						[8, 0.5],
						[20, 13]
					]
				},
				'line-dasharray': [2, 2]
			},
			metadata: {},
			filter: ['all', ['==', 'brunnel', 'bridge'], ['in', 'class', 'tertiary_construction']]
		},
		{
			id: 'bridge_primary',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			layout: { 'line-join': 'round', visibility: 'visible' },
			paint: {
				'line-color': '#fcd6a4',
				'line-width': {
					base: 1.2,
					stops: [
						[7, 1.5],
						[11, 3.3],
						[12, 4],
						[13, 4],
						[15, 8.5],
						[16, 16],
						[17, 19],
						[18, 25]
					]
				}
			},
			metadata: {},
			filter: ['all', ['==', 'brunnel', 'bridge'], ['in', 'class', 'primary']]
		},
		{
			id: 'bridge_trunk',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			layout: { 'line-join': 'round', visibility: 'visible' },
			paint: {
				'line-color': '#f9b29c',
				'line-width': {
					base: 1.2,
					stops: [
						[7, 1.5],
						[11, 4.5],
						[12, 5],
						[15, 8.5],
						[16, 16],
						[17, 19],
						[18, 25]
					]
				}
			},
			metadata: {},
			filter: ['all', ['==', 'brunnel', 'bridge'], ['in', 'class', 'trunk']]
		},
		{
			id: 'bridge_trunk_primary_construction',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			layout: { 'line-join': 'round', visibility: 'visible' },
			paint: {
				'line-color': '#fea',
				'line-width': {
					base: 1.2,
					stops: [
						[5, 0],
						[7, 1],
						[20, 18]
					]
				},
				'line-dasharray': [2, 2]
			},
			metadata: {},
			filter: [
				'all',
				['==', 'brunnel', 'bridge'],
				['in', 'class', 'primary_construction', 'trunk_construction']
			]
		},
		{
			id: 'bridge_motorway',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			layout: { 'line-join': 'round' },
			paint: {
				'line-color': {
					stops: [
						[6, '#e66e89'],
						[10, '#e892a2']
					]
				},
				'line-width': {
					base: 1.2,
					stops: [
						[5, 0],
						[7, 1],
						[18, 25]
					]
				}
			},
			metadata: {},
			filter: ['all', ['==', 'class', 'motorway'], ['==', 'brunnel', 'bridge'], ['!=', 'ramp', 1]]
		},
		{
			id: 'bridge_motorway_construction',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			layout: { 'line-join': 'round' },
			paint: {
				'line-color': {
					stops: [
						[6, '#e892a2'],
						[10, '#e66e89']
					]
				},
				'line-width': {
					base: 1.2,
					stops: [
						[5, 0],
						[7, 1],
						[18, 25]
					]
				},
				'line-dasharray': [2, 2]
			},
			metadata: {},
			filter: [
				'all',
				['==', 'class', 'motorway_construction'],
				['==', 'brunnel', 'bridge'],
				['!=', 'ramp', 1]
			]
		},
		{
			id: 'bridge_major_rail',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			layout: { visibility: 'visible' },
			paint: {
				'line-color': {
					stops: [
						[6, 'rgba(147, 147, 147, 1)'],
						[12, 'rgba(139, 139, 139, 1)'],
						[14, 'rgba(129, 129, 129, 1)']
					]
				},
				'line-width': {
					base: 1.4,
					stops: [
						[8, 0.5],
						[15, 3],
						[20, 5.4]
					]
				}
			},
			metadata: {},
			filter: ['all', ['==', 'brunnel', 'bridge'], ['in', 'class', 'rail']]
		},
		{
			id: 'bridge_major_rail_hatching',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			minzoom: 8,
			layout: { visibility: 'visible' },
			paint: {
				'line-color': {
					stops: [
						[8, 'rgba(255, 255, 255, 0.44)'],
						[10, 'rgba(201, 201, 201, 1)']
					]
				},
				'line-width': {
					base: 1.4,
					stops: [
						[9, 0],
						[15, 2],
						[20, 4]
					]
				},
				'line-dasharray': [2, 2]
			},
			metadata: {},
			filter: ['all', ['==', 'brunnel', 'bridge'], ['==', 'class', 'rail']]
		},
		{
			id: 'cablecar',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			minzoom: 13,
			layout: { 'line-cap': 'round', visibility: 'visible' },
			paint: {
				'line-color': '#808080',
				'line-width': {
					base: 1,
					stops: [
						[11, 1],
						[19, 2.5]
					]
				}
			},
			filter: ['==', 'class', 'aerialway']
		},
		{
			id: 'cablecar-dash',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			minzoom: 13,
			layout: { 'line-cap': 'round', visibility: 'visible' },
			paint: {
				'line-color': 'rgba(67, 67, 67, 1)',
				'line-width': {
					base: 1,
					stops: [
						[11, 1],
						[19, 3]
					]
				},
				'line-dasharray': [0.5, 10]
			},
			filter: ['==', 'class', 'aerialway']
		},
		{
			id: 'boundary_3',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'boundary',
			minzoom: 3,
			layout: { 'line-join': 'round', visibility: 'visible' },
			paint: {
				'line-color': '#845283',
				'line-width': {
					base: 1,
					stops: [
						[4, 0.4],
						[5, 0.7],
						[12, 1.6]
					]
				},
				'line-opacity': {
					stops: [
						[3, 0.5],
						[10, 1]
					]
				},
				'line-dasharray': [5, 3]
			},
			metadata: {},
			filter: ['all', ['in', 'admin_level', 3, 4], ['==', 'maritime', 0]]
		},
		{
			id: 'boundary_2',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'boundary',
			minzoom: 0,
			layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
			paint: {
				'line-color': '#a37da1',
				'line-width': {
					base: 1,
					stops: [
						[3, 0.5],
						[5, 1.2],
						[12, 3]
					]
				},
				'line-opacity': 1
			},
			metadata: {},
			filter: ['all', ['==', 'admin_level', 2], ['==', 'maritime', 0], ['==', 'disputed', 0]]
		},
		{
			id: 'boundary_2_disputed',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'boundary',
			minzoom: 0,
			layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
			paint: {
				'line-color': '#a37da1',
				'line-width': {
					base: 1,
					stops: [
						[3, 0.3],
						[5, 1.2],
						[12, 3]
					]
				},
				'line-opacity': 1,
				'line-dasharray': [4, 3]
			},
			metadata: {},
			filter: ['all', ['==', 'admin_level', 2], ['==', 'disputed', 1], ['==', 'maritime', 0]]
		},
		{
			id: 'boundary_2_disputed_maritime',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'boundary',
			minzoom: 0,
			layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
			paint: {
				'line-color': 'rgba(129, 125, 163, 1)',
				'line-width': {
					base: 1,
					stops: [
						[3, 0.5],
						[5, 1.2],
						[12, 3]
					]
				},
				'line-opacity': 1,
				'line-dasharray': [4, 3]
			},
			metadata: {},
			filter: ['all', ['==', 'admin_level', 2], ['==', 'disputed', 1], ['==', 'maritime', 1]]
		},
		{
			id: 'boundary_2_maritime',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'boundary',
			minzoom: 4,
			layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
			paint: {
				'line-color': '#a37da1',
				'line-width': {
					base: 1,
					stops: [
						[3, 0.5],
						[5, 1.2],
						[12, 3]
					]
				},
				'line-opacity': 1
			},
			metadata: {},
			filter: ['all', ['==', 'admin_level', 2], ['==', 'disputed', 0], ['==', 'maritime', 1]]
		},
		{
			id: 'water_way_name',
			type: 'symbol',
			source: 'openmaptiles',
			'source-layer': 'waterway',
			minzoom: 0,
			layout: {
				'text-font': ['Noto Sans Regular', 'Noto Sans Bold'],
				'text-size': {
					stops: [
						[11, 10],
						[13, 12]
					]
				},
				'text-field': '{name:latin}\n{name:nonlatin}',
				visibility: 'visible',
				'symbol-spacing': 400,
				'text-max-width': 5,
				'symbol-placement': 'line'
			},
			paint: {
				'text-color': '#4d80b3',
				'text-halo-color': 'rgba(255, 255, 255, 0.8)',
				'text-halo-width': 1
			},
			metadata: {},
			filter: ['all', ['==', '$type', 'LineString']]
		},
		{
			id: 'water_name_line',
			type: 'symbol',
			source: 'openmaptiles',
			'source-layer': 'water_name',
			minzoom: 0,
			layout: {
				'text-font': ['Noto Sans Regular', 'Noto Sans Bold'],
				'text-size': 12,
				'text-field': '{name:latin}\n{name:nonlatin}',
				visibility: 'visible',
				'text-max-width': 5,
				'symbol-placement': 'line'
			},
			paint: {
				'text-color': '#5d60be',
				'text-halo-color': 'rgba(255,255,255,0.7)',
				'text-halo-width': 1
			},
			metadata: {},
			filter: ['all', ['==', '$type', 'LineString']]
		},
		{
			id: 'water_name_point',
			type: 'symbol',
			source: 'openmaptiles',
			'source-layer': 'water_name',
			minzoom: 16,
			maxzoom: 24,
			layout: {
				'text-font': ['Noto Sans Regular'],
				'text-size': 11,
				'text-field': '{name:latin}\n{name:nonlatin}',
				visibility: 'visible',
				'text-max-width': 5
			},
			paint: {
				'text-color': 'rgba(76, 125, 173, 1)',
				'text-halo-color': 'rgba(255,255,255,0)',
				'text-halo-width': 1
			},
			metadata: {},
			filter: ['all', ['==', '$type', 'Point'], ['!=', 'class', 'ocean']]
		},
		{
			id: 'housenumber',
			type: 'symbol',
			source: 'openmaptiles',
			'source-layer': 'housenumber',
			minzoom: 17,
			layout: {
				'text-font': ['Noto Sans Regular'],
				'text-size': {
					stops: [
						[17, 9],
						[22, 11]
					]
				},
				'text-field': '{housenumber}',
				'text-padding': 3,
				'text-line-height': -0.15,
				'symbol-avoid-edges': false,
				'text-allow-overlap': false,
				'text-ignore-placement': false
			},
			paint: {
				'text-color': 'rgba(102, 102, 102, 1)',
				'text-halo-color': 'rgba(255,255,255,0.8)',
				'text-halo-width': 1
			}
		},
		{
			id: 'poi_shop-z17',
			type: 'symbol',
			source: 'openmaptiles',
			'source-layer': 'poi',
			minzoom: 17,
			layout: {
				'text-font': ['Noto Sans Bold'],
				'text-size': {
					stops: [
						[15, 10],
						[20, 11]
					]
				},
				'icon-image': '{subclass}',
				'text-field': '{name:latin}\n{name:nonlatin}',
				visibility: 'visible',
				'text-anchor': 'top',
				'text-offset': [0, 1.1],
				'text-padding': 2,
				'text-max-width': 9,
				'icon-allow-overlap': true
			},
			paint: {
				'text-color': ['match', ['get', 'class'], 'ice_cream', '#C77400', '#939'],
				'icon-opacity': 1,
				'icon-halo-blur': 1,
				'text-halo-blur': 0.5,
				'icon-halo-color': 'rgba(255, 255, 255, 1)',
				'icon-halo-width': 0.5,
				'text-halo-color': '#ffffff',
				'text-halo-width': 1
			},
			metadata: {},
			filter: [
				'all',
				[
					'in',
					'class',
					'shop',
					'clothing_store',
					'library',
					'art_gallery',
					'music',
					'alcohol_shop',
					'bakery'
				],
				['!in', 'subclass', 'mall', 'library', 'artwork']
			]
		},
		{
			id: 'poi_shop-z15',
			type: 'symbol',
			source: 'openmaptiles',
			'source-layer': 'poi',
			minzoom: 15,
			layout: {
				'text-font': ['Noto Sans Bold'],
				'text-size': {
					stops: [
						[15, 10],
						[20, 11]
					]
				},
				'icon-image': '{subclass}',
				'text-field': '{name:latin}\n{name:nonlatin}',
				visibility: 'visible',
				'text-anchor': 'top',
				'text-offset': [0, 1.1],
				'text-padding': 2,
				'text-max-width': 9,
				'icon-allow-overlap': true
			},
			paint: {
				'text-color': ['match', ['get', 'class'], 'ice_cream', '#C77400', '#939'],
				'icon-opacity': 1,
				'icon-halo-blur': 1,
				'text-halo-blur': 0.5,
				'icon-halo-color': 'rgba(255, 255, 255, 1)',
				'icon-halo-width': 0.5,
				'text-halo-color': '#ffffff',
				'text-halo-width': 1
			},
			metadata: {},
			filter: ['all', ['==', 'subclass', 'supermarket']]
		},
		{
			id: 'poi_waste',
			type: 'symbol',
			source: 'openmaptiles',
			'source-layer': 'poi',
			minzoom: 18,
			layout: {
				'text-font': ['Noto Sans Bold'],
				'text-size': {
					stops: [
						[15, 10],
						[20, 11]
					]
				},
				'icon-image': '{subclass}',
				'text-field': '{name:latin}\n{name:nonlatin}',
				visibility: 'visible',
				'text-anchor': 'top',
				'text-offset': [0, 0.8],
				'text-padding': 2,
				'text-max-width': 9,
				'icon-allow-overlap': false
			},
			paint: {
				'text-color': '#734a08',
				'icon-opacity': 1,
				'icon-halo-blur': 1,
				'text-halo-blur': 0.5,
				'icon-halo-color': 'rgba(255, 255, 255, 1)',
				'icon-halo-width': 0.5,
				'text-halo-color': '#ffffff',
				'text-halo-width': 1
			},
			metadata: {},
			filter: ['all', ['in', 'class', 'recycling', 'waste_basket', 'drinking_water', 'toilets']]
		},
		{
			id: 'poi_cemetery',
			type: 'symbol',
			source: 'openmaptiles',
			'source-layer': 'poi',
			minzoom: 14,
			layout: {
				'icon-size': 1,
				'text-font': ['Noto Sans Regular'],
				'text-size': 11,
				'text-field': '{name:latin}\n{name:nonlatin}',
				visibility: 'visible',
				'icon-anchor': 'bottom',
				'icon-offset': [0, 0],
				'text-anchor': 'center',
				'text-offset': [0, 0],
				'text-padding': 2,
				'icon-text-fit': 'none',
				'text-max-width': 14,
				'icon-allow-overlap': false,
				'icon-pitch-alignment': 'viewport'
			},
			paint: {
				'text-color': '#2d4931',
				'icon-translate': [0, 0],
				'text-translate': [0, 5],
				'text-halo-color': 'rgba(255, 255, 255, 1)',
				'text-halo-width': 0.8,
				'icon-translate-anchor': 'map',
				'text-translate-anchor': 'viewport'
			},
			metadata: {},
			filter: ['all', ['in', 'class', 'cemetery']]
		},
		{
			id: 'poi_school',
			type: 'symbol',
			source: 'openmaptiles',
			'source-layer': 'poi',
			minzoom: 16,
			layout: {
				'icon-size': 1,
				'text-font': ['Noto Sans Italic', 'Noto Sans Regular'],
				'text-size': 11,
				'icon-image': '{subclass}',
				'text-field': '{name:latin}\n{name:nonlatin}',
				visibility: 'visible',
				'icon-anchor': 'bottom',
				'icon-offset': [0, 0],
				'text-anchor': 'center',
				'text-offset': [0, 0],
				'text-padding': 2,
				'icon-text-fit': 'none',
				'text-max-width': 9,
				'icon-allow-overlap': false,
				'icon-pitch-alignment': 'viewport'
			},
			paint: {
				'text-color': '#4d4d00',
				'icon-translate': [0, 0],
				'text-translate': [0, 5],
				'text-halo-color': 'rgba(255, 255, 255, 1)',
				'text-halo-width': 0.8,
				'icon-translate-anchor': 'map',
				'text-translate-anchor': 'viewport'
			},
			metadata: {},
			filter: ['all', ['in', 'class', 'college', 'school']]
		},
		{
			id: 'poi_outdoor',
			type: 'symbol',
			source: 'openmaptiles',
			'source-layer': 'poi',
			minzoom: 16,
			layout: {
				'text-font': ['Noto Sans Bold'],
				'text-size': {
					stops: [
						[15, 10],
						[20, 11]
					]
				},
				'icon-image': '{subclass}',
				'text-field': '{name:latin}\n{name:nonlatin}',
				visibility: 'visible',
				'text-anchor': 'top',
				'text-offset': [0, 1.2],
				'text-padding': 2,
				'text-max-width': 9,
				'icon-allow-overlap': false
			},
			paint: {
				'text-color': '#008c0d',
				'icon-opacity': 1,
				'text-halo-blur': 0,
				'text-halo-color': '#ffffff',
				'text-halo-width': 1
			},
			metadata: {},
			filter: ['all', ['in', 'class', 'playground', 'stile', 'garden', 'gate']]
		},
		{
			id: 'poi_parking',
			type: 'symbol',
			source: 'openmaptiles',
			'source-layer': 'poi',
			minzoom: 15,
			layout: {
				'text-font': ['Noto Sans Bold'],
				'text-size': {
					stops: [
						[15, 10],
						[20, 11]
					]
				},
				'icon-image': '{subclass}',
				'text-field': {
					stops: [
						[15, ''],
						[16, '{name:latin}\n{name:nonlatin}']
					]
				},
				visibility: 'visible',
				'text-anchor': 'top',
				'text-offset': [0, 0.9],
				'text-padding': 2,
				'text-max-width': 6,
				'icon-allow-overlap': false
			},
			paint: {
				'text-color': '#0066ff',
				'icon-opacity': 1,
				'icon-halo-blur': 1,
				'text-halo-blur': 0.5,
				'icon-halo-color': 'rgba(255, 255, 255, 1)',
				'icon-halo-width': 0.5,
				'text-halo-color': '#ffffff',
				'text-halo-width': 1
			},
			metadata: {},
			filter: ['all', ['in', 'class', 'parking']]
		},
		{
			id: 'poi_golf',
			type: 'symbol',
			source: 'openmaptiles',
			'source-layer': 'poi',
			minzoom: 16,
			layout: {
				'text-font': ['Noto Sans Bold'],
				'text-size': {
					stops: [
						[15, 10],
						[20, 11]
					]
				},
				'icon-image': 'golf',
				'text-field': '{name:latin}\n{name:nonlatin}',
				visibility: 'visible',
				'text-anchor': 'top',
				'text-offset': [0, 1.2],
				'text-padding': 2,
				'text-max-width': 9,
				'icon-allow-overlap': false
			},
			paint: {
				'text-color': '#008c0d',
				'icon-opacity': 1,
				'icon-halo-blur': 1,
				'text-halo-blur': 0.5,
				'icon-halo-color': 'rgba(255, 255, 255, 1)',
				'icon-halo-width': 0.5,
				'text-halo-color': '#ffffff',
				'text-halo-width': 1
			},
			metadata: {},
			filter: ['all', ['in', 'class', 'golf']]
		},
		{
			id: 'poi_sport',
			type: 'symbol',
			source: 'openmaptiles',
			'source-layer': 'poi',
			minzoom: 16,
			layout: {
				'text-font': ['Noto Sans Italic'],
				'text-size': {
					stops: [
						[15, 10],
						[20, 11]
					]
				},
				'icon-image': '{subclass}',
				'text-field': '{name:latin}\n{name:nonlatin}',
				visibility: 'visible',
				'text-anchor': 'top',
				'text-offset': [0, 1.2],
				'text-padding': 2,
				'text-max-width': 9,
				'icon-allow-overlap': false
			},
			paint: {
				'text-color': '#008c0d',
				'icon-opacity': 1,
				'icon-halo-blur': 0,
				'text-halo-blur': 1,
				'text-halo-color': '#ffffff',
				'text-halo-width': 0.2
			},
			metadata: {},
			filter: ['all', ['in', 'class', 'stadium', 'swimming_pool', 'sports_centre', 'water_park']]
		},
		{
			id: 'poi_ferry',
			type: 'symbol',
			source: 'openmaptiles',
			'source-layer': 'poi',
			minzoom: 15,
			layout: {
				'text-font': ['Noto Sans Regular'],
				'text-size': {
					stops: [
						[15, 10],
						[20, 11]
					]
				},
				'icon-image': 'ferry',
				'text-field': '{name:latin}\n{name:nonlatin}',
				visibility: 'visible',
				'text-anchor': 'top',
				'text-offset': [0, 0.7],
				'text-padding': 2,
				'text-max-width': 9,
				'icon-allow-overlap': false
			},
			paint: {
				'text-color': '#5e3b9e',
				'icon-opacity': 1,
				'icon-halo-blur': 1,
				'text-halo-blur': 0.5,
				'icon-halo-color': 'rgba(255, 255, 255, 1)',
				'icon-halo-width': 0.5,
				'text-halo-color': '#ffffff',
				'text-halo-width': 1
			},
			metadata: {},
			filter: ['all', ['==', 'subclass', 'ferry_terminal'], ['==', 'class', 'ferry_terminal']]
		},
		{
			id: 'poi_food',
			type: 'symbol',
			source: 'openmaptiles',
			'source-layer': 'poi',
			minzoom: 16,
			layout: {
				'text-font': ['Noto Sans Bold'],
				'text-size': {
					stops: [
						[15, 10],
						[20, 11]
					]
				},
				'icon-image': '{subclass}',
				'text-field': '{name:latin}\n{name:nonlatin}',
				visibility: 'visible',
				'text-anchor': 'top',
				'text-offset': [0, 1],
				'text-padding': 2,
				'text-max-width': 9,
				'icon-allow-overlap': false
			},
			paint: {
				'text-color': '#C77400',
				'icon-opacity': 1,
				'icon-halo-blur': 1,
				'text-halo-blur': 0.5,
				'icon-halo-color': 'rgba(255, 255, 255, 1)',
				'icon-halo-width': 0.5,
				'text-halo-color': '#ffffff',
				'text-halo-width': 1
			},
			metadata: {},
			filter: [
				'all',
				['in', 'class', 'ice_cream', 'cafe', 'beer', 'bar', 'fast_food', 'restaurant']
			]
		},
		{
			id: 'poi_water',
			type: 'symbol',
			source: 'openmaptiles',
			'source-layer': 'poi',
			minzoom: 16,
			layout: {
				'text-font': ['Noto Sans Bold'],
				'text-size': {
					stops: [
						[15, 10],
						[20, 11]
					]
				},
				'icon-image': '{subclass}',
				'text-field': '{name:latin}\n{name:nonlatin}',
				visibility: 'visible',
				'text-anchor': 'top',
				'text-offset': [0, 1.2],
				'text-padding': 2,
				'text-max-width': 9,
				'icon-allow-overlap': false
			},
			paint: {
				'text-color': '#4d80b3',
				'icon-opacity': 1,
				'icon-halo-blur': 1,
				'text-halo-blur': 0.5,
				'icon-halo-color': 'rgba(255, 255, 255, 1)',
				'icon-halo-width': 0.5,
				'text-halo-color': '#ffffff',
				'text-halo-width': 1
			},
			metadata: {},
			filter: ['all', ['in', 'class', 'ice_rink']]
		},
		{
			id: 'poi_public',
			type: 'symbol',
			source: 'openmaptiles',
			'source-layer': 'poi',
			minzoom: 16,
			layout: {
				'text-font': ['Noto Sans Bold'],
				'text-size': {
					stops: [
						[15, 10],
						[20, 11]
					]
				},
				'icon-image': '{subclass}',
				'text-field': '{name:latin}\n{name:nonlatin}',
				visibility: 'visible',
				'text-anchor': 'top',
				'text-offset': [0, 0.8],
				'text-padding': 2,
				'text-max-width': 9,
				'icon-allow-overlap': false
			},
			paint: {
				'text-color': '#734a08',
				'icon-opacity': 1,
				'icon-halo-blur': 1,
				'text-halo-blur': 0.5,
				'icon-halo-color': 'rgba(255, 255, 255, 1)',
				'icon-halo-width': 0.5,
				'text-halo-color': '#ffffff',
				'text-halo-width': 1
			},
			metadata: {},
			filter: [
				'all',
				[
					'in',
					'class',
					'town_hall',
					'post',
					'library',
					'police',
					'information',
					'cinema',
					'theatre',
					'fire_station'
				],
				['!=', 'subclass', 'books']
			]
		},
		{
			id: 'poi_cultural',
			type: 'symbol',
			source: 'openmaptiles',
			'source-layer': 'poi',
			minzoom: 15,
			layout: {
				'text-font': ['Noto Sans Bold'],
				'text-size': {
					stops: [
						[15, 10],
						[20, 11]
					]
				},
				'icon-image': '{subclass}',
				'text-field': '{name:latin}\n{name:nonlatin}',
				visibility: 'visible',
				'text-anchor': 'top',
				'text-offset': [0, 0.8],
				'text-padding': 2,
				'text-max-width': 9,
				'icon-allow-overlap': false
			},
			paint: {
				'text-color': '#734a08',
				'icon-opacity': 1,
				'icon-halo-blur': 1,
				'text-halo-blur': 0.5,
				'icon-halo-color': 'rgba(255, 255, 255, 1)',
				'icon-halo-width': 0.5,
				'text-halo-color': '#ffffff',
				'text-halo-width': 1
			},
			metadata: {},
			filter: [
				'all',
				[
					'in',
					'class',
					'cinema',
					'library',
					'music',
					'museum',
					'castle',
					'monument',
					'art_gallery'
				],
				['!in', 'subclass', 'books', 'musical_instrument', 'art', 'gallery']
			]
		},
		{
			id: 'poi_attraction',
			type: 'symbol',
			source: 'openmaptiles',
			'source-layer': 'poi',
			minzoom: 15,
			layout: {
				'text-font': ['Noto Sans Bold'],
				'text-size': {
					stops: [
						[15, 10],
						[20, 11]
					]
				},
				'icon-image': '{subclass}',
				'text-field': '{name:latin}\n{name:nonlatin}',
				visibility: 'visible',
				'text-anchor': 'top',
				'text-offset': [0, 1.2],
				'text-padding': 2,
				'text-max-width': 9,
				'icon-allow-overlap': false
			},
			paint: {
				'text-color': '#660033',
				'icon-opacity': 1,
				'icon-halo-blur': 1,
				'text-halo-blur': 0.5,
				'icon-halo-color': 'rgba(255, 255, 255, 1)',
				'icon-halo-width': 0.5,
				'text-halo-color': '#ffffff',
				'text-halo-width': 1
			},
			metadata: {},
			filter: ['all', ['==', 'class', 'attraction']]
		},
		{
			id: 'poi_car',
			type: 'symbol',
			source: 'openmaptiles',
			'source-layer': 'poi',
			minzoom: 17,
			layout: {
				'text-font': ['Noto Sans Bold'],
				'text-size': {
					stops: [
						[15, 10],
						[20, 11]
					]
				},
				'icon-image': '{subclass}',
				'text-field': {
					stops: [
						[15, ''],
						[16, '{name:latin}\n{name:nonlatin}']
					]
				},
				visibility: 'visible',
				'text-anchor': 'top',
				'text-offset': [0, 1.2],
				'text-padding': 2,
				'text-max-width': 9,
				'icon-allow-overlap': false,
				'icon-ignore-placement': false
			},
			paint: {
				'text-color': '#0066ff',
				'icon-opacity': 1,
				'icon-halo-blur': 1,
				'text-halo-blur': 0.5,
				'icon-halo-color': 'rgba(255, 255, 255, 1)',
				'icon-halo-width': 0.5,
				'text-halo-color': '#ffffff',
				'text-halo-width': 1
			},
			metadata: {},
			filter: ['all', ['in', 'class', 'car', 'bicycle_parking', 'fuel']]
		},
		{
			id: 'poi_health',
			type: 'symbol',
			source: 'openmaptiles',
			'source-layer': 'poi',
			minzoom: 16,
			layout: {
				'text-font': ['Noto Sans Regular', 'Noto Sans Bold'],
				'text-size': {
					stops: [
						[14, 10],
						[20, 11]
					]
				},
				'icon-image': '{subclass}',
				'text-field': '{name:latin}\n{name:nonlatin}',
				visibility: 'visible',
				'text-anchor': 'top',
				'text-offset': [0, 1.2],
				'text-padding': 2,
				'text-max-width': 9,
				'icon-allow-overlap': false
			},
			paint: {
				'text-color': '#BF0000',
				'icon-opacity': 1,
				'icon-halo-blur': 1,
				'text-halo-blur': 0.5,
				'icon-halo-color': 'rgba(255, 255, 255, 1)',
				'icon-halo-width': 0.5,
				'text-halo-color': '#ffffff',
				'text-halo-width': 1
			},
			metadata: {},
			filter: ['all', ['in', 'class', 'pharmacy', 'dentist', 'veterinary']]
		},
		{
			id: 'poi_hospital',
			type: 'symbol',
			source: 'openmaptiles',
			'source-layer': 'poi',
			minzoom: 14,
			layout: {
				'text-font': ['Noto Sans Bold'],
				'text-size': {
					stops: [
						[14, 10],
						[20, 11]
					]
				},
				'icon-image': '{subclass}',
				'text-field': {
					stops: [
						[14, ''],
						[16, '{name:latin}\n{name:nonlatin}']
					]
				},
				visibility: 'visible',
				'text-anchor': 'top',
				'text-offset': [0, 1.2],
				'text-padding': 2,
				'text-max-width': 9,
				'icon-allow-overlap': false
			},
			paint: {
				'text-color': '#BF0000',
				'icon-opacity': 1,
				'icon-halo-blur': 1,
				'text-halo-blur': 0.5,
				'icon-halo-color': 'rgba(255, 255, 255, 1)',
				'icon-halo-width': 0.5,
				'text-halo-color': '#ffffff',
				'text-halo-width': 1
			},
			metadata: {},
			filter: ['all', ['in', 'class', 'hospital']]
		},
		{
			id: 'poi_campsite',
			type: 'symbol',
			source: 'openmaptiles',
			'source-layer': 'poi',
			minzoom: 16,
			layout: {
				'text-font': ['Noto Sans Bold'],
				'text-size': {
					stops: [
						[15, 10],
						[20, 11]
					]
				},
				'icon-image': 'camping',
				'text-field': '{name:latin}\n{name:nonlatin}',
				visibility: 'visible',
				'text-anchor': 'top',
				'text-offset': [0, 1.2],
				'text-padding': 2,
				'text-max-width': 9,
				'icon-allow-overlap': false
			},
			paint: {
				'text-color': '#0066ff',
				'icon-opacity': 1,
				'icon-halo-blur': 1,
				'text-halo-blur': 0.5,
				'icon-halo-color': 'rgba(255, 255, 255, 1)',
				'icon-halo-width': 0.5,
				'text-halo-color': '#ffffff',
				'text-halo-width': 1
			},
			metadata: {},
			filter: ['all', ['in', 'class', 'campsite']]
		},
		{
			id: 'poi_accommodation',
			type: 'symbol',
			source: 'openmaptiles',
			'source-layer': 'poi',
			minzoom: 17,
			layout: {
				'text-font': ['Noto Sans Bold'],
				'text-size': {
					stops: [
						[15, 10],
						[20, 11]
					]
				},
				'icon-image': '{subclass}',
				'text-field': {
					stops: [
						[17, ''],
						[18, '{name:latin}\n{name:nonlatin}']
					]
				},
				visibility: 'visible',
				'text-anchor': 'top',
				'text-offset': [0, 0.6],
				'text-padding': 2,
				'text-max-width': 9,
				'icon-allow-overlap': false
			},
			paint: {
				'text-color': '#0066ff',
				'icon-opacity': 1,
				'icon-halo-blur': 1,
				'text-halo-blur': 0.5,
				'icon-halo-color': 'rgba(255, 255, 255, 1)',
				'icon-halo-width': 0.5,
				'text-halo-color': '#ffffff',
				'text-halo-width': 1
			},
			metadata: {},
			filter: ['all', ['in', 'class', 'lodging', 'campsite']]
		},
		{
			id: 'poi_place_of_worship',
			type: 'symbol',
			source: 'openmaptiles',
			'source-layer': 'poi',
			minzoom: 16,
			layout: {
				'icon-size': 1,
				'text-font': ['Noto Sans Bold'],
				'text-size': {
					stops: [
						[15, 10],
						[20, 12]
					]
				},
				'icon-image': '{subclass}',
				'text-field': {
					stops: [
						[15, ''],
						[16, '{name:latin}\n{name:nonlatin}']
					]
				},
				visibility: 'visible',
				'text-anchor': 'top',
				'text-offset': [0, 1.2],
				'text-padding': 2,
				'text-max-width': 9,
				'icon-allow-overlap': false,
				'text-allow-overlap': false
			},
			paint: {
				'text-color': 'rgba(56, 56, 71, 1)',
				'text-halo-blur': 0.5,
				'text-halo-color': '#ffffff',
				'text-halo-width': 1
			},
			metadata: {},
			filter: ['all', ['==', 'class', 'place_of_worship']]
		},
		{
			id: 'poi_busstop',
			type: 'symbol',
			source: 'openmaptiles',
			'source-layer': 'poi',
			minzoom: 17,
			layout: {
				'icon-size': 1,
				'text-font': ['Noto Sans Regular'],
				'text-size': {
					stops: [
						[15, 10],
						[20, 11]
					]
				},
				'icon-image': 'bus_stop.12',
				'text-field': '{name:latin}\n{name:nonlatin}',
				visibility: 'visible',
				'icon-anchor': 'bottom',
				'text-anchor': 'top',
				'text-padding': 2,
				'icon-text-fit': 'none',
				'text-max-width': 14,
				'icon-keep-upright': true,
				'icon-allow-overlap': false,
				'icon-pitch-alignment': 'viewport'
			},
			paint: {
				'text-color': '#0066ff',
				'icon-translate': [0, 0],
				'text-translate': [0, 4],
				'text-halo-color': 'rgba(255, 255, 255, 1)',
				'text-halo-width': 0.8,
				'icon-translate-anchor': 'map',
				'text-translate-anchor': 'viewport'
			},
			metadata: {},
			filter: ['all', ['in', 'class', 'bus']]
		},
		{
			id: 'poi_bus',
			type: 'symbol',
			source: 'openmaptiles',
			'source-layer': 'poi',
			minzoom: 17,
			layout: {
				'icon-size': 1,
				'text-font': ['Noto Sans Bold', 'Noto Sans Regular'],
				'text-size': 11,
				'icon-image': '{subclass}',
				'text-field': '{name:latin}\n{name:nonlatin}',
				visibility: 'visible',
				'icon-anchor': 'bottom',
				'icon-offset': [0, 0],
				'text-anchor': 'center',
				'text-padding': 2,
				'icon-text-fit': 'none',
				'text-max-width': 14,
				'icon-keep-upright': true,
				'icon-allow-overlap': false,
				'icon-pitch-alignment': 'viewport'
			},
			paint: {
				'text-color': '#0066ff',
				'icon-translate': [0, 0],
				'text-translate': [0, 5],
				'text-halo-color': 'rgba(255, 255, 255, 1)',
				'text-halo-width': 0.8,
				'icon-translate-anchor': 'map',
				'text-translate-anchor': 'viewport'
			},
			metadata: {},
			filter: ['all', ['in', 'class', 'bus'], ['!in', 'subclass', 'bus_stop']]
		},
		{
			id: 'poi_harbor',
			type: 'symbol',
			source: 'openmaptiles',
			'source-layer': 'poi',
			minzoom: 16,
			layout: {
				'text-font': ['Noto Sans Bold'],
				'text-size': {
					stops: [
						[14, 13],
						[20, 16]
					]
				},
				'text-field': '{name:latin}\n{name:nonlatin}',
				visibility: 'visible',
				'text-anchor': 'top',
				'text-padding': 2,
				'text-max-width': 6,
				'icon-allow-overlap': false
			},
			paint: {
				'text-color': '#576ddf',
				'icon-opacity': 1,
				'icon-halo-blur': 1,
				'text-halo-blur': 0.1,
				'icon-halo-color': 'rgba(255, 255, 255, 1)',
				'icon-halo-width': 0.2,
				'text-halo-color': '#ffffff',
				'text-halo-width': 0.3
			},
			metadata: {},
			filter: ['all', ['==', 'class', 'harbor']]
		},
		{
			id: 'poi_mall',
			type: 'symbol',
			source: 'openmaptiles',
			'source-layer': 'poi',
			minzoom: 15,
			layout: {
				'text-font': ['Noto Sans Italic'],
				'text-size': {
					stops: [
						[15, 12],
						[20, 16]
					]
				},
				'text-field': '{name:latin}\n{name:nonlatin}',
				visibility: 'visible',
				'text-anchor': 'top',
				'text-offset': [0, 1.1],
				'text-padding': 2,
				'text-max-width': 9,
				'icon-allow-overlap': false
			},
			paint: {
				'text-color': '#d11700',
				'icon-opacity': 1,
				'icon-halo-blur': 1,
				'text-halo-blur': 0.5,
				'icon-halo-color': 'rgba(255, 255, 255, 1)',
				'icon-halo-width': 0.5,
				'text-halo-color': '#ffffff',
				'text-halo-width': 1
			},
			metadata: {},
			filter: ['all', ['==', 'class', 'shop'], ['==', 'subclass', 'mall']]
		},
		{
			id: 'poi_train',
			type: 'symbol',
			source: 'openmaptiles',
			'source-layer': 'poi',
			minzoom: 10,
			layout: {
				'icon-size': 1,
				'text-font': ['Noto Sans Bold', 'Noto Sans Regular'],
				'text-size': 11,
				'icon-image': 'square_train',
				'text-field': '{name:latin}\n{name:nonlatin}',
				visibility: 'visible',
				'icon-anchor': 'bottom',
				'icon-offset': [0, 0],
				'text-anchor': 'center',
				'text-offset': [0, 0.5],
				'text-padding': 2,
				'icon-text-fit': 'none',
				'text-max-width': 12,
				'icon-allow-overlap': false,
				'text-allow-overlap': false,
				'icon-pitch-alignment': 'viewport'
			},
			paint: {
				'text-color': '#4957ad',
				'icon-translate': [0, 0],
				'text-translate': [0, 1],
				'text-halo-color': 'rgba(255, 255, 255, 1)',
				'text-halo-width': 0.8,
				'icon-translate-anchor': 'map',
				'text-translate-anchor': 'viewport'
			},
			metadata: {},
			filter: ['all', ['in', 'class', 'railway']]
		},
		{
			id: 'road_path_oneway',
			type: 'symbol',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			minzoom: 15,
			layout: {
				'icon-size': {
					stops: [
						[15, 0.7],
						[20, 1]
					]
				},
				'icon-image': 'oneway-path',
				visibility: 'visible',
				'icon-padding': 2,
				'symbol-spacing': 125,
				'symbol-placement': 'line',
				'icon-rotation-alignment': 'map'
			},
			paint: { 'icon-opacity': 1 },
			filter: ['all', ['==', 'oneway', 1], ['==', 'class', 'path']]
		},
		{
			id: 'road_oneway',
			type: 'symbol',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			minzoom: 15,
			layout: {
				'icon-size': {
					stops: [
						[15, 0.8],
						[20, 1]
					]
				},
				'icon-image': 'oneway',
				visibility: 'visible',
				'icon-padding': 2,
				'symbol-spacing': 95,
				'symbol-placement': 'line',
				'icon-rotation-alignment': 'map'
			},
			paint: { 'icon-opacity': 1 },
			filter: [
				'all',
				['==', 'oneway', 1],
				['in', 'class', 'motorway', 'trunk', 'primary', 'secondary', 'tertiary', 'minor', 'service']
			]
		},
		{
			id: 'road_oneway_opposite',
			type: 'symbol',
			source: 'openmaptiles',
			'source-layer': 'transportation',
			minzoom: 15,
			layout: {
				'icon-size': {
					stops: [
						[15, 0.5],
						[19, 1]
					]
				},
				'icon-image': 'oneway',
				visibility: 'visible',
				'icon-rotate': -90,
				'icon-padding': 2,
				'symbol-spacing': 75,
				'symbol-placement': 'line',
				'icon-rotation-alignment': 'map'
			},
			paint: { 'icon-opacity': 0.5 },
			filter: [
				'all',
				['==', 'oneway', -1],
				['in', 'class', 'motorway', 'trunk', 'primary', 'secondary', 'tertiary', 'minor', 'service']
			]
		},
		{
			id: 'ferry_label',
			type: 'symbol',
			source: 'openmaptiles',
			'source-layer': 'transportation_name',
			minzoom: 14,
			layout: {
				'text-font': ['Noto Sans Regular'],
				'text-size': 10,
				'text-field': '{name}',
				'text-anchor': 'center',
				'text-offset': [0, 0],
				'symbol-placement': 'line'
			},
			paint: {
				'text-color': '#6666ff',
				'text-halo-blur': 1,
				'text-halo-color': 'rgba(255, 255, 255, 0.34)',
				'text-halo-width': 1
			},
			metadata: {},
			filter: ['all', ['==', 'subclass', 'ferry']]
		},
		{
			id: 'road_label',
			type: 'symbol',
			source: 'openmaptiles',
			'source-layer': 'transportation_name',
			minzoom: 14,
			layout: {
				'text-font': ['Noto Sans Regular'],
				'text-size': {
					base: 1,
					stops: [
						[14, 9],
						[18, 13]
					]
				},
				'text-field': '{name}',
				'text-anchor': 'center',
				'text-offset': [0, 0],
				'symbol-placement': 'line'
			},
			paint: {
				'text-color': '#000000',
				'text-halo-color': 'rgba(255, 255, 255, 0.97)',
				'text-halo-width': 1
			},
			metadata: {},
			filter: ['all', ['!=', 'subclass', 'ferry']]
		},
		{
			id: 'highway-shield-tertiary',
			type: 'symbol',
			source: 'openmaptiles',
			'source-layer': 'transportation_name',
			minzoom: 9,
			layout: {
				'icon-size': 1,
				'text-font': ['Noto Sans Regular'],
				'text-size': {
					stops: [
						[9, 10],
						[15, 11],
						[17, 12]
					]
				},
				'icon-image': 'road_tertiary',
				'text-field': '{ref}',
				visibility: 'visible',
				'icon-anchor': 'center',
				'icon-padding': 2,
				'icon-text-fit': 'both',
				'symbol-spacing': 560,
				'symbol-placement': {
					base: 1,
					stops: [
						[10, 'point'],
						[11, 'line']
					]
				},
				'symbol-avoid-edges': true,
				'icon-text-fit-padding': [3, 4, 3, 4],
				'icon-rotation-alignment': 'viewport',
				'text-rotation-alignment': 'viewport'
			},
			paint: { 'text-color': '#3b3b3b' },
			filter: ['all', ['==', '$type', 'LineString'], ['==', 'class', 'tertiary'], ['has', 'ref']]
		},
		{
			id: 'highway-shield-secondary',
			type: 'symbol',
			source: 'openmaptiles',
			'source-layer': 'transportation_name',
			minzoom: 9,
			layout: {
				'icon-size': 1,
				'text-font': ['Noto Sans Regular'],
				'text-size': {
					stops: [
						[9, 10],
						[15, 11],
						[17, 12]
					]
				},
				'icon-image': 'road_secondary',
				'text-field': '{ref}',
				visibility: 'visible',
				'icon-anchor': 'center',
				'icon-padding': 2,
				'icon-text-fit': 'both',
				'symbol-spacing': 560,
				'symbol-placement': {
					base: 1,
					stops: [
						[10, 'point'],
						[11, 'line']
					]
				},
				'symbol-avoid-edges': true,
				'icon-text-fit-padding': [3, 4, 3, 4],
				'icon-rotation-alignment': 'viewport',
				'text-rotation-alignment': 'viewport'
			},
			paint: { 'text-color': '#323b00' },
			filter: ['all', ['==', '$type', 'LineString'], ['==', 'class', 'secondary'], ['has', 'ref']]
		},
		{
			id: 'highway-shield-primary',
			type: 'symbol',
			source: 'openmaptiles',
			'source-layer': 'transportation_name',
			minzoom: 9,
			layout: {
				'icon-size': 1,
				'text-font': ['Noto Sans Regular'],
				'text-size': {
					stops: [
						[9, 10],
						[15, 11],
						[17, 12]
					]
				},
				'icon-image': 'road_primary',
				'text-field': '{ref}',
				visibility: 'visible',
				'icon-anchor': 'center',
				'icon-padding': 2,
				'icon-text-fit': 'both',
				'symbol-spacing': 560,
				'symbol-placement': {
					base: 1,
					stops: [
						[10, 'point'],
						[11, 'line']
					]
				},
				'symbol-avoid-edges': true,
				'icon-text-fit-padding': [3, 4, 3, 4],
				'icon-rotation-alignment': 'viewport',
				'text-rotation-alignment': 'viewport'
			},
			paint: { 'text-color': '#4c2e00' },
			filter: ['all', ['==', '$type', 'LineString'], ['==', 'class', 'primary'], ['has', 'ref']]
		},
		{
			id: 'highway-shield-motorway',
			type: 'symbol',
			source: 'openmaptiles',
			'source-layer': 'transportation_name',
			minzoom: 9,
			layout: {
				'icon-size': 1,
				'text-font': ['Noto Sans Regular'],
				'text-size': {
					stops: [
						[9, 10],
						[15, 11],
						[17, 12]
					]
				},
				'icon-image': 'road_motorway',
				'text-field': '{ref}',
				visibility: 'visible',
				'icon-anchor': 'center',
				'icon-padding': 2,
				'icon-text-fit': 'both',
				'text-optional': false,
				'symbol-spacing': 760,
				'text-max-width': 10,
				'symbol-placement': {
					base: 1,
					stops: [
						[10, 'point'],
						[11, 'line']
					]
				},
				'text-keep-upright': true,
				'symbol-avoid-edges': true,
				'icon-text-fit-padding': [3, 4, 3, 4],
				'icon-rotation-alignment': 'viewport',
				'text-rotation-alignment': 'viewport'
			},
			paint: { 'text-color': '#620728' },
			filter: ['all', ['==', '$type', 'LineString'], ['==', 'class', 'motorway'], ['has', 'ref']]
		},
		{
			id: 'airport-label-major',
			type: 'symbol',
			source: 'openmaptiles',
			'source-layer': 'aerodrome_label',
			minzoom: 8,
			maxzoom: 17,
			layout: {
				'icon-size': 1,
				'text-font': ['Noto Sans Italic'],
				'text-size': {
					stops: [
						[8, 10],
						[14, 12]
					]
				},
				'icon-image': 'aerodrome.12',
				'text-field': {
					stops: [
						[8, ' '],
						[11, '{name:latin}\n{name:nonlatin}']
					]
				},
				visibility: 'visible',
				'text-anchor': 'top',
				'text-offset': [0, 0.6],
				'text-padding': 2,
				'text-optional': true,
				'symbol-z-order': 'auto',
				'text-max-width': 9,
				'icon-allow-overlap': false,
				'text-allow-overlap': false
			},
			paint: {
				'text-color': '#5e3b9e',
				'text-halo-blur': 0.5,
				'text-halo-color': 'rgba(255, 255, 255, 0.8)',
				'text-halo-width': 1
			},
			filter: ['all', ['has', 'iata']]
		},
		{
			id: 'airport_label',
			type: 'symbol',
			source: 'openmaptiles',
			'source-layer': 'aeroway',
			minzoom: 14,
			layout: {
				'text-font': ['Noto Sans Italic', 'Noto Sans Regular'],
				'text-size': {
					stops: [
						[15, 9],
						[19, 15]
					]
				},
				'text-field': '{ref}',
				visibility: 'visible',
				'symbol-placement': 'line'
			},
			paint: {
				'text-color': '#333333',
				'text-halo-color': 'rgba(255, 255, 255, 0.8)',
				'text-halo-width': 1
			},
			filter: ['all', ['in', 'class', 'runway', 'taxiway']]
		},
		{
			id: 'airport_gate',
			type: 'symbol',
			source: 'openmaptiles',
			'source-layer': 'aeroway',
			minzoom: 16.5,
			layout: {
				'text-font': ['Noto Sans Regular'],
				'text-size': {
					stops: [
						[17, 9],
						[19, 15]
					]
				},
				'text-field': '{ref}',
				visibility: 'visible'
			},
			paint: {
				'text-color': 'rgba(135, 135, 135, 1)',
				'text-halo-color': 'rgba(255, 255, 255, 1)',
				'text-halo-width': 1
			},
			filter: ['all', ['==', 'class', 'gate']]
		},
		{
			id: 'place_other',
			type: 'symbol',
			source: 'openmaptiles',
			'source-layer': 'place',
			minzoom: 8,
			layout: {
				'text-font': ['Noto Sans Regular'],
				'text-size': {
					base: 1.2,
					stops: [
						[11, 10],
						[14, 14],
						[18, 16]
					]
				},
				'text-field': '{name:latin}\n{name:nonlatin}',
				visibility: 'visible',
				'symbol-spacing': 150,
				'text-max-width': 10,
				'text-transform': 'none'
			},
			paint: {
				'text-color': {
					stops: [
						[12.5, '#222222'],
						[12.6, '#777777']
					]
				},
				'text-halo-blur': 0,
				'text-halo-color': {
					stops: [
						[11, 'rgba(255,255,255,0.6)'],
						[13, '#ffffff']
					]
				},
				'text-halo-width': {
					stops: [
						[8, 0.8],
						[13, 1.5]
					]
				}
			},
			metadata: {},
			filter: [
				'all',
				['in', 'class', 'hamlet', 'island', 'islet', 'neighbourhood', 'suburb', 'borough']
			]
		},
		{
			id: 'park-local',
			type: 'symbol',
			source: 'openmaptiles',
			'source-layer': 'poi',
			minzoom: 15,
			layout: {
				'text-font': ['Noto Sans Italic'],
				'text-size': {
					stops: [
						[15, 10],
						[20, 13]
					]
				},
				'text-field': '{name:latin}{name:nonlatin}',
				visibility: 'visible',
				'symbol-spacing': 150,
				'text-max-width': {
					stops: [
						[12, 5],
						[18, 8]
					]
				},
				'text-allow-overlap': false
			},
			paint: {
				'text-color': '#0c8416',
				'text-halo-blur': 0.5,
				'text-halo-color': 'rgba(255, 255, 255, 1)',
				'text-halo-width': 1
			},
			filter: ['all', ['==', 'class', 'park'], ['==', 'subclass', 'park']]
		},
		{
			id: 'park-national',
			type: 'symbol',
			source: 'openmaptiles',
			'source-layer': 'park',
			minzoom: 7,
			maxzoom: 12,
			layout: {
				'text-font': ['Noto Sans Italic'],
				'text-size': 12,
				'text-field': '{name:latin}{name:nonlatin}',
				visibility: 'visible',
				'symbol-spacing': 150,
				'text-allow-overlap': false
			},
			paint: {
				'text-color': {
					stops: [
						[7, 'rgba(70, 164, 70, 1)'],
						[10, '#008000']
					]
				},
				'text-halo-blur': 0.1,
				'text-halo-color': {
					stops: [
						[7, 'rgba(241, 255, 234, 1)'],
						[10, 'rgba(208, 250, 200, 1)']
					]
				},
				'text-halo-width': 0.3
			},
			filter: ['all', ['<=', 'rank', 2]]
		},
		{
			id: 'poi_zoo',
			type: 'symbol',
			source: 'openmaptiles',
			'source-layer': 'poi',
			minzoom: 11,
			layout: {
				'text-font': ['Noto Sans Bold'],
				'text-size': {
					stops: [
						[15, 12],
						[20, 16]
					]
				},
				'icon-image': '{subclass}',
				'text-field': '{name}',
				visibility: 'visible',
				'text-anchor': 'top',
				'text-offset': [0, 1.2],
				'text-padding': 2,
				'text-max-width': 6,
				'icon-allow-overlap': true
			},
			paint: {
				'text-color': '#660033',
				'icon-opacity': 1,
				'icon-halo-blur': 1,
				'text-halo-blur': 0.5,
				'icon-halo-color': 'rgba(255, 255, 255, 1)',
				'icon-halo-width': 0.5,
				'text-halo-color': '#ffffff',
				'text-halo-width': 1
			},
			metadata: {},
			filter: ['all', ['==', 'class', 'zoo'], ['==', 'subclass', 'zoo']]
		},
		{
			id: 'mountain_peak',
			type: 'symbol',
			source: 'openmaptiles',
			'source-layer': 'mountain_peak',
			maxzoom: 16,
			layout: {
				'text-size': 10,
				'icon-image': 'peak',
				'text-field': {
					stops: [
						[6, ' '],
						[12, '{name} {ele}m']
					]
				},
				'text-anchor': 'top',
				'text-offset': [0, 0.5],
				'text-max-width': 6,
				'text-line-height': 1.1,
				'text-font': ['Noto Sans Regular', 'Noto Sans Italic']
			},
			paint: {
				'text-color': '#6e441e',
				'text-halo-color': 'rgba(255, 255, 255, .8)',
				'text-halo-width': 1
			},
			filter: ['all', ['!=', 'class', 'cliff']]
		},
		{
			id: 'place_village',
			type: 'symbol',
			source: 'openmaptiles',
			'source-layer': 'place',
			minzoom: 8,
			layout: {
				'text-font': ['Noto Sans Regular'],
				'text-size': {
					base: 1.2,
					stops: [
						[10, 10],
						[15, 16]
					]
				},
				'text-field': '{name:latin}\n{name:nonlatin}',
				visibility: 'visible',
				'text-max-width': 8
			},
			paint: {
				'text-color': '#333',
				'text-halo-color': 'rgba(255,255,255,0.8)',
				'text-halo-width': 1.2
			},
			metadata: {},
			filter: ['all', ['==', 'class', 'village']]
		},
		{
			id: 'place_town',
			type: 'symbol',
			source: 'openmaptiles',
			'source-layer': 'place',
			minzoom: 6,
			layout: {
				'text-font': ['Noto Sans Regular'],
				'text-size': {
					base: 1.2,
					stops: [
						[7, 10],
						[11, 13]
					]
				},
				'text-field': '{name:latin}\n{name:nonlatin}',
				visibility: 'visible',
				'text-anchor': 'bottom',
				'text-offset': [0, 0],
				'text-max-width': 8
			},
			paint: {
				'text-color': '#333',
				'text-halo-color': 'rgba(255,255,255,0.8)',
				'text-halo-width': 1.2
			},
			metadata: {},
			filter: ['all', ['==', 'class', 'town']]
		},
		{
			id: 'place_state',
			type: 'symbol',
			source: 'openmaptiles',
			'source-layer': 'place',
			minzoom: 4,
			maxzoom: 12,
			layout: {
				'text-font': ['Noto Sans Regular', 'Noto Sans Bold'],
				'text-size': {
					stops: [
						[3, 10],
						[6, 14]
					]
				},
				'text-field': '{name:latin}',
				visibility: 'visible',
				'text-padding': 2,
				'text-transform': 'none',
				'text-letter-spacing': 0
			},
			paint: {
				'text-color': '#7e587d',
				'text-halo-color': 'rgba(255,255,255,0.7)',
				'text-halo-width': 0.8
			},
			metadata: {},
			filter: ['all', ['==', 'class', 'state'], ['<', 'rank', 3]]
		},
		{
			id: 'place_city',
			type: 'symbol',
			source: 'openmaptiles',
			'source-layer': 'place',
			minzoom: 4,
			maxzoom: 14,
			layout: {
				'text-font': ['Noto Sans Regular'],
				'text-size': {
					base: 1.2,
					stops: [
						[4, 12],
						[15, 18]
					]
				},
				'icon-image': {
					stops: [
						[4, 'place-6'],
						[7, ' ']
					]
				},
				'text-field': '{name:latin}\n{name:nonlatin}',
				visibility: 'visible',
				'icon-offset': [0, 3],
				'text-anchor': 'bottom',
				'text-offset': [0, 0],
				'icon-optional': false,
				'text-max-width': 8,
				'icon-allow-overlap': true
			},
			paint: {
				'text-color': {
					stops: [
						[6, 'rgba(88, 88, 88, 1)'],
						[14, 'rgba(32, 32, 32, 1)']
					]
				},
				'text-halo-color': 'rgba(255,255,255,0.8)',
				'text-halo-width': 1
			},
			metadata: {},
			filter: ['all', ['==', 'class', 'city'], ['!=', 'rank', 1]]
		},
		{
			id: 'place_capital',
			type: 'symbol',
			source: 'openmaptiles',
			'source-layer': 'place',
			minzoom: 3,
			maxzoom: 15,
			layout: {
				'icon-size': 1,
				'text-font': ['Noto Sans Regular'],
				'text-size': {
					base: 1.2,
					stops: [
						[4, 11],
						[12, 16]
					]
				},
				'icon-image': {
					stops: [
						[6, 'place-capital-8'],
						[8, '']
					]
				},
				'text-field': '{name:latin}\n{name:nonlatin}',
				visibility: 'visible',
				'icon-offset': [0, 3],
				'text-anchor': 'bottom',
				'text-offset': [0, 0],
				'icon-optional': false,
				'text-max-width': 8,
				'icon-allow-overlap': true
			},
			paint: {
				'text-color': {
					stops: [
						[6, 'rgba(73, 73, 73, 1)'],
						[14, 'rgba(32, 32, 32, 1)']
					]
				},
				'text-halo-color': 'rgba(255,255,255,0.8)',
				'text-halo-width': 1.2
			},
			metadata: {},
			filter: ['all', ['==', 'class', 'city'], ['in', 'capital', 1, 2]]
		},
		{
			id: 'country_other',
			type: 'symbol',
			source: 'openmaptiles',
			'source-layer': 'place',
			minzoom: 4,
			maxzoom: 15,
			layout: {
				'text-font': ['Noto Sans Regular'],
				'text-size': {
					stops: [
						[3, 11],
						[5, 13],
						[7, 20]
					]
				},
				'text-field': '{name:latin}',
				visibility: 'visible',
				'text-max-width': 6.25,
				'text-transform': 'none'
			},
			paint: {
				'text-color': 'rgba(131, 81, 130, 1)',
				'text-halo-blur': 1,
				'text-halo-color': 'rgba(255,255,255,0.8)',
				'text-halo-width': 0.8
			},
			metadata: {},
			filter: ['all', ['==', 'class', 'country'], ['!has', 'iso_a2']]
		},
		{
			id: 'country_3',
			type: 'symbol',
			source: 'openmaptiles',
			'source-layer': 'place',
			minzoom: 5,
			maxzoom: 12,
			layout: {
				'text-font': ['Noto Sans Bold'],
				'text-size': {
					stops: [
						[3, 11],
						[5, 13],
						[7, 17]
					]
				},
				'text-field': '{name:latin}',
				visibility: 'visible',
				'text-max-width': 6.25,
				'text-transform': 'none'
			},
			paint: {
				'text-color': {
					stops: [
						[3, 'rgba(108, 78, 107, 1)'],
						[10, 'rgba(57, 37, 73, 1)']
					]
				},
				'text-halo-blur': 1,
				'text-halo-color': 'rgba(255,255,255,0.8)',
				'text-halo-width': 0.8
			},
			metadata: {},
			filter: ['all', ['>=', 'rank', 3], ['==', 'class', 'country'], ['has', 'iso_a2']]
		},
		{
			id: 'country_2',
			type: 'symbol',
			source: 'openmaptiles',
			'source-layer': 'place',
			minzoom: 2,
			maxzoom: 12,
			layout: {
				'text-font': ['Noto Sans Bold'],
				'text-size': {
					stops: [
						[3, 11],
						[5, 14],
						[7, 19]
					]
				},
				'text-field': '{name:latin}',
				visibility: 'visible',
				'text-max-width': 6.25,
				'text-transform': 'none'
			},
			paint: {
				'text-color': {
					stops: [
						[3, 'rgba(108, 78, 107, 1)'],
						[10, 'rgba(57, 37, 73, 1)']
					]
				},
				'text-halo-blur': 1,
				'text-halo-color': 'rgba(255,255,255,0.8)',
				'text-halo-width': 0.8
			},
			metadata: {},
			filter: ['all', ['==', 'rank', 2], ['==', 'class', 'country'], ['has', 'iso_a2']]
		},
		{
			id: 'country_1',
			type: 'symbol',
			source: 'openmaptiles',
			'source-layer': 'place',
			minzoom: 2,
			maxzoom: 12,
			layout: {
				'text-font': ['Noto Sans Bold'],
				'text-size': {
					stops: [
						[3, 11],
						[5, 14],
						[7, 19]
					]
				},
				'text-field': '{name:latin}',
				visibility: 'visible',
				'text-max-width': 6.25,
				'text-transform': 'none'
			},
			paint: {
				'text-color': {
					stops: [
						[2, 'rgba(108, 78, 107, 1)'],
						[10, 'rgba(57, 37, 73, 1)']
					]
				},
				'text-halo-blur': 1,
				'text-halo-color': 'rgba(255,255,255,0.8)',
				'text-halo-width': 0.8
			},
			metadata: {},
			filter: ['all', ['==', 'rank', 1], ['==', 'class', 'country'], ['has', 'iso_a2']]
		},
		{
			id: 'island-hoppo',
			type: 'fill',
			metadata: { 'mapbox:group': '1444849388993.3071' },
			source: 'hoppo',
			'source-layer': 'island',
			minzoom: 0,
			layout: { visibility: 'visible' },
			paint: { 'fill-color': '#f2efe9', 'fill-opacity': 1 }
		},
		{
			id: 'island-hoppo-name',
			type: 'symbol',
			source: 'hoppo',
			'source-layer': 'island',
			layout: {
				'text-field': '{name}',
				'text-size': {
					stops: [
						[10, 14],
						[15, 24]
					]
				}
			},
			paint: {
				'text-color': '#333',
				'text-halo-color': 'rgba(255, 255, 255, 0.8)',
				'text-halo-width': 1.2
			}
		},
		{
			id: 'island-takeshima',
			type: 'fill',
			metadata: { 'mapbox:group': '1444849388993.3071' },
			source: 'takeshima',
			'source-layer': 'island',
			minzoom: 0,
			layout: { visibility: 'visible' },
			paint: { 'fill-color': '#f2efe9', 'fill-opacity': 1 }
		},
		{
			id: 'island-takeshima-name',
			type: 'symbol',
			source: 'takeshima',
			'source-layer': 'island',
			layout: {
				'text-field': '{name}',
				'text-size': {
					stops: [
						[10, 14],
						[15, 24]
					]
				}
			},
			paint: {
				'text-color': '#333',
				'text-halo-color': 'rgba(255, 255, 255, 0.8)',
				'text-halo-width': 1.2
			}
		},
		{
			id: 'island-takeshima-poi',
			type: 'symbol',
			source: 'takeshima',
			'source-layer': 'island_poi',
			layout: {
				'text-field': '{name}',
				'text-font': ['migu2m-regular'],
				'text-size': {
					stops: [
						[10, 14],
						[15, 24]
					]
				}
			},
			paint: {
				'text-color': '#333',
				'text-halo-color': 'rgba(255, 255, 255, 0.8)',
				'text-halo-width': 1.2
			}
		}
	]
};
export const dark: StyleSpecification = {
	version: 8,
	name: 'Dark Matter',
	metadata: { 'maputnik:renderer': 'mbgljs' },
	sources: {
		carto: {
			type: 'vector',
			url: 'https://tiles.basemaps.cartocdn.com/vector/carto.streets/v1/tiles.json'
		}
	},
	sprite: 'https://tiles.basemaps.cartocdn.com/gl/dark-matter-gl-style/sprite',
	glyphs: 'https://tile.openstreetmap.jp/fonts/{fontstack}/{range}.pbf',
	layers: [
		{
			id: 'background',
			type: 'background',
			layout: { visibility: 'visible' },
			paint: { 'background-color': '#0e0e0e', 'background-opacity': 1 }
		},
		{
			id: 'landcover',
			type: 'fill',
			source: 'carto',
			'source-layer': 'landcover',
			filter: [
				'any',
				['==', 'class', 'wood'],
				['==', 'class', 'grass'],
				['==', 'subclass', 'recreation_ground']
			],
			paint: {
				'fill-color': {
					stops: [
						[8, '#0e0e0e'],
						[9, '#0e0e0e'],
						[11, '#0e0e0e'],
						[13, '#0e0e0e'],
						[15, '#0e0e0e']
					]
				},
				'fill-opacity': 1
			}
		},
		{
			id: 'park_national_park',
			type: 'fill',
			source: 'carto',
			'source-layer': 'park',
			minzoom: 9,
			filter: ['all', ['==', 'class', 'national_park']],
			layout: { visibility: 'visible' },
			paint: {
				'fill-color': {
					stops: [
						[8, '#0e0e0e'],
						[9, '#0e0e0e'],
						[11, '#0e0e0e'],
						[13, '#0e0e0e'],
						[15, '#0e0e0e']
					]
				},
				'fill-opacity': 1,
				'fill-translate-anchor': 'map'
			}
		},
		{
			id: 'park_nature_reserve',
			type: 'fill',
			source: 'carto',
			'source-layer': 'park',
			minzoom: 0,
			filter: ['all', ['==', 'class', 'nature_reserve']],
			layout: { visibility: 'visible' },
			paint: {
				'fill-color': {
					stops: [
						[8, '#0e0e0e'],
						[9, '#0e0e0e'],
						[11, '#0e0e0e'],
						[13, '#0e0e0e'],
						[15, '#0e0e0e']
					]
				},
				'fill-antialias': true,
				'fill-opacity': {
					stops: [
						[6, 0.7],
						[9, 0.9]
					]
				}
			}
		},
		{
			id: 'landuse_residential',
			type: 'fill',
			source: 'carto',
			'source-layer': 'landuse',
			minzoom: 6,
			filter: ['any', ['==', 'class', 'residential']],
			paint: {
				'fill-color': {
					stops: [
						[5, 'rgba(0, 0, 0, 0.5)'],
						[8, 'rgba(0, 0, 0, 0.45)'],
						[9, 'rgba(0, 0, 0, 0.4)'],
						[11, 'rgba(0, 0, 0, 0.35)'],
						[13, 'rgba(0, 0, 0, 0.3)'],
						[15, 'rgba(0, 0, 0, 0.25)'],
						[16, 'rgba(0, 0, 0, 0.15)']
					]
				},
				'fill-opacity': {
					stops: [
						[6, 0.6],
						[9, 1]
					]
				}
			}
		},
		{
			id: 'landuse',
			type: 'fill',
			source: 'carto',
			'source-layer': 'landuse',
			filter: ['any', ['==', 'class', 'cemetery'], ['==', 'class', 'stadium']],
			paint: {
				'fill-color': {
					stops: [
						[8, '#0e0e0e'],
						[9, '#0e0e0e'],
						[11, '#0e0e0e'],
						[13, '#0e0e0e'],
						[15, '#0e0e0e']
					]
				}
			}
		},
		{
			id: 'waterway',
			type: 'line',
			source: 'carto',
			'source-layer': 'waterway',
			paint: {
				'line-color': 'rgba(63, 90, 109, 1)',
				'line-width': {
					stops: [
						[8, 0.5],
						[9, 1],
						[15, 2],
						[16, 3]
					]
				}
			}
		},
		{
			id: 'boundary_county',
			type: 'line',
			source: 'carto',
			'source-layer': 'boundary',
			minzoom: 9,
			maxzoom: 24,
			filter: ['all', ['==', 'admin_level', 6], ['==', 'maritime', 0]],
			paint: {
				'line-color': {
					stops: [
						[4, '#222'],
						[5, '#222'],
						[6, '#2C353C']
					]
				},
				'line-width': {
					stops: [
						[4, 0.5],
						[7, 1]
					]
				},
				'line-dasharray': {
					stops: [
						[6, [1]],
						[7, [2, 2]]
					]
				}
			}
		},
		{
			id: 'boundary_state',
			type: 'line',
			source: 'carto',
			'source-layer': 'boundary',
			minzoom: 4,
			filter: ['all', ['==', 'admin_level', 4], ['==', 'maritime', 0]],
			paint: {
				'line-color': {
					stops: [
						[4, 'rgba(103, 103, 114, 1)'],
						[5, 'rgba(103, 103, 114, 1)'],
						[6, 'rgba(103, 103, 114, 1)']
					]
				},
				'line-width': {
					stops: [
						[4, 0.5],
						[7, 1],
						[8, 1],
						[9, 1.2]
					]
				},
				'line-dasharray': {
					stops: [
						[6, [1, 2, 3]],
						[7, [1, 2, 3]]
					]
				}
			}
		},
		{
			id: 'water',
			type: 'fill',
			source: 'carto',
			'source-layer': 'water',
			minzoom: 0,
			maxzoom: 24,
			filter: ['all', ['==', '$type', 'Polygon']],
			layout: { visibility: 'visible' },
			paint: {
				'fill-color': '#2C353C',
				'fill-antialias': true,
				'fill-translate-anchor': 'map',
				'fill-opacity': 1
			}
		},
		{
			id: 'water_shadow',
			type: 'fill',
			source: 'carto',
			'source-layer': 'water',
			minzoom: 0,
			filter: ['all', ['==', '$type', 'Polygon']],
			layout: { visibility: 'visible' },
			paint: {
				'fill-color': 'transparent',
				'fill-antialias': true,
				'fill-translate-anchor': 'map',
				'fill-opacity': 1,
				'fill-translate': {
					stops: [
						[0, [0, 2]],
						[6, [0, 1]],
						[14, [0, 1]],
						[17, [0, 2]]
					]
				}
			}
		},
		{
			id: 'aeroway-runway',
			type: 'line',
			source: 'carto',
			'source-layer': 'aeroway',
			minzoom: 12,
			filter: ['all', ['==', 'class', 'runway']],
			layout: { 'line-cap': 'square' },
			paint: {
				'line-width': {
					stops: [
						[11, 1],
						[13, 4],
						[14, 6],
						[15, 8],
						[16, 10]
					]
				},
				'line-color': '#111'
			}
		},
		{
			id: 'aeroway-taxiway',
			type: 'line',
			source: 'carto',
			'source-layer': 'aeroway',
			minzoom: 13,
			filter: ['all', ['==', 'class', 'taxiway']],
			paint: {
				'line-color': '#111',
				'line-width': {
					stops: [
						[13, 0.5],
						[14, 1],
						[15, 2],
						[16, 4]
					]
				}
			}
		},
		{
			id: 'tunnel_service_case',
			type: 'line',
			source: 'carto',
			'source-layer': 'transportation',
			minzoom: 15,
			maxzoom: 24,
			filter: ['all', ['==', 'class', 'service'], ['==', 'brunnel', 'tunnel']],
			layout: { 'line-cap': 'round', 'line-join': 'round' },
			paint: {
				'line-width': {
					stops: [
						[15, 1],
						[16, 3],
						[17, 6],
						[18, 8]
					]
				},
				'line-opacity': 1,
				'line-color': '#1a1a1a'
			}
		},
		{
			id: 'tunnel_minor_case',
			type: 'line',
			source: 'carto',
			'source-layer': 'transportation',
			minzoom: 13,
			maxzoom: 24,
			filter: ['all', ['==', 'class', 'minor'], ['==', 'brunnel', 'tunnel']],
			layout: { 'line-cap': 'butt', 'line-join': 'miter' },
			paint: {
				'line-width': {
					stops: [
						[11, 0.5],
						[12, 0.5],
						[14, 2],
						[15, 4],
						[16, 6],
						[17, 10],
						[18, 14]
					]
				},
				'line-opacity': 1,
				'line-color': '#1a1a1a'
			}
		},
		{
			id: 'tunnel_sec_case',
			type: 'line',
			source: 'carto',
			'source-layer': 'transportation',
			minzoom: 11,
			maxzoom: 24,
			filter: ['all', ['in', 'class', 'secondary', 'tertiary'], ['==', 'brunnel', 'tunnel']],
			layout: { 'line-cap': 'round', 'line-join': 'round' },
			paint: {
				'line-width': {
					stops: [
						[11, 0.5],
						[12, 1],
						[13, 2],
						[14, 5],
						[15, 6],
						[16, 8],
						[17, 12],
						[18, 16]
					]
				},
				'line-opacity': 1,
				'line-color': '#1a1a1a'
			}
		},
		{
			id: 'tunnel_pri_case',
			type: 'line',
			source: 'carto',
			'source-layer': 'transportation',
			minzoom: 8,
			maxzoom: 24,
			filter: ['all', ['==', 'class', 'primary'], ['!=', 'ramp', 1], ['==', 'brunnel', 'tunnel']],
			layout: { 'line-cap': 'butt', 'line-join': 'round' },
			paint: {
				'line-width': {
					stops: [
						[6, 0.5],
						[7, 0.8],
						[8, 1],
						[11, 3],
						[13, 4],
						[14, 6],
						[15, 8],
						[16, 10],
						[17, 14],
						[18, 18]
					]
				},
				'line-opacity': {
					stops: [
						[5, 0.5],
						[7, 1]
					]
				},
				'line-color': '#1a1a1a'
			}
		},
		{
			id: 'tunnel_trunk_case',
			type: 'line',
			source: 'carto',
			'source-layer': 'transportation',
			minzoom: 5,
			maxzoom: 24,
			filter: ['all', ['==', 'class', 'trunk'], ['!=', 'ramp', 1], ['==', 'brunnel', 'tunnel']],
			layout: {
				'line-cap': 'butt',
				'line-join': 'round',
				visibility: 'visible'
			},
			paint: {
				'line-width': {
					stops: [
						[6, 0.5],
						[7, 0.8],
						[8, 1],
						[11, 3],
						[13, 4],
						[14, 6],
						[15, 8],
						[16, 10],
						[17, 14],
						[18, 18]
					]
				},
				'line-opacity': {
					stops: [
						[5, 0.5],
						[7, 1]
					]
				},
				'line-color': '#232323'
			}
		},
		{
			id: 'tunnel_mot_case',
			type: 'line',
			source: 'carto',
			'source-layer': 'transportation',
			minzoom: 5,
			maxzoom: 24,
			filter: ['all', ['==', 'class', 'motorway'], ['!=', 'ramp', 1], ['==', 'brunnel', 'tunnel']],
			layout: { 'line-cap': 'butt', 'line-join': 'round' },
			paint: {
				'line-width': {
					stops: [
						[6, 0.5],
						[7, 0.8],
						[8, 1],
						[11, 3],
						[12, 4],
						[13, 5],
						[14, 7],
						[15, 9],
						[16, 11],
						[17, 13],
						[18, 22]
					]
				},
				'line-opacity': {
					stops: [
						[6, 0.5],
						[7, 1]
					]
				},
				'line-color': '#232323'
			}
		},
		{
			id: 'tunnel_path',
			type: 'line',
			source: 'carto',
			'source-layer': 'transportation',
			minzoom: 15,
			maxzoom: 24,
			filter: ['all', ['==', 'class', 'path'], ['==', 'brunnel', 'tunnel']],
			layout: { 'line-cap': 'round', 'line-join': 'round' },
			paint: {
				'line-width': {
					stops: [
						[15, 0.5],
						[16, 1],
						[18, 3]
					]
				},
				'line-opacity': 1,
				'line-color': '#262626',
				'line-dasharray': {
					stops: [
						[15, [2, 2]],
						[18, [3, 3]]
					]
				}
			}
		},
		{
			id: 'tunnel_service_fill',
			type: 'line',
			source: 'carto',
			'source-layer': 'transportation',
			minzoom: 15,
			maxzoom: 24,
			filter: ['all', ['==', 'class', 'service'], ['==', 'brunnel', 'tunnel']],
			layout: { 'line-cap': 'round', 'line-join': 'round' },
			paint: {
				'line-width': {
					stops: [
						[15, 2],
						[16, 2],
						[17, 4],
						[18, 6]
					]
				},
				'line-opacity': 1,
				'line-color': '#161616'
			}
		},
		{
			id: 'tunnel_minor_fill',
			type: 'line',
			source: 'carto',
			'source-layer': 'transportation',
			minzoom: 15,
			maxzoom: 24,
			filter: ['all', ['==', 'class', 'minor'], ['==', 'brunnel', 'tunnel']],
			layout: { 'line-cap': 'butt', 'line-join': 'round' },
			paint: {
				'line-width': {
					stops: [
						[15, 3],
						[16, 4],
						[17, 8],
						[18, 12]
					]
				},
				'line-opacity': 1,
				'line-color': 'rgba(22, 22, 22, 1)'
			}
		},
		{
			id: 'tunnel_sec_fill',
			type: 'line',
			source: 'carto',
			'source-layer': 'transportation',
			minzoom: 13,
			maxzoom: 24,
			filter: ['all', ['in', 'class', 'secondary', 'tertiary'], ['==', 'brunnel', 'tunnel']],
			layout: { 'line-cap': 'round', 'line-join': 'round' },
			paint: {
				'line-width': {
					stops: [
						[11, 2],
						[13, 2],
						[14, 3],
						[15, 4],
						[16, 6],
						[17, 10],
						[18, 14]
					]
				},
				'line-opacity': 1,
				'line-color': '#161616'
			}
		},
		{
			id: 'tunnel_pri_fill',
			type: 'line',
			source: 'carto',
			'source-layer': 'transportation',
			minzoom: 11,
			maxzoom: 24,
			filter: ['all', ['==', 'class', 'primary'], ['!=', 'ramp', 1], ['==', 'brunnel', 'tunnel']],
			layout: { 'line-cap': 'butt', 'line-join': 'round' },
			paint: {
				'line-width': {
					stops: [
						[11, 1],
						[13, 2],
						[14, 4],
						[15, 6],
						[16, 8],
						[17, 12],
						[18, 16]
					]
				},
				'line-opacity': 1,
				'line-color': 'rgba(65, 71, 88, 1)'
			}
		},
		{
			id: 'tunnel_trunk_fill',
			type: 'line',
			source: 'carto',
			'source-layer': 'transportation',
			minzoom: 11,
			maxzoom: 24,
			filter: ['all', ['==', 'class', 'trunk'], ['!=', 'ramp', 1], ['==', 'brunnel', 'tunnel']],
			layout: {
				'line-cap': 'round',
				'line-join': 'round',
				visibility: 'visible'
			},
			paint: {
				'line-width': {
					stops: [
						[11, 1],
						[13, 2],
						[14, 4],
						[15, 6],
						[16, 8],
						[17, 12],
						[18, 16]
					]
				},
				'line-opacity': 1,
				'line-color': '#161616'
			}
		},
		{
			id: 'tunnel_mot_fill',
			type: 'line',
			source: 'carto',
			'source-layer': 'transportation',
			minzoom: 10,
			maxzoom: 24,
			filter: ['all', ['==', 'class', 'motorway'], ['!=', 'ramp', 1], ['==', 'brunnel', 'tunnel']],
			layout: { 'line-cap': 'butt', 'line-join': 'round' },
			paint: {
				'line-width': {
					stops: [
						[10, 1],
						[12, 2],
						[13, 3],
						[14, 5],
						[15, 7],
						[16, 9],
						[17, 11],
						[18, 20]
					]
				},
				'line-opacity': 1,
				'line-color': 'rgba(65, 71, 88, 1)'
			}
		},
		{
			id: 'tunnel_rail',
			type: 'line',
			source: 'carto',
			'source-layer': 'transportation',
			minzoom: 13,
			filter: ['all', ['==', 'class', 'rail'], ['==', 'brunnel', 'tunnel']],
			layout: { visibility: 'visible', 'line-join': 'round' },
			paint: {
				'line-color': '#1a1a1a',
				'line-width': {
					base: 1.3,
					stops: [
						[13, 0.5],
						[14, 1],
						[15, 1],
						[16, 3],
						[21, 7]
					]
				},
				'line-opacity': 0.5
			}
		},
		{
			id: 'tunnel_rail_dash',
			type: 'line',
			source: 'carto',
			'source-layer': 'transportation',
			minzoom: 15,
			filter: ['all', ['==', 'class', 'rail'], ['==', 'brunnel', 'tunnel']],
			layout: { visibility: 'visible', 'line-join': 'round' },
			paint: {
				'line-color': '#111',
				'line-width': {
					base: 1.3,
					stops: [
						[15, 0.5],
						[16, 1],
						[20, 5]
					]
				},
				'line-dasharray': {
					stops: [
						[15, [5, 5]],
						[16, [6, 6]]
					]
				},
				'line-opacity': 0.5
			}
		},
		{
			id: 'road_service_case',
			type: 'line',
			source: 'carto',
			'source-layer': 'transportation',
			minzoom: 15,
			maxzoom: 24,
			filter: ['all', ['==', 'class', 'service'], ['!has', 'brunnel']],
			layout: { 'line-cap': 'round', 'line-join': 'round' },
			paint: {
				'line-width': {
					stops: [
						[15, 1],
						[16, 3],
						[17, 6],
						[18, 8]
					]
				},
				'line-opacity': 1,
				'line-color': '#1c1c1c'
			}
		},
		{
			id: 'road_minor_case',
			type: 'line',
			source: 'carto',
			'source-layer': 'transportation',
			minzoom: 13,
			maxzoom: 24,
			filter: ['all', ['==', 'class', 'minor'], ['!has', 'brunnel']],
			layout: { 'line-cap': 'round', 'line-join': 'round' },
			paint: {
				'line-width': {
					stops: [
						[11, 0.5],
						[12, 0.5],
						[14, 2],
						[15, 3],
						[16, 4.3],
						[17, 10],
						[18, 14]
					]
				},
				'line-opacity': 1,
				'line-color': {
					stops: [
						[13, 'rgba(65, 71, 88, 1)'],
						[15.7, 'rgba(65, 71, 88, 1)'],
						[16, 'rgba(65, 71, 88, 1)']
					]
				}
			}
		},
		{
			id: 'road_pri_case_ramp',
			type: 'line',
			source: 'carto',
			'source-layer': 'transportation',
			minzoom: 12,
			maxzoom: 24,
			filter: ['all', ['==', 'class', 'primary'], ['==', 'ramp', 1]],
			layout: { 'line-cap': 'round', 'line-join': 'round' },
			paint: {
				'line-width': {
					stops: [
						[12, 2],
						[13, 3],
						[14, 4],
						[15, 5],
						[16, 8],
						[17, 10]
					]
				},
				'line-opacity': {
					stops: [
						[5, 0.5],
						[7, 1]
					]
				},
				'line-color': '#232323'
			}
		},
		{
			id: 'road_trunk_case_ramp',
			type: 'line',
			source: 'carto',
			'source-layer': 'transportation',
			minzoom: 12,
			maxzoom: 24,
			filter: ['all', ['==', 'class', 'trunk'], ['==', 'ramp', 1]],
			layout: { 'line-cap': 'round', 'line-join': 'round' },
			paint: {
				'line-width': {
					stops: [
						[12, 2],
						[13, 3],
						[14, 4],
						[15, 5],
						[16, 8],
						[17, 10]
					]
				},
				'line-opacity': 1,
				'line-color': {
					stops: [
						[12, '#1a1a1a'],
						[14, '#232323']
					]
				}
			}
		},
		{
			id: 'road_mot_case_ramp',
			type: 'line',
			source: 'carto',
			'source-layer': 'transportation',
			minzoom: 12,
			maxzoom: 24,
			filter: ['all', ['==', 'class', 'motorway'], ['==', 'ramp', 1]],
			layout: { 'line-cap': 'round', 'line-join': 'round' },
			paint: {
				'line-width': {
					stops: [
						[12, 2],
						[13, 3],
						[14, 4],
						[15, 5],
						[16, 8],
						[17, 10]
					]
				},
				'line-opacity': 1,
				'line-color': {
					stops: [
						[12, '#1a1a1a'],
						[14, '#232323']
					]
				}
			}
		},
		{
			id: 'road_sec_case_noramp',
			type: 'line',
			source: 'carto',
			'source-layer': 'transportation',
			minzoom: 11,
			maxzoom: 24,
			filter: ['all', ['in', 'class', 'secondary', 'tertiary'], ['!has', 'brunnel']],
			layout: { 'line-cap': 'round', 'line-join': 'round' },
			paint: {
				'line-width': {
					stops: [
						[11, 0.9],
						[12, 1.5],
						[13, 3],
						[14, 5],
						[15, 6],
						[16, 8],
						[17, 12],
						[18, 16]
					]
				},
				'line-opacity': 1,
				'line-color': {
					stops: [
						[11, 'rgba(65, 71, 88, 1)'],
						[12.99, 'rgba(65, 71, 88, 1)'],
						[13, 'rgba(65, 71, 88, 1)']
					]
				}
			}
		},
		{
			id: 'road_pri_case_noramp',
			type: 'line',
			source: 'carto',
			'source-layer': 'transportation',
			minzoom: 7,
			maxzoom: 24,
			filter: ['all', ['==', 'class', 'primary'], ['!=', 'ramp', 1], ['!has', 'brunnel']],
			layout: { 'line-cap': 'round', 'line-join': 'round' },
			paint: {
				'line-width': {
					stops: [
						[6, 0.5],
						[7, 0.8],
						[8, 1],
						[11, 3],
						[13, 4],
						[14, 6],
						[15, 8],
						[16, 10],
						[17, 14],
						[18, 18]
					]
				},
				'line-opacity': {
					stops: [
						[5, 0.5],
						[7, 1]
					]
				},
				'line-color': {
					stops: [
						[7, '#1a1a1a'],
						[12, '#232323']
					]
				}
			}
		},
		{
			id: 'road_trunk_case_noramp',
			type: 'line',
			source: 'carto',
			'source-layer': 'transportation',
			minzoom: 5,
			maxzoom: 24,
			filter: ['all', ['==', 'class', 'trunk'], ['!=', 'ramp', 1], ['!has', 'brunnel']],
			layout: { 'line-cap': 'round', 'line-join': 'round' },
			paint: {
				'line-width': {
					stops: [
						[6, 0.5],
						[7, 0.8],
						[8, 1],
						[11, 3],
						[13, 4],
						[14, 6],
						[15, 8],
						[16, 10],
						[17, 14],
						[18, 18]
					]
				},
				'line-opacity': {
					stops: [
						[5, 0.5],
						[7, 1]
					]
				},
				'line-color': {
					stops: [
						[5, '#1a1a1a'],
						[12, '#232323']
					]
				}
			}
		},
		{
			id: 'road_mot_case_noramp',
			type: 'line',
			source: 'carto',
			'source-layer': 'transportation',
			minzoom: 5,
			maxzoom: 24,
			filter: ['all', ['==', 'class', 'motorway'], ['!=', 'ramp', 1], ['!has', 'brunnel']],
			layout: { 'line-cap': 'round', 'line-join': 'round' },
			paint: {
				'line-width': {
					stops: [
						[6, 0.5],
						[7, 0.7],
						[8, 0.8],
						[11, 3],
						[12, 4],
						[13, 5],
						[14, 7],
						[15, 9],
						[16, 11],
						[17, 13],
						[18, 22]
					]
				},
				'line-opacity': {
					stops: [
						[6, 0.5],
						[7, 1]
					]
				},
				'line-color': {
					stops: [
						[5, '#1a1a1a'],
						[12, '#232323']
					]
				}
			}
		},
		{
			id: 'road_path',
			type: 'line',
			source: 'carto',
			'source-layer': 'transportation',
			minzoom: 15,
			maxzoom: 24,
			filter: ['all', ['in', 'class', 'path', 'track'], ['!has', 'brunnel']],
			layout: { 'line-cap': 'round', 'line-join': 'round' },
			paint: {
				'line-width': {
					stops: [
						[15, 0.5],
						[16, 1],
						[18, 3]
					]
				},
				'line-opacity': 1,
				'line-color': '#262626',
				'line-dasharray': {
					stops: [
						[15, [2, 2]],
						[18, [3, 3]]
					]
				}
			}
		},
		{
			id: 'road_service_fill',
			type: 'line',
			source: 'carto',
			'source-layer': 'transportation',
			minzoom: 15,
			maxzoom: 24,
			filter: ['all', ['==', 'class', 'service'], ['!has', 'brunnel']],
			layout: { 'line-cap': 'round', 'line-join': 'round' },
			paint: {
				'line-width': {
					stops: [
						[15, 2],
						[16, 2],
						[17, 4],
						[18, 6]
					]
				},
				'line-opacity': 1,
				'line-color': '#0b0b0b'
			}
		},
		{
			id: 'road_minor_fill',
			type: 'line',
			source: 'carto',
			'source-layer': 'transportation',
			minzoom: 15,
			maxzoom: 24,
			filter: ['all', ['==', 'class', 'minor'], ['!has', 'brunnel']],
			layout: { 'line-cap': 'round', 'line-join': 'round' },
			paint: {
				'line-width': {
					stops: [
						[15, 3],
						[16, 4],
						[17, 8],
						[18, 12]
					]
				},
				'line-opacity': 1,
				'line-color': 'rgba(65, 71, 88, 1)'
			}
		},
		{
			id: 'road_pri_fill_ramp',
			type: 'line',
			source: 'carto',
			'source-layer': 'transportation',
			minzoom: 12,
			maxzoom: 24,
			filter: ['all', ['==', 'class', 'primary'], ['==', 'ramp', 1]],
			layout: { 'line-cap': 'round', 'line-join': 'round' },
			paint: {
				'line-width': {
					stops: [
						[12, 1],
						[13, 1.5],
						[14, 2],
						[15, 3],
						[16, 6],
						[17, 8]
					]
				},
				'line-opacity': 1,
				'line-color': '#0b0b0b'
			}
		},
		{
			id: 'road_trunk_fill_ramp',
			type: 'line',
			source: 'carto',
			'source-layer': 'transportation',
			minzoom: 12,
			maxzoom: 24,
			filter: ['all', ['==', 'class', 'trunk'], ['==', 'ramp', 1]],
			layout: { 'line-cap': 'square', 'line-join': 'round' },
			paint: {
				'line-width': {
					stops: [
						[12, 1],
						[13, 1.5],
						[14, 2],
						[15, 3],
						[16, 6],
						[17, 8]
					]
				},
				'line-opacity': 1,
				'line-color': '#0b0b0b'
			}
		},
		{
			id: 'road_mot_fill_ramp',
			type: 'line',
			source: 'carto',
			'source-layer': 'transportation',
			minzoom: 12,
			maxzoom: 24,
			filter: ['all', ['==', 'class', 'motorway'], ['==', 'ramp', 1]],
			layout: { 'line-cap': 'round', 'line-join': 'round' },
			paint: {
				'line-width': {
					stops: [
						[12, 1],
						[13, 1.5],
						[14, 2],
						[15, 3],
						[16, 6],
						[17, 8]
					]
				},
				'line-opacity': 1,
				'line-color': 'rgba(65, 71, 88, 1)'
			}
		},
		{
			id: 'road_sec_fill_noramp',
			type: 'line',
			source: 'carto',
			'source-layer': 'transportation',
			minzoom: 13,
			maxzoom: 24,
			filter: ['all', ['in', 'class', 'secondary', 'tertiary'], ['!has', 'brunnel']],
			layout: { 'line-cap': 'round', 'line-join': 'round' },
			paint: {
				'line-width': {
					stops: [
						[11, 2],
						[13, 2],
						[14, 3],
						[15, 4],
						[16, 6],
						[17, 10],
						[18, 14]
					]
				},
				'line-opacity': 1,
				'line-color': 'rgba(65, 71, 88, 1)'
			}
		},
		{
			id: 'road_pri_fill_noramp',
			type: 'line',
			source: 'carto',
			'source-layer': 'transportation',
			minzoom: 10,
			maxzoom: 24,
			filter: ['all', ['==', 'class', 'primary'], ['!=', 'ramp', 1], ['!has', 'brunnel']],
			layout: { 'line-cap': 'round', 'line-join': 'round' },
			paint: {
				'line-width': {
					stops: [
						[10, 0.3],
						[13, 2],
						[14, 4],
						[15, 6],
						[16, 8],
						[17, 12],
						[18, 16]
					]
				},
				'line-opacity': 1,
				'line-color': 'rgba(83, 86, 102, 1)'
			}
		},
		{
			id: 'road_trunk_fill_noramp',
			type: 'line',
			source: 'carto',
			'source-layer': 'transportation',
			minzoom: 10,
			maxzoom: 24,
			filter: ['all', ['==', 'class', 'trunk'], ['!=', 'ramp', 1], ['!has', 'brunnel']],
			layout: { 'line-cap': 'round', 'line-join': 'round' },
			paint: {
				'line-width': {
					stops: [
						[11, 1],
						[13, 2],
						[14, 4],
						[15, 6],
						[16, 8],
						[17, 12],
						[18, 16]
					]
				},
				'line-opacity': 1,
				'line-color': 'rgba(65, 71, 88, 1)'
			}
		},
		{
			id: 'road_mot_fill_noramp',
			type: 'line',
			source: 'carto',
			'source-layer': 'transportation',
			minzoom: 10,
			maxzoom: 24,
			filter: ['all', ['==', 'class', 'motorway'], ['!=', 'ramp', 1], ['!has', 'brunnel']],
			layout: { 'line-cap': 'round', 'line-join': 'round' },
			paint: {
				'line-width': {
					stops: [
						[10, 1],
						[12, 2],
						[13, 3],
						[14, 5],
						[15, 7],
						[16, 9],
						[17, 11],
						[18, 20]
					]
				},
				'line-opacity': 1,
				'line-color': 'rgba(73, 73, 73, 1)'
			}
		},
		{
			id: 'rail',
			type: 'line',
			source: 'carto',
			'source-layer': 'transportation',
			minzoom: 13,
			filter: ['all', ['==', 'class', 'rail'], ['!=', 'brunnel', 'tunnel']],
			layout: { visibility: 'visible', 'line-join': 'round' },
			paint: {
				'line-color': '#1a1a1a',
				'line-width': {
					base: 1.3,
					stops: [
						[13, 0.5],
						[14, 1],
						[15, 1],
						[16, 3],
						[21, 7]
					]
				}
			}
		},
		{
			id: 'rail_dash',
			type: 'line',
			source: 'carto',
			'source-layer': 'transportation',
			minzoom: 15,
			filter: ['all', ['==', 'class', 'rail'], ['!=', 'brunnel', 'tunnel']],
			layout: { visibility: 'visible', 'line-join': 'round' },
			paint: {
				'line-color': '#111',
				'line-width': {
					base: 1.3,
					stops: [
						[15, 0.5],
						[16, 1],
						[20, 5]
					]
				},
				'line-dasharray': {
					stops: [
						[15, [5, 5]],
						[16, [6, 6]]
					]
				}
			}
		},
		{
			id: 'bridge_service_case',
			type: 'line',
			source: 'carto',
			'source-layer': 'transportation',
			minzoom: 15,
			maxzoom: 24,
			filter: ['all', ['==', 'class', 'service'], ['==', 'brunnel', 'bridge']],
			layout: { 'line-cap': 'butt', 'line-join': 'round' },
			paint: {
				'line-width': {
					stops: [
						[15, 1],
						[16, 3],
						[17, 6],
						[18, 8]
					]
				},
				'line-opacity': 1,
				'line-color': '#1c1c1c'
			}
		},
		{
			id: 'bridge_minor_case',
			type: 'line',
			source: 'carto',
			'source-layer': 'transportation',
			minzoom: 13,
			maxzoom: 24,
			filter: ['all', ['==', 'class', 'minor'], ['==', 'brunnel', 'bridge']],
			layout: { 'line-cap': 'butt', 'line-join': 'miter' },
			paint: {
				'line-width': {
					stops: [
						[11, 0.5],
						[12, 0.5],
						[14, 2],
						[15, 3],
						[16, 4.3],
						[17, 10],
						[18, 14]
					]
				},
				'line-opacity': 1,
				'line-color': {
					stops: [
						[13, '#161616'],
						[15.7, '#161616'],
						[16, '#1c1c1c']
					]
				}
			}
		},
		{
			id: 'bridge_sec_case',
			type: 'line',
			source: 'carto',
			'source-layer': 'transportation',
			minzoom: 11,
			maxzoom: 24,
			filter: ['all', ['in', 'class', 'secondary', 'tertiary'], ['==', 'brunnel', 'bridge']],
			layout: { 'line-cap': 'butt', 'line-join': 'miter' },
			paint: {
				'line-width': {
					stops: [
						[11, 0.5],
						[12, 1.5],
						[13, 3],
						[14, 5],
						[15, 6],
						[16, 8],
						[17, 12],
						[18, 16]
					]
				},
				'line-opacity': 1,
				'line-color': {
					stops: [
						[11, '#1a1a1a'],
						[12.99, '#1a1a1a'],
						[13, '#232323']
					]
				}
			}
		},
		{
			id: 'bridge_pri_case',
			type: 'line',
			source: 'carto',
			'source-layer': 'transportation',
			minzoom: 8,
			maxzoom: 24,
			filter: ['all', ['==', 'class', 'primary'], ['!=', 'ramp', 1], ['==', 'brunnel', 'bridge']],
			layout: { 'line-cap': 'butt', 'line-join': 'round' },
			paint: {
				'line-width': {
					stops: [
						[6, 0.5],
						[7, 0.8],
						[8, 1],
						[11, 3],
						[13, 4],
						[14, 6],
						[15, 8],
						[16, 10],
						[17, 14],
						[18, 18]
					]
				},
				'line-opacity': {
					stops: [
						[5, 0.5],
						[7, 1]
					]
				},
				'line-color': {
					stops: [
						[8, '#1a1a1a'],
						[12, '#232323']
					]
				}
			}
		},
		{
			id: 'bridge_trunk_case',
			type: 'line',
			source: 'carto',
			'source-layer': 'transportation',
			minzoom: 5,
			maxzoom: 24,
			filter: ['all', ['==', 'class', 'trunk'], ['!=', 'ramp', 1], ['==', 'brunnel', 'bridge']],
			layout: {
				'line-cap': 'butt',
				'line-join': 'round',
				visibility: 'visible'
			},
			paint: {
				'line-width': {
					stops: [
						[6, 0.5],
						[7, 0.8],
						[8, 1],
						[11, 3],
						[13, 4],
						[14, 6],
						[15, 8],
						[16, 10],
						[17, 14],
						[18, 18]
					]
				},
				'line-opacity': {
					stops: [
						[5, 0.5],
						[7, 1]
					]
				},
				'line-color': {
					stops: [
						[5, '#1a1a1a'],
						[12, '#232323']
					]
				}
			}
		},
		{
			id: 'bridge_mot_case',
			type: 'line',
			source: 'carto',
			'source-layer': 'transportation',
			minzoom: 5,
			maxzoom: 24,
			filter: ['all', ['==', 'class', 'motorway'], ['!=', 'ramp', 1], ['==', 'brunnel', 'bridge']],
			layout: { 'line-cap': 'butt', 'line-join': 'round' },
			paint: {
				'line-width': {
					stops: [
						[6, 0.5],
						[7, 0.8],
						[8, 1],
						[11, 3],
						[12, 4],
						[13, 5],
						[14, 7],
						[15, 9],
						[16, 11],
						[17, 13],
						[18, 22]
					]
				},
				'line-opacity': {
					stops: [
						[6, 0.5],
						[7, 1]
					]
				},
				'line-color': {
					stops: [
						[5, '#1a1a1a'],
						[10, '#232323']
					]
				}
			}
		},
		{
			id: 'bridge_path',
			type: 'line',
			source: 'carto',
			'source-layer': 'transportation',
			minzoom: 15,
			maxzoom: 24,
			filter: ['all', ['==', 'class', 'path'], ['==', 'brunnel', 'bridge']],
			layout: { 'line-cap': 'round', 'line-join': 'round' },
			paint: {
				'line-width': {
					stops: [
						[15, 0.5],
						[16, 1],
						[18, 3]
					]
				},
				'line-opacity': 1,
				'line-color': '#262626',
				'line-dasharray': {
					stops: [
						[15, [2, 2]],
						[18, [3, 3]]
					]
				}
			}
		},
		{
			id: 'bridge_service_fill',
			type: 'line',
			source: 'carto',
			'source-layer': 'transportation',
			minzoom: 15,
			maxzoom: 24,
			filter: ['all', ['==', 'class', 'service'], ['==', 'brunnel', 'bridge']],
			layout: { 'line-cap': 'round', 'line-join': 'round' },
			paint: {
				'line-width': {
					stops: [
						[15, 2],
						[16, 2],
						[17, 4],
						[18, 6]
					]
				},
				'line-opacity': 1,
				'line-color': '#0b0b0b'
			}
		},
		{
			id: 'bridge_minor_fill',
			type: 'line',
			source: 'carto',
			'source-layer': 'transportation',
			minzoom: 15,
			maxzoom: 24,
			filter: ['all', ['==', 'class', 'minor'], ['==', 'brunnel', 'bridge']],
			layout: { 'line-cap': 'butt', 'line-join': 'round' },
			paint: {
				'line-width': {
					stops: [
						[15, 3],
						[16, 4],
						[17, 8],
						[18, 12]
					]
				},
				'line-opacity': 1,
				'line-color': '#0b0b0b'
			}
		},
		{
			id: 'bridge_sec_fill',
			type: 'line',
			source: 'carto',
			'source-layer': 'transportation',
			minzoom: 13,
			maxzoom: 24,
			filter: ['all', ['in', 'class', 'secondary', 'tertiary'], ['==', 'brunnel', 'bridge']],
			layout: { 'line-cap': 'round', 'line-join': 'round' },
			paint: {
				'line-width': {
					stops: [
						[11, 2],
						[13, 2],
						[14, 3],
						[15, 4],
						[16, 6],
						[17, 10],
						[18, 14]
					]
				},
				'line-opacity': 1,
				'line-color': '#0b0b0b'
			}
		},
		{
			id: 'bridge_pri_fill',
			type: 'line',
			source: 'carto',
			'source-layer': 'transportation',
			minzoom: 11,
			maxzoom: 24,
			filter: ['all', ['==', 'class', 'primary'], ['!=', 'ramp', 1], ['==', 'brunnel', 'bridge']],
			layout: { 'line-cap': 'butt', 'line-join': 'round' },
			paint: {
				'line-width': {
					stops: [
						[11, 1],
						[13, 2],
						[14, 4],
						[15, 6],
						[16, 8],
						[17, 12],
						[18, 16]
					]
				},
				'line-opacity': 1,
				'line-color': '#0b0b0b'
			}
		},
		{
			id: 'bridge_trunk_fill',
			type: 'line',
			source: 'carto',
			'source-layer': 'transportation',
			minzoom: 11,
			maxzoom: 24,
			filter: ['all', ['==', 'class', 'trunk'], ['!=', 'ramp', 1], ['==', 'brunnel', 'bridge']],
			layout: {
				'line-cap': 'butt',
				'line-join': 'round',
				visibility: 'visible'
			},
			paint: {
				'line-width': {
					stops: [
						[11, 1],
						[13, 2],
						[14, 4],
						[15, 6],
						[16, 8],
						[17, 12],
						[18, 16]
					]
				},
				'line-opacity': 1,
				'line-color': 'rgba(65, 71, 88, 1)'
			}
		},
		{
			id: 'bridge_mot_fill',
			type: 'line',
			source: 'carto',
			'source-layer': 'transportation',
			minzoom: 10,
			maxzoom: 24,
			filter: ['all', ['==', 'class', 'motorway'], ['!=', 'ramp', 1], ['==', 'brunnel', 'bridge']],
			layout: { 'line-cap': 'butt', 'line-join': 'round' },
			paint: {
				'line-width': {
					stops: [
						[10, 1],
						[12, 2],
						[13, 3],
						[14, 5],
						[15, 7],
						[16, 9],
						[17, 11],
						[18, 20]
					]
				},
				'line-opacity': 1,
				'line-color': 'rgba(65, 71, 88, 1)'
			}
		},
		{
			id: 'building',
			type: 'fill',
			source: 'carto',
			'source-layer': 'building',
			layout: { visibility: 'visible' },
			paint: {
				'fill-color': {
					base: 1,
					stops: [
						[15.5, 'transparent'],
						[16, 'transparent']
					]
				},
				'fill-antialias': true
			}
		},
		{
			id: 'building-top',
			type: 'fill',
			source: 'carto',
			'source-layer': 'building',
			layout: { visibility: 'visible' },
			paint: {
				'fill-translate': {
					base: 1,
					stops: [
						[14, [0, 0]],
						[16, [-2, -2]]
					]
				},
				'fill-outline-color': '#0e0e0e',
				'fill-color': 'rgba(57, 57, 57, 1)',
				'fill-opacity': {
					base: 1,
					stops: [
						[13, 0],
						[16, 1]
					]
				}
			}
		},
		{
			id: 'boundary_country_outline',
			type: 'line',
			source: 'carto',
			'source-layer': 'boundary',
			minzoom: 6,
			maxzoom: 24,
			filter: ['all', ['==', 'admin_level', 2], ['==', 'maritime', 0]],
			layout: { 'line-cap': 'round', 'line-join': 'round' },
			paint: {
				'line-color': '#2C353C',
				'line-opacity': 0.5,
				'line-width': 8,
				'line-offset': 0
			}
		},
		{
			id: 'boundary_country_inner',
			type: 'line',
			source: 'carto',
			'source-layer': 'boundary',
			minzoom: 0,
			filter: ['all', ['==', 'admin_level', 2], ['==', 'maritime', 0]],
			layout: { 'line-cap': 'round', 'line-join': 'round' },
			paint: {
				'line-color': {
					stops: [
						[4, 'rgba(92, 94, 94, 1)'],
						[5, 'rgba(96, 96, 96, 1)'],
						[6, 'rgba(102, 102, 102, 1)']
					]
				},
				'line-opacity': 1,
				'line-width': {
					stops: [
						[3, 1],
						[6, 1.5]
					]
				},
				'line-offset': 0
			}
		},
		{
			id: 'waterway_label',
			type: 'symbol',
			source: 'carto',
			'source-layer': 'waterway',
			filter: ['all', ['has', 'name'], ['==', 'class', 'river']],
			layout: {
				'text-field': '{name_en}',
				'text-font': [
					'Montserrat Regular Italic',
					'Open Sans Italic',
					'Noto Sans Regular',
					'HanWangHeiLight Regular',
					'NanumBarunGothic Regular'
				],
				'symbol-placement': 'line',
				'symbol-spacing': 300,
				'symbol-avoid-edges': false,
				'text-size': {
					stops: [
						[9, 8],
						[10, 9]
					]
				},
				'text-padding': 2,
				'text-pitch-alignment': 'auto',
				'text-rotation-alignment': 'auto',
				'text-offset': {
					stops: [
						[6, [0, -0.2]],
						[11, [0, -0.4]],
						[12, [0, -0.6]]
					]
				},
				'text-letter-spacing': 0,
				'text-keep-upright': true
			},
			paint: {
				'text-color': 'rgba(164, 164, 164, 1)',
				'text-halo-color': '#181818',
				'text-halo-width': 1
			}
		},
		{
			id: 'watername_ocean',
			type: 'symbol',
			source: 'carto',
			'source-layer': 'water_name',
			minzoom: 0,
			maxzoom: 5,
			filter: ['all', ['has', 'name'], ['==', '$type', 'Point'], ['==', 'class', 'ocean']],
			layout: {
				'text-field': '{name}',
				'symbol-placement': 'point',
				'text-size': {
					stops: [
						[0, 13],
						[2, 14],
						[4, 18]
					]
				},
				'text-font': [
					'Montserrat Medium Italic',
					'Open Sans Italic',
					'Noto Sans Regular',
					'HanWangHeiLight Regular',
					'NanumBarunGothic Regular'
				],
				'text-line-height': 1.2,
				'text-padding': 2,
				'text-allow-overlap': false,
				'text-ignore-placement': false,
				'text-pitch-alignment': 'auto',
				'text-rotation-alignment': 'auto',
				'text-max-width': 6,
				'text-letter-spacing': 0.1
			},
			paint: {
				'text-color': 'rgba(109, 123, 129, 1)',
				'text-halo-color': 'rgba(0,0,0,0.7)',
				'text-halo-width': 1,
				'text-halo-blur': 0
			}
		},
		{
			id: 'watername_sea',
			type: 'symbol',
			source: 'carto',
			'source-layer': 'water_name',
			minzoom: 5,
			filter: ['all', ['has', 'name'], ['==', '$type', 'Point'], ['==', 'class', 'sea']],
			layout: {
				'text-field': '{name}',
				'symbol-placement': 'point',
				'text-size': 12,
				'text-font': [
					'Montserrat Medium Italic',
					'Open Sans Italic',
					'Noto Sans Regular',
					'HanWangHeiLight Regular',
					'NanumBarunGothic Regular'
				],
				'text-line-height': 1.2,
				'text-padding': 2,
				'text-allow-overlap': false,
				'text-ignore-placement': false,
				'text-pitch-alignment': 'auto',
				'text-rotation-alignment': 'auto',
				'text-max-width': 6,
				'text-letter-spacing': 0.1
			},
			paint: {
				'text-color': '#3c3c3c',
				'text-halo-color': 'rgba(0,0,0,0.7)',
				'text-halo-width': 1,
				'text-halo-blur': 0
			}
		},
		{
			id: 'watername_lake',
			type: 'symbol',
			source: 'carto',
			'source-layer': 'water_name',
			minzoom: 4,
			filter: ['all', ['has', 'name'], ['==', '$type', 'Point'], ['==', 'class', 'lake']],
			layout: {
				'text-field': {
					stops: [
						[8, '{name_en}'],
						[13, '{name}']
					]
				},
				'symbol-placement': 'point',
				'text-size': {
					stops: [
						[13, 9],
						[14, 10],
						[15, 11],
						[16, 12],
						[17, 13]
					]
				},
				'text-font': [
					'Montserrat Regular Italic',
					'Open Sans Italic',
					'Noto Sans Regular',
					'HanWangHeiLight Regular',
					'NanumBarunGothic Regular'
				],
				'text-line-height': 1.2,
				'text-padding': 2,
				'text-allow-overlap': false,
				'text-ignore-placement': false,
				'text-pitch-alignment': 'auto',
				'text-rotation-alignment': 'auto'
			},
			paint: {
				'text-color': 'rgba(155, 155, 155, 1)',
				'text-halo-color': '#181818',
				'text-halo-width': 1,
				'text-halo-blur': 1
			}
		},
		{
			id: 'watername_lake_line',
			type: 'symbol',
			source: 'carto',
			'source-layer': 'water_name',
			filter: ['all', ['has', 'name'], ['==', '$type', 'LineString']],
			layout: {
				'text-field': {
					stops: [
						[8, '{name_en}'],
						[13, '{name}']
					]
				},
				'symbol-placement': 'line',
				'text-size': {
					stops: [
						[13, 9],
						[14, 10],
						[15, 11],
						[16, 12],
						[17, 13]
					]
				},
				'text-font': [
					'Montserrat Regular Italic',
					'Open Sans Italic',
					'Noto Sans Regular',
					'HanWangHeiLight Regular',
					'NanumBarunGothic Regular'
				],
				'symbol-spacing': 350,
				'text-pitch-alignment': 'auto',
				'text-rotation-alignment': 'auto',
				'text-line-height': 1.2
			},
			paint: {
				'text-color': '#444',
				'text-halo-color': '#181818',
				'text-halo-width': 1,
				'text-halo-blur': 1
			}
		},
		{
			id: 'place_hamlet',
			type: 'symbol',
			source: 'carto',
			'source-layer': 'place',
			minzoom: 12,
			maxzoom: 16,
			filter: ['any', ['==', 'class', 'neighbourhood'], ['==', 'class', 'hamlet']],
			layout: {
				'text-field': {
					stops: [
						[8, '{name_en}'],
						[14, '{name}']
					]
				},
				'text-font': [
					'Montserrat Regular',
					'Open Sans Regular',
					'Noto Sans Regular',
					'HanWangHeiLight Regular',
					'NanumBarunGothic Regular'
				],
				'text-size': {
					stops: [
						[13, 8],
						[14, 10],
						[16, 11]
					]
				},
				'icon-image': '',
				'icon-offset': [16, 0],
				'text-anchor': 'center',
				'icon-size': 1,
				'text-max-width': 10,
				'text-keep-upright': true,
				'text-offset': [0.2, 0.2],
				'text-transform': {
					stops: [
						[12, 'none'],
						[14, 'uppercase']
					]
				}
			},
			paint: {
				'text-color': 'rgba(182, 180, 180, 1)',
				'icon-color': '#666',
				'icon-translate-anchor': 'map',
				'text-halo-color': 'rgba(53, 52, 52, 1)',
				'text-halo-width': 1
			}
		},
		{
			id: 'place_suburbs',
			type: 'symbol',
			source: 'carto',
			'source-layer': 'place',
			minzoom: 12,
			maxzoom: 16,
			filter: ['all', ['==', 'class', 'suburb']],
			layout: {
				'text-field': {
					stops: [
						[8, '{name_en}'],
						[13, '{name}']
					]
				},
				'text-font': [
					'Montserrat Regular',
					'Open Sans Regular',
					'Noto Sans Regular',
					'HanWangHeiLight Regular',
					'NanumBarunGothic Regular'
				],
				'text-size': {
					stops: [
						[12, 9],
						[13, 10],
						[14, 11],
						[15, 12],
						[16, 13]
					]
				},
				'icon-image': '',
				'icon-offset': [16, 0],
				'text-anchor': 'center',
				'icon-size': 1,
				'text-max-width': 10,
				'text-keep-upright': true,
				'text-offset': [0.2, 0.2],
				'text-transform': {
					stops: [
						[8, 'none'],
						[12, 'uppercase']
					]
				}
			},
			paint: {
				'text-color': '#666',
				'icon-color': '#666',
				'icon-translate-anchor': 'map',
				'text-halo-color': '#222',
				'text-halo-width': 1
			}
		},
		{
			id: 'place_villages',
			type: 'symbol',
			source: 'carto',
			'source-layer': 'place',
			minzoom: 10,
			maxzoom: 16,
			filter: ['all', ['==', 'class', 'village']],
			layout: {
				'text-field': {
					stops: [
						[8, '{name_en}'],
						[13, '{name}']
					]
				},
				'text-font': [
					'Montserrat Medium',
					'Open Sans Bold',
					'Noto Sans Regular',
					'HanWangHeiLight Regular',
					'NanumBarunGothic Regular'
				],
				'text-size': {
					stops: [
						[10, 9],
						[12, 10],
						[13, 11],
						[14, 12],
						[16, 13]
					]
				},
				'icon-image': '',
				'icon-offset': [16, 0],
				'text-anchor': 'center',
				'icon-size': 1,
				'text-max-width': 10,
				'text-keep-upright': true,
				'text-offset': [0.2, 0.2],
				'text-transform': 'none'
			},
			paint: {
				'text-color': 'rgba(154, 153, 153, 1)',
				'icon-color': '#666',
				'icon-translate-anchor': 'map',
				'text-halo-color': '#222',
				'text-halo-width': 1
			}
		},
		{
			id: 'place_town',
			type: 'symbol',
			source: 'carto',
			'source-layer': 'place',
			minzoom: 8,
			maxzoom: 14,
			filter: ['all', ['==', 'class', 'town']],
			layout: {
				'text-field': {
					stops: [
						[8, '{name_en}'],
						[13, '{name}']
					]
				},
				'text-font': [
					'Montserrat Medium',
					'Open Sans Bold',
					'Noto Sans Regular',
					'HanWangHeiLight Regular',
					'NanumBarunGothic Regular'
				],
				'text-size': {
					stops: [
						[8, 10],
						[9, 10],
						[10, 11],
						[13, 14],
						[14, 15]
					]
				},
				'icon-image': '',
				'icon-offset': [16, 0],
				'text-anchor': 'center',
				'icon-size': 1,
				'text-max-width': 10,
				'text-keep-upright': true,
				'text-offset': [0.2, 0.2],
				'text-transform': 'none'
			},
			paint: {
				'text-color': 'rgba(204, 208, 228, 1)',
				'icon-color': '#666',
				'icon-translate-anchor': 'map',
				'text-halo-color': '#222',
				'text-halo-width': 1
			}
		},
		{
			id: 'place_country_2',
			type: 'symbol',
			source: 'carto',
			'source-layer': 'place',
			minzoom: 3,
			maxzoom: 10,
			filter: ['all', ['==', 'class', 'country'], ['>=', 'rank', 3], ['has', 'iso_a2']],
			layout: {
				'text-field': '{name_en}',
				'text-font': [
					'Montserrat Medium',
					'Open Sans Bold',
					'Noto Sans Regular',
					'HanWangHeiLight Regular',
					'NanumBarunGothic Regular'
				],
				'text-size': {
					stops: [
						[3, 10],
						[5, 11],
						[6, 12],
						[7, 13],
						[8, 14]
					]
				},
				'text-transform': 'uppercase'
			},
			paint: {
				'text-color': {
					stops: [
						[3, 'rgba(157, 157, 157, 1)'],
						[5, 'rgba(114, 114, 114, 1)'],
						[6, 'rgba(112, 112, 112, 1)']
					]
				},
				'text-halo-color': '#111',
				'text-halo-width': 1
			}
		},
		{
			id: 'place_country_1',
			type: 'symbol',
			source: 'carto',
			'source-layer': 'place',
			minzoom: 2,
			maxzoom: 7,
			filter: ['all', ['==', 'class', 'country'], ['<=', 'rank', 2]],
			layout: {
				'text-field': '{name_en}',
				'text-font': [
					'Montserrat Medium',
					'Open Sans Bold',
					'Noto Sans Regular',
					'HanWangHeiLight Regular',
					'NanumBarunGothic Regular'
				],
				'text-size': {
					stops: [
						[3, 11],
						[4, 12],
						[5, 13],
						[6, 14]
					]
				},
				'text-transform': 'uppercase',
				'text-max-width': {
					stops: [
						[2, 6],
						[3, 6],
						[4, 9],
						[5, 12]
					]
				}
			},
			paint: {
				'text-color': {
					stops: [
						[3, 'rgba(158, 182, 189, 1)'],
						[5, 'rgba(118, 126, 137, 1)'],
						[6, 'rgba(120, 141, 147, 1)']
					]
				},
				'text-halo-color': '#111',
				'text-halo-width': 1
			}
		},
		{
			id: 'place_state',
			type: 'symbol',
			source: 'carto',
			'source-layer': 'place',
			minzoom: 5,
			maxzoom: 10,
			filter: ['all', ['==', 'class', 'state'], ['<=', 'rank', 4]],
			layout: {
				'text-field': '{name_en}',
				'text-font': [
					'Montserrat Medium',
					'Open Sans Bold',
					'Noto Sans Regular',
					'HanWangHeiLight Regular',
					'NanumBarunGothic Regular'
				],
				'text-size': {
					stops: [
						[5, 12],
						[7, 14]
					]
				},
				'text-transform': 'uppercase',
				'text-max-width': 9
			},
			paint: {
				'text-color': 'rgba(203, 230, 230, 1)',
				'text-halo-color': '#111',
				'text-halo-width': 0
			}
		},
		{
			id: 'place_continent',
			type: 'symbol',
			source: 'carto',
			'source-layer': 'place',
			minzoom: 0,
			maxzoom: 2,
			filter: ['all', ['==', 'class', 'continent']],
			layout: {
				'text-field': '{name_en}',
				'text-font': [
					'Montserrat Medium',
					'Open Sans Bold',
					'Noto Sans Regular',
					'HanWangHeiLight Regular',
					'NanumBarunGothic Regular'
				],
				'text-transform': 'uppercase',
				'text-size': 14,
				'text-letter-spacing': 0.1,
				'text-max-width': 9,
				'text-justify': 'center',
				'text-keep-upright': false
			},
			paint: {
				'text-color': 'rgba(135, 164, 179, 1)',
				'text-halo-color': '#111',
				'text-halo-width': 1
			}
		},
		{
			id: 'place_city_r6',
			type: 'symbol',
			source: 'carto',
			'source-layer': 'place',
			minzoom: 8,
			maxzoom: 15,
			filter: ['all', ['==', 'class', 'city'], ['>=', 'rank', 6]],
			layout: {
				'text-field': {
					stops: [
						[8, '{name_en}'],
						[13, '{name}']
					]
				},
				'text-font': [
					'Montserrat Medium',
					'Open Sans Bold',
					'Noto Sans Regular',
					'HanWangHeiLight Regular',
					'NanumBarunGothic Regular'
				],
				'text-size': {
					stops: [
						[8, 12],
						[9, 13],
						[10, 14],
						[13, 17],
						[14, 20]
					]
				},
				'icon-image': '',
				'icon-offset': [16, 0],
				'text-anchor': 'center',
				'icon-size': 1,
				'text-max-width': 10,
				'text-keep-upright': true,
				'text-offset': [0.2, 0.2],
				'text-transform': 'uppercase'
			},
			paint: {
				'text-color': 'rgba(168, 176, 180, 1)',
				'icon-color': '#666',
				'icon-translate-anchor': 'map',
				'text-halo-color': '#222',
				'text-halo-width': 1
			}
		},
		{
			id: 'place_city_r5',
			type: 'symbol',
			source: 'carto',
			'source-layer': 'place',
			minzoom: 8,
			maxzoom: 15,
			filter: ['all', ['==', 'class', 'city'], ['>=', 'rank', 0], ['<=', 'rank', 5]],
			layout: {
				'text-field': {
					stops: [
						[8, '{name_en}'],
						[13, '{name}']
					]
				},
				'text-font': [
					'Montserrat Medium',
					'Open Sans Bold',
					'Noto Sans Regular',
					'HanWangHeiLight Regular',
					'NanumBarunGothic Regular'
				],
				'text-size': {
					stops: [
						[8, 14],
						[10, 16],
						[13, 19],
						[14, 22]
					]
				},
				'icon-image': '',
				'icon-offset': [16, 0],
				'text-anchor': 'center',
				'icon-size': 1,
				'text-max-width': 10,
				'text-keep-upright': true,
				'text-offset': [0.2, 0.2],
				'text-transform': 'uppercase'
			},
			paint: {
				'text-color': 'rgba(211, 228, 236, 1)',
				'icon-color': '#666',
				'icon-translate-anchor': 'map',
				'text-halo-color': '#222',
				'text-halo-width': 1
			}
		},
		{
			id: 'place_city_dot_r7',
			type: 'symbol',
			source: 'carto',
			'source-layer': 'place',
			minzoom: 6,
			maxzoom: 7,
			filter: ['all', ['==', 'class', 'city'], ['<=', 'rank', 7]],
			layout: {
				'text-field': '{name_en}',
				'text-font': [
					'Montserrat Medium',
					'Open Sans Bold',
					'Noto Sans Regular',
					'HanWangHeiLight Regular',
					'NanumBarunGothic Regular'
				],
				'text-size': 12,
				'icon-image': 'circle-11',
				'icon-offset': [16, 5],
				'text-anchor': 'right',
				'icon-size': 0.4,
				'text-max-width': 8,
				'text-keep-upright': true,
				'text-offset': [0.2, 0.2]
			},
			paint: {
				'text-color': 'rgba(174, 191, 207, 1)',
				'icon-color': 'rgba(94, 105, 106, 1)',
				'icon-translate-anchor': 'map',
				'text-halo-color': '#222',
				'text-halo-width': 1
			}
		},
		{
			id: 'place_city_dot_r4',
			type: 'symbol',
			source: 'carto',
			'source-layer': 'place',
			minzoom: 5,
			maxzoom: 7,
			filter: ['all', ['==', 'class', 'city'], ['<=', 'rank', 4]],
			layout: {
				'text-field': '{name_en}',
				'text-font': [
					'Montserrat Medium',
					'Open Sans Bold',
					'Noto Sans Regular',
					'HanWangHeiLight Regular',
					'NanumBarunGothic Regular'
				],
				'text-size': 12,
				'icon-image': 'circle-11',
				'icon-offset': [16, 5],
				'text-anchor': 'right',
				'icon-size': 0.4,
				'text-max-width': 8,
				'text-keep-upright': true,
				'text-offset': [0.2, 0.2]
			},
			paint: {
				'text-color': 'rgba(233, 239, 246, 1)',
				'icon-color': '#666',
				'icon-translate-anchor': 'map',
				'text-halo-color': '#222',
				'text-halo-width': 1
			}
		},
		{
			id: 'place_city_dot_r2',
			type: 'symbol',
			source: 'carto',
			'source-layer': 'place',
			minzoom: 4,
			maxzoom: 7,
			filter: ['all', ['==', 'class', 'city'], ['<=', 'rank', 2]],
			layout: {
				'text-field': '{name_en}',
				'text-font': [
					'Montserrat Medium',
					'Open Sans Bold',
					'Noto Sans Regular',
					'HanWangHeiLight Regular',
					'NanumBarunGothic Regular'
				],
				'text-size': 12,
				'icon-image': 'circle-11',
				'icon-offset': [16, 5],
				'text-anchor': 'right',
				'icon-size': 0.4,
				'text-max-width': 8,
				'text-keep-upright': true,
				'text-offset': [0.2, 0.2]
			},
			paint: {
				'text-color': 'rgba(175, 194, 217, 1)',
				'icon-color': 'rgba(131, 164, 189, 1)',
				'icon-translate-anchor': 'map',
				'text-halo-color': '#222',
				'text-halo-width': 1
			}
		},
		{
			id: 'place_city_dot_z7',
			type: 'symbol',
			source: 'carto',
			'source-layer': 'place',
			minzoom: 7,
			maxzoom: 8,
			filter: ['all', ['!has', 'capital'], ['!in', 'class', 'country', 'state']],
			layout: {
				'text-field': '{name_en}',
				'text-font': [
					'Montserrat Medium',
					'Open Sans Bold',
					'Noto Sans Regular',
					'HanWangHeiLight Regular',
					'NanumBarunGothic Regular'
				],
				'text-size': 12,
				'icon-image': 'circle-11',
				'icon-offset': [16, 5],
				'text-anchor': 'right',
				'icon-size': 0.4,
				'text-max-width': 8,
				'text-keep-upright': true,
				'text-offset': [0.2, 0.2]
			},
			paint: {
				'text-color': 'rgba(160, 179, 191, 1)',
				'icon-color': 'rgba(113, 128, 147, 1)',
				'icon-translate-anchor': 'map',
				'text-halo-color': '#222',
				'text-halo-width': 1
			}
		},
		{
			id: 'place_capital_dot_z7',
			type: 'symbol',
			source: 'carto',
			'source-layer': 'place',
			minzoom: 7,
			maxzoom: 8,
			filter: ['all', ['>', 'capital', 0]],
			layout: {
				'text-field': '{name_en}',
				'text-font': [
					'Montserrat Medium',
					'Open Sans Bold',
					'Noto Sans Regular',
					'HanWangHeiLight Regular',
					'NanumBarunGothic Regular'
				],
				'text-size': 12,
				'icon-image': 'circle-11',
				'icon-offset': [16, 5],
				'text-anchor': 'right',
				'icon-size': 0.4,
				'text-max-width': 8,
				'text-keep-upright': true,
				'text-offset': [0.2, 0.2],
				'text-transform': 'uppercase'
			},
			paint: {
				'text-color': 'rgba(177, 201, 214, 1)',
				'icon-color': '#666',
				'icon-translate-anchor': 'map',
				'text-halo-color': '#222',
				'text-halo-width': 1
			}
		},
		{
			id: 'poi_stadium',
			type: 'symbol',
			source: 'carto',
			'source-layer': 'poi',
			minzoom: 15,
			filter: ['all', ['in', 'class', 'stadium', 'cemetery', 'attraction'], ['<=', 'rank', 3]],
			layout: {
				'text-field': '{name}',
				'text-font': [
					'Montserrat Medium',
					'Open Sans Bold',
					'Noto Sans Regular',
					'HanWangHeiLight Regular',
					'NanumBarunGothic Regular'
				],
				'text-size': {
					stops: [
						[15, 8],
						[17, 9],
						[18, 10]
					]
				},
				'text-transform': 'uppercase'
			},
			paint: {
				'text-color': '#515151',
				'text-halo-color': '#151515',
				'text-halo-width': 1
			}
		},
		{
			id: 'poi_park',
			type: 'symbol',
			source: 'carto',
			'source-layer': 'poi',
			minzoom: 15,
			filter: ['all', ['==', 'class', 'park']],
			layout: {
				'text-field': '{name}',
				'text-font': [
					'Montserrat Medium',
					'Open Sans Bold',
					'Noto Sans Regular',
					'HanWangHeiLight Regular',
					'NanumBarunGothic Regular'
				],
				'text-size': {
					stops: [
						[15, 8],
						[17, 9],
						[18, 10]
					]
				},
				'text-transform': 'uppercase'
			},
			paint: {
				'text-color': '#515151',
				'text-halo-color': '#151515',
				'text-halo-width': 1
			}
		},
		{
			id: 'roadname_minor',
			type: 'symbol',
			source: 'carto',
			'source-layer': 'transportation_name',
			minzoom: 16,
			filter: ['all', ['in', 'class', 'minor', 'service']],
			layout: {
				'symbol-placement': 'line',
				'text-font': [
					'Montserrat Regular',
					'Open Sans Regular',
					'Noto Sans Regular',
					'HanWangHeiLight Regular',
					'NanumBarunGothic Regular'
				],
				'text-size': 9,
				'text-field': '{name}',
				'symbol-avoid-edges': false,
				'symbol-spacing': 200,
				'text-pitch-alignment': 'auto',
				'text-rotation-alignment': 'auto',
				'text-justify': 'center'
			},
			paint: {
				'text-color': 'rgba(181, 180, 180, 1)',
				'text-halo-color': '#111',
				'text-halo-width': 1
			}
		},
		{
			id: 'roadname_sec',
			type: 'symbol',
			source: 'carto',
			'source-layer': 'transportation_name',
			minzoom: 15,
			filter: ['all', ['in', 'class', 'secondary', 'tertiary']],
			layout: {
				'symbol-placement': 'line',
				'text-font': [
					'Montserrat Regular',
					'Open Sans Regular',
					'Noto Sans Regular',
					'HanWangHeiLight Regular',
					'NanumBarunGothic Regular'
				],
				'text-size': {
					stops: [
						[15, 9],
						[16, 11],
						[18, 12]
					]
				},
				'text-field': '{name}',
				'symbol-avoid-edges': false,
				'symbol-spacing': 200,
				'text-pitch-alignment': 'auto',
				'text-rotation-alignment': 'auto',
				'text-justify': 'center'
			},
			paint: {
				'text-color': 'rgba(146, 146, 146, 1)',
				'text-halo-color': 'rgba(34, 34, 34, 1)',
				'text-halo-width': 1
			}
		},
		{
			id: 'roadname_pri',
			type: 'symbol',
			source: 'carto',
			'source-layer': 'transportation_name',
			minzoom: 14,
			filter: ['all', ['in', 'class', 'primary']],
			layout: {
				'symbol-placement': 'line',
				'text-font': [
					'Montserrat Regular',
					'Open Sans Regular',
					'Noto Sans Regular',
					'HanWangHeiLight Regular',
					'NanumBarunGothic Regular'
				],
				'text-size': {
					stops: [
						[14, 10],
						[15, 10],
						[16, 11],
						[18, 12]
					]
				},
				'text-field': '{name}',
				'symbol-avoid-edges': false,
				'symbol-spacing': {
					stops: [
						[6, 200],
						[16, 250]
					]
				},
				'text-pitch-alignment': 'auto',
				'text-rotation-alignment': 'auto',
				'text-justify': 'center',
				'text-letter-spacing': {
					stops: [
						[14, 0],
						[16, 0.2]
					]
				}
			},
			paint: {
				'text-color': 'rgba(189, 189, 189, 1)',
				'text-halo-color': '#111',
				'text-halo-width': 1
			}
		},
		{
			id: 'roadname_major',
			type: 'symbol',
			source: 'carto',
			'source-layer': 'transportation_name',
			minzoom: 13,
			filter: ['all', ['in', 'class', 'trunk', 'motorway']],
			layout: {
				'symbol-placement': 'line',
				'text-font': [
					'Montserrat Regular',
					'Open Sans Regular',
					'Noto Sans Regular',
					'HanWangHeiLight Regular',
					'NanumBarunGothic Regular'
				],
				'text-size': {
					stops: [
						[14, 10],
						[15, 10],
						[16, 11],
						[18, 12]
					]
				},
				'text-field': '{name}',
				'symbol-avoid-edges': false,
				'symbol-spacing': {
					stops: [
						[6, 200],
						[16, 250]
					]
				},
				'text-pitch-alignment': 'auto',
				'text-rotation-alignment': 'auto',
				'text-justify': 'center',
				'text-letter-spacing': {
					stops: [
						[13, 0],
						[16, 0.2]
					]
				}
			},
			paint: {
				'text-color': '#383838',
				'text-halo-color': '#111',
				'text-halo-width': 1
			}
		},
		{
			id: 'housenumber',
			type: 'symbol',
			source: 'carto',
			'source-layer': 'housenumber',
			minzoom: 17,
			maxzoom: 24,
			layout: {
				'text-field': '{housenumber}',
				'text-size': {
					stops: [
						[17, 9],
						[18, 11]
					]
				},
				'text-font': [
					'Montserrat Regular',
					'Open Sans Regular',
					'Noto Sans Regular',
					'HanWangHeiLight Regular',
					'NanumBarunGothic Regular'
				]
			},
			paint: {
				'text-halo-color': 'transparent',
				'text-color': 'transparent',
				'text-halo-width': 0.75
			}
		}
	],
	id: 'voyager',
	owner: 'Carto'
};
