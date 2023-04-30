let net = require("net");


const port = 3000;

let clients = [];


const server = net.createServer((socket)=>{
    let id = clients.length + 1;
    clients.push({id, socket});
    console.log(`User ${id} joined the chat`);
    socket["socketId"] = id
});

server.on("connection", socket=>{



    socket.on("error", ()=>{
        let name = clients.find((_, i)=>i==socket["socketId"]-1)["name"];

        clients.forEach(({socket:client})=>{
            client.write(`${name} with id ${socket["socketId"]} has left`)
        })
    });

    socket.on("data", (chunk)=>{
        let [name, message] = chunk.toString().split(":");
        clients[socket["socketId"] - 1]["name"] = name;

        clients.forEach(({socket})=>{
            socket.write(`${name}:${message}`);
        })
    })


});

server.listen(port, ()=>{
    console.log(`server started on port...${port}`)
})