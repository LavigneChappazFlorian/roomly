<script>
	import Button from '../components/ui/Button.svelte';
</script>

<main>
	<section class="login">
		<div>
			<h1 class="login_title">Roomly</h1>
			<p class="login_catchphrase">Your topics, your spaces, zero messages lost.</p>
		</div>

		<form action="">
			<div>
				<label for="username">Username</label>
				<input type="text" name="username" placeholder="Enter your username" />
			</div>
			<Button content="Continue" type="submit" />
		</form>
	</section>
</main>

<style lang="scss">
	main {
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: $background-color;

		height: 100vh;

		.login {
			display: flex;
			flex-direction: column;
			justify-content: center;
			gap: 40px;

			background-color: $light-background-color;
			border: 1px solid $border-color;
			border-radius: 8px;
			box-shadow: 0px -4px 24px 0px rgba(0, 0, 0, 0.5);
			color: $font-color;

			padding: 40px;

			h1 {
				margin-bottom: 10px;
				color: $secondary-color;
			}

			h1,
			& p {
				text-align: center;
			}

			form {
				display: flex;
				flex-direction: column;
				gap: 24px;

				div {
					display: flex;
					flex-direction: column;
					gap: 6px;
				}

				input {
					background-color: $background-color;
					border: 1px solid $border-color;
					border-radius: 4px;
					color: $border-color;

					height: 40px;
					width: 100%;
					padding: 16px 10px;
				}
			}
		}
	}
</style>
