import { io } from "socket.io-client"
let URL = "https://tavata.ir"
export const socket = io(URL);
socket.on("connect", () => {
    // console.log("admin socket connected")
})
