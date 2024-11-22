<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>
<header>
	<div class="flex justify-between p-4 dark:bg-slate-800">
		<h1>
			<a href="/" class="hover:underline dark:text-neutral-200">ATMマップ</a>
		</h1>
		<nav class="flex space-x-4">
			<a href="/about" class="hover:underline dark:text-neutral-200">About</a>
			<a href="/contribute" class="hover:underline dark:text-neutral-200">貢献する</a>
			<a href="https://github.com/eniehack/atm-map" class="hover:underline dark:text-neutral-200">github</a>
		</nav>
	</div>
</header>
<main>
	{@render children()}
</main>
