'use strict';

const net = require('net');
let processArgs = process.argv;
let date = new Date();
let method = 'GET';

if (!processArgs[2]) {
  process.stdout.write(`

No URI given
********************************************************************
To use this client, please input "node client.js ['insert URI Here']
Sample valid URI's:
********************   
* index.html       *   *   *   ******   ******  *******  *   *  ******  ******  ******
* styles.html      *   *   *   *        *          *     *   *  *       *       *
* helium.html      *   *   *   ******   ******     *     *****  ******  ******  ******
* www.espn.com     *   *   *        *   *          *     *   *  *            *  *
* www.manoabbq.com *   *****   ******   ******     *     *   *  ******  ******  ******
********************
`);
  process.exit();
}

let argument = processArgs[2];

if (!argument.includes('.com')) {
  let hostName = 'localhost';
  let port = 8080;
  let clientRequest = `${method} /${argument} HTTP/1.1 
  Date: ${date}
  Host: ${hostName}
  Accept: text/html, application/json
  User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36
  Connection: Keep-Alive
  Content-Length: 11
  
  response: Hello World
  `;

  const client = net.createConnection(port, hostName);

  client.on('connect', function() {
    client.write(clientRequest);
    console.log('connected to the server');
  });

  client.on('data', function(data) {
    process.stdout.write(data);
    client.end(function() {
      console.log('leaving the server');
    });
  });
} else {
  let URIdotComIndex = argument.indexOf('.com' || '.net' || '.org' || '.gov');
  let findHost = argument.substring(0, URIdotComIndex + 4);
  let findURI = argument.substring(URIdotComIndex + 4, argument.length)
  let port = 80;
  let clientRequest = 
`${method} /${findURI} HTTP/1.1 
Date: ${date}
Host: ${findHost}
Accept: text/html, application/json
User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36
Connection: Keep-Alive

`;

  const client = net.createConnection(port, findHost);

  client.on('connect', function(){
    client.write(clientRequest);
    console.log(clientRequest)
    console.log('connected to the server');
  });

  client.on('data', function(data){
    process.stdout.write(data);
    console.log(data);
    client.end(function(){
      console.log('leaving the server')
    })
  })
}