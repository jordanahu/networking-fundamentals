let http = require("http");

let server = http.createServer((req, res)=>{
    let data = {messsage:"hello world"};
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Connection", "close");
    res.statusCode = 200;

    res.end(JSON.stringify(data));
})

// let port = 4080;
// let homeAddress = "127.0.0.1";

// server.listen(port,  ()=>{
//     console.log(`server listening on port...${port}`)
// })

let readline = require("readline");
let {stdin, stdout} = require("process");
// let AbortSignal = require("AbortSignal")
let rl = readline.createInterface({input:stdin, output:stdout});

let abortSignal = new AbortController()
rl.question("What is your name? ", {signal:abortSignal.signal}, (answer)=>{
    console.log(`Your name is, ${answer}`);
});

setTimeout(x=>{
    abortSignal.abort()
},5000)


abortSignal.signal.addEventListener("abort", ()=>{
    console.log("closed");
    rl.close()
})
