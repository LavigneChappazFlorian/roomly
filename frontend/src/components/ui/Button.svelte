<script lang="ts">
	import type { BtnProps } from './button.type';

	let { type = 'button', content }: BtnProps = $props();
</script>

<button {type}>
    {content}
</button>

<style lang="scss">
	button {
		background-color: $primary-color;
		border: none;
		border-radius: 4px;
		color: $font-color;
		height: 40px;
		cursor: pointer;
	}
</style>
