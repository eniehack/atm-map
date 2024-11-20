<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<header>
	<div class="flex justify-between p-4">
		<h1>
			<a href="/" class="hover:underline">ATMマップ</a>
		</h1>
		<nav class="flex space-x-4">
			<a href="/about" class="hover:underline">About</a>
			<a href="/contribute" class="hover:underline">貢献する</a>
			<a href="https://github.com/eniehack/atm-map" class="hover:underline">github</a>
		</nav>
	</div>
</header>
<main>
	{@render children()}
</main>
