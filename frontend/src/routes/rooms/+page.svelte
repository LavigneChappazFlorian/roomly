<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { io, Socket } from 'socket.io-client';
	import Button from '../../components/ui/Button.svelte';
	import LogoutIcon from '@iconify-svelte/material-symbols/logout';

	let username: string | null = null;
	let currentRoom: string = 'general';
	let messageText: string = '';

	type Message = { username: string; message: string; createdAt: string };
	let messages: Message[] = [];

	let socket: Socket;
	let messagesContainer: HTMLDivElement;

	onMount(() => {
		username = localStorage.getItem('username');

		socket = io('http://localhost:3000');

		socket.on('connect', () => {
			console.log(`Server connection successful with id: ${socket.id}`);
			socket.emit('join_room', { room: currentRoom });
		});

		socket.on('load_messages', (loadedMessages: Message[]) => {
			messages = loadedMessages;
			scrollToBottom();
		});

		socket.on('receive_message', (newMsg: Message) => {
			messages = [...messages, newMsg];
			scrollToBottom();
		});

		return () => {
			socket.disconnect();
		};
	});

	const sendMessage = (event: Event) => {
		event.preventDefault();

		if (messageText.trim() && username && currentRoom) {
			const payload = {
				message: messageText.trim(),
				username,
				room: currentRoom,
				createdAt: new Date().toISOString()
			};

			socket.emit('send_message', payload);
			messageText = '';
		}
	};

	const switchRoom = (newRoom: string) => {
		if (newRoom === currentRoom) return;

		socket.emit('leave_room', { room: currentRoom });

		currentRoom = newRoom;
		messages = [];

		socket.emit('join_room', { room: currentRoom });
		console.log('Selected room: ', currentRoom);
	};

	const logout = () => {
		localStorage.setItem('username', '');
		goto(resolve('/'));
	};

	const scrollToBottom = () => {
		setTimeout(() => {
			if (messagesContainer) {
				messagesContainer.scrollTop = messagesContainer.scrollHeight;
			}
		}, 0);
	};
</script>

<section>
	<aside class="menu">
		<h3>Roomly</h3>
		<ul class="menu_roomList">
			<li class:active={currentRoom === 'general'} onclick={() => switchRoom('general')}># général</li>
			<li class:active={currentRoom === 'frontend'} onclick={() => switchRoom('frontend')}># front-end</li>
			<li class:active={currentRoom === 'backend'} onclick={() => switchRoom('backend')}># back-end</li>
			<li class:active={currentRoom === 'devops'} onclick={() => switchRoom('devops')}># devops</li>
		</ul>
		<div class="menu_user">
			<p>Connecté en tant que {username}</p>
			<div class="menu_user_logout">
				<Button onclick={logout}>
					<LogoutIcon height="1.5em" />
				</Button>
			</div>
		</div>
	</aside>

	<div class="chat">
		<div>
			<h3># {currentRoom}</h3>
		</div>
		<aside class="chatBox">
			<div class="chatBox_messages" bind:this={messagesContainer}>
				{#each messages as msg (msg.createdAt + msg.username)}
					<div>
						<p>
							username: {msg.username} - message: {msg.message} - createdAt:
							{msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
						</p>
					</div>
				{/each}
			</div>

			<form class="chatBox_messages_form" onsubmit={sendMessage}>
				<input type="text" bind:value={messageText} placeholder="Tapez votre message..." />
				<Button type="submit">Send</Button>
			</form>
		</aside>
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
