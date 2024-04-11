import { envs } from "../envs"


function connectToWebSockets() {

    const socket = new WebSocket(envs.WEBSOCKET_URL);

    socket.onmessage = (event) => {
        console.log(event.data)
    }


    

}


export { WebSocketService } 