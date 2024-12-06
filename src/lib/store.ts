import { derived, writable } from "svelte/store";
import { dark, osm } from "../routes/style";

export const isDarkMode = writable(false);
export const mapStyle = derived(isDarkMode, (mode) => mode ? dark : osm)