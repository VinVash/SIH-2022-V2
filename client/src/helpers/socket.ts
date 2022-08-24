import { io } from "socket.io-client";

const SOCKET_API = "https://sih-email.herokuapp.com";

function getSocket () {
    return io(SOCKET_API);
}

export default getSocket;