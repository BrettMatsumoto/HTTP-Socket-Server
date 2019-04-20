'use strict';

const net = require('net');
let port = 8080;
let processArgs = process.argv;
let date = new Date();
let method = 'GET';

// console.log('processArgument index 2:', processArgs[2]);

if (!processArgs[2]) {
  process.stdout.write('No URI'); //because processArgs[2] is the node command that the user is looking for so if there's no node command cannot search for anything, give them an error
  process.exit();
}

let findURI = processArgs[2];
let hostName = 'localhost';

let clientRequest = `${method} /${findURI} HTTP/1.1 
Date: ${date}
Host: ${hostName}
Accept: text/html, application/json
User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36
Connection: Keep-Alive
Content-Length: 11

response: Hello World
`;
// console.log(clientRequest);

const client = net.createConnection(port, hostName);

client.on('connect', function(){
  client.write(clientRequest)
  console.log(clientRequest)

  console.log('connected to the server');
})
client.on('data', function(data){
  process.stdout.write(data)
})
// client.on('end', function(){
//   console.log('Goodbye Mr.17')
// })
// const client = net.createConnection(port, () => {
//   client.on('connect', function(){
//     client.write(clientRequest);
//   })
// })
// client.on('data', (data) => {

//   process.stdout.write(data);
//   console.log('mycomment',process.stdout);
// });
// client.on('end', () => {
//   console.log('bye come back later');
// });