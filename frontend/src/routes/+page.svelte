<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import Button from '../components/ui/Button.svelte';

	const login = () => {
		let usernameInput = document.getElementById('username') as HTMLInputElement;
		let username: string = usernameInput.value.trim();

		try {
			if (username) {
				localStorage.setItem('username', username);
				usernameInput.value = '';

				goto(resolve('/rooms'));
			} else {
				alert("Missing username! Please enter your username");
			}
		} catch (error: unknown) {
			console.error('Error: ', error);
		}
	};
</script>

<main>
	<section>
		<div>
			<h1>Roomly</h1>
			<p>Your topics, your spaces, zero messages lost.</p>
		</div>

		<div class="form" id="form">
			<div class="form_username">
				<label for="username">Username</label>
				<input type="text" id="username" name="username" placeholder="Enter your username" />
				<div class="error"></div>
			</div>
			<Button onclick={login} type="submit">Continue</Button>
		</div>
	</section>
</main>

<style lang="scss">
	main {
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: $background-color;

		height: 100vh;

		section {
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

			.form {
				display: flex;
				flex-direction: column;
				gap: 24px;

				&_username {
					display: flex;
					flex-direction: column;
					gap: 6px;

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
	}
</style>
