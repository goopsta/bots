console.log("I HATE THIS")
console.log("")
console.log("server ready")
process.title = "websocket server"

const express = require("express");
const WebSocket = require("ws");
const SocketServer = require("ws").Server;

const server = express().listen(3000);

const wss = new SocketServer({server});

wss.on('connection',(ws)=>{
   console.log('new connection')
   ws.on('close',()=>{
       console.log('a connection has been closed')
   });
   ws.on('message',(message)=>{
       console.log('%s', message);

       wss.clients.forEach(function each(client){
           if(client!==ws&&client.readyState===WebSocket.OPEN){
               client.send(message);
           }
       });
   });
});
