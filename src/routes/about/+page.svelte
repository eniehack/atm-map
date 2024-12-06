<script lang="ts">
	import { base } from '$app/paths';

	const title = 'about | ATMマップ';
</script>

<article>
	<h1>about</h1>
	<section>
		<h1>地図、ATMデータの出典</h1>
		<p>
			地図データ、ATM地点データ共に<a href="https://openstreetmap.org">OpenStreetMap</a
			>を利用しています。 OSMの提供するデータはODbLの下にライセンスされます。 詳細は<a
				href="https://www.openstreetmap.org/copyright">こちら</a
			>をご覧ください。
		</p>
	</section>
	<section>
		<h1>プライバシーポリシー</h1>
		<p>
			このサービスではあなたの位置情報を取り扱います。
			しかし、位置情報はあなたのブラウザのみに共有され、その他第三者に共有されることはありません。
		</p>
	</section>
</article>

<svelte:head>
	<title>{title}</title>
	<meta name="og:title" content={title} />
	<meta name="og:type" content="website" />
	<meta name="og:url" content={`${base}/about`} />
	<meta name="og:locale" content="ja-JP" />
	<meta name="og:description" content="身近にあるATMの場所を一覧できるサイト" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content="身近にあるATMの場所を一覧できるサイト" />
	<meta name="twitter:creators" content="@eniehack" />
	<meta name="twitter:card" content="summary" />
</svelte:head>
