<script lang="ts">
	import '../../lib/scss/main.scss';

	let { children } = $props();
</script>

<svelte:head>
	<title>Roomly - Rooms</title>
	<meta name="description" content="" />
</svelte:head>

{@render children()}
