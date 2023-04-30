let net = require("net");
let readline = require("readline/promises");
let stream = require("stream")

const port = 3000;

const socket = net.createConnection({port}, ()=>{

});


async function ask(){
    let rl = readline.createInterface({input:process.stdin, output:process.stdout});
    console.clear();
    let name = await rl.question("What is your name: ");
    let message = await rl.question("Say something inside the group: ");

    return {name, message}
}

socket.on("connect", async ()=>{
    console.log("Welcome to friends zone chat!")

    let {name, message} = await ask();

    let messageStream = stream.PassThrough();
    messageStream.write(`${name}:${message}`);

    messageStream.pipe(socket);
    
});



socket.on("data", chunk=>{

    if(chunk.toString().includes(":")){
        let [name, message] = chunk.toString().split(":");
        console.log(`${name}:${message}`)
        
    }else{
        console.log(chunk.toString())
    }


});


socket.on("error", ()=>{
        
    socket.write("storedName")
})



socket.on("close", ()=>{
    console.log("The server shut down")
});