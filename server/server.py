import asyncio
import websockets

async def echo(websocket, path):
    try:
        async for message in websocket:
            print(f"Received message: {message}")
            await websocket.send(f"Hello from Python: {message}")
    except websockets.exceptions.ConnectionClosed as e:
        print(f"Connection closed: {e}")

async def main():
    # Create and start the WebSocket server
    server = await websockets.serve(echo, "localhost", 8765)
    print("Server started at ws://localhost:8765")

    # This line ensures the server keeps running
    await server.wait_closed()

# Run the main function to start the server
if __name__ == "__main__":
    asyncio.run(main())
