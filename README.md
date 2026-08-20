# Roomly

## Context and Business Objective
Roomly is an instant messaging application that allows users to join thematic chat rooms. 

A major user experience constraint of the project is ensuring that if a user disconnects and returns, they must be able to view the recent chat history. Messages must be persisted in the database (PostgreSQL) to allow displaying this history upon connection.

## Project Structure
The repository is structured into the following main components:
- **`backend/`**: A Node.js server using Express and Socket.io for real-time bidirectional communication.
- **`frontend/`**: A SvelteKit application for the client-side user interface.
- **`.docker/`**: Contains the Docker Compose configurations to run the different services (including PostgreSQL and Adminer).

## Prerequisites
- Docker and Docker Compose
- Make (for running Makefile commands)

## Getting Started

A `Makefile` is provided at the root of the project to simplify the orchestration of the Docker containers.

### Installation & Execution
To build the Docker images, start the containers, and install the dependencies for both the backend and frontend, simply run:
```bash
make up
```

### Useful Makefile Commands
- `make up` - Start the project (build + containers + dependencies)
- `make stop` - Stop the containers without removing them
- `make down` - Stop and remove containers
- `make ps` - List running containers
- `make logs` - Display real-time logs for all services
- `make backend-cli` - Enter bash CLI in the backend container
- `make frontend-cli` - Enter bash CLI in the frontend container
- `make db-cli` - Enter bash CLI in the PostgreSQL container

## Project Audit & Next Steps

Based on a recent audit of the codebase, here is the current status and the next steps required to meet the business objectives:

1. **Database Integration**: 
   

2. **Backend Real-time Logic**: 
   - The basic Socket.io structure in `server.js` (for joining/leaving rooms and sending messages)

3. **Frontend Development**: 
   - The SvelteKit frontend is freshly initialized (`npx sv create`). 
   - **Action Required**: Implement the chat UI (rooms list, message history, message input) and connect it to the backend via `socket.io-client`.
