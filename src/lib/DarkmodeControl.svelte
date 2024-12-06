<script lang="ts">
    import { CustomControl } from "svelte-maplibre-gl";
    import {isDarkMode} from "./store";
    import moon from "$lib/assets/icon-moon.svg";
    import sun from "$lib/assets/icon-sun.svg";

    isDarkMode.subscribe(mode => {
        if (mode) {
            document.body.className = 'dark';
        } else {
            document.body.className = '';
        }
    })
</script>

<CustomControl position="top-right">
    <button
    	onclick={() => $isDarkMode = !$isDarkMode}
    >
    	<span class="grid place-items-center p-1 text-red-200">
    		{#if $isDarkMode}
                <img src={moon} alt="三日月のアイコン" />
    		{:else}
                <img src={sun} alt="太陽のアイコン" />
    		{/if}
    	</span>
    </button>
</CustomControl>
