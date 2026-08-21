<script>
	import Button from '../../components/ui/Button.svelte';
	import Message from '../../components/ui/Message.svelte';
	import LogoutIcon from '@iconify-svelte/material-symbols/logout';
</script>

<section>
	<div class="menu">
		<h3>Roomly</h3>
		<ul class="menu_roomList">
			<li class="active" data-room="general"># général</li>
			<li data-room="frontend"># front-end</li>
			<li data-room="backend"># back-end</li>
			<li data-room="devops"># devops</li>
		</ul>
		<div class="menu_user">
			<p>Connecté en tant que Nom d'utilisateur</p>
			<div class="menu_user_logout">
				<LogoutIcon height="1.5em" />
			</div>
		</div>
	</div>
	<div class="chat">
		<div>
			<h3># Nom de la room - Description du salon</h3>
		</div>
		<article class="chatBox">
			<div class="chatBox_messages">
				<Message username="Bob" message="Heya!" createdAt="Aujourd'hui à 15h26"></Message>
				<Message username="Bob" message="Heya!" createdAt="Aujourd'hui à 15h26"></Message>
				<Message username="Bob" message="Heya!" createdAt="Aujourd'hui à 15h26"></Message>
			</div>
			<form class="chatBox_messages_form">
				<input type="text" />
				<Button content="Envoyer" type="submit"></Button>
			</form>
		</article>
	</div>
	<div class="members">
		<h3>Membres en direct</h3>
	</div>
</section>

<style lang="scss">
	section {
		display: flex;
		justify-content: space-between;
		background-color: $background-color;
		color: $font-color;
		height: 100vh;

		h3 {
			font-size: 26px;
			font-weight: 600;
		}

		.menu {
            h3 {
                padding: 1.5rem;
            }
			
			width: 25%;
			display: flex;
			align-items: flex-start;
			flex-direction: column;
			height: 100%;

			&_roomList {
                padding: 1.5rem;
				margin-top: 2rem;
				list-style: none;
				display: flex;
				flex-direction: column;
				width: 90%;
				gap: 1rem;

				li {
					flex: 1;
					padding: 0.7rem;
					border-radius: 0.5rem;
					color: $primary-color;
					transition: 0.2s ease;
                    cursor: pointer;
				}

				li:hover {
					background-color: $light-background-color;
				}

				.active {
					background-color: $primary-color;
					color: $font-color;
					transition: 0.2s ease;
				}

				.active:hover {
					background-color: #3f4a58;
				}
			}

			&_user {
                padding: 1.5rem;
                background-color: #2e3a55;
				margin-top: auto;
				display: flex;
				align-items: center;
                justify-content: space-between;
                width: 100%;
                height: 7%;
				gap: 1rem;

                &_logout {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                }
			}
		}

		.chat {
			background-color: $light-background-color;
			padding: 1.5rem;
			width: 50%;
			height: 100%;
			min-height: 0;
			display: flex;
			align-items: flex-start;
			flex-direction: column;

			.chatBox {
				width: 100%;
				display: flex;
				flex-direction: column;
				flex: 1;

				&_messages {
					margin-top: 1rem;
					flex: 1;
					overflow-y: auto;
				}

				&_messages_form {
					display: flex;
					align-items: center;
					padding: 0.5rem;
					gap: 0.5rem;
					margin-top: auto;

					input {
						flex: 1;
						padding: 0.7rem;
						border-radius: 0.5rem;
						border: 1px $border-color solid;
						background-color: $background-color;
						color: $font-color;
					}
				}
			}
		}

		.members {
			padding: 1.5rem;
			width: 25%;
			display: flex;
			align-items: flex-end;
			flex-direction: column;
		}
	}
</style>
