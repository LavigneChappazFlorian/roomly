<script lang="ts">
	import type { PropsButton } from './button.type';

	let { type = 'button', children, ...props }: PropsButton = $props();
</script>

<button {...props} type={type}>
    {@render children()}
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
