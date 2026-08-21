<script lang="ts">
    import '../lib/scss/main.scss';

	let { children } = $props();
</script>

<svelte:head>
	<title>Roomly - Login</title>
	<meta
		name="description"
		content="Join Roomly, the real-time chat app. Enter a pseudonym, pick a thematic room like Tech or Hobbies, and chat instantly with immediate access to message history."
	/>
</svelte:head>

{@render children()}
