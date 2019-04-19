'use strict';

const net = require('net');
let port = 8080;
let processArgs = process.argv;
let date = new Date();
let method = 'GET';

console.log('processArgument index 3:', processArgs[2]);

if (!processArgs[2]) {
  process.stdout.write('No URI'); //because processArgs[2] is the node command that the user is looking for so if there's no node command cannot search for anything, give them an error
  process.exit();
}

let argument = processArgs[1]; //get the string of where they want to search
let endOfHostName = argument.indexOf('-Server'); //find the end of the host name
let hostName = argument.substring(0, endOfHostName + 4); //from the start of the argument to the end of .com is the host name
let findURI = argument.substring(endOfHostName + 4, argument.length); //from the end of .com to the end of the argument is the URI

if (argument.indexOf('Socket-Server') !== -1) { //if the user is searching the WWW.
  argument = processArgs[2]; //get the string of where they want to search
  let findDotCom = argument.indexOf('/'); //find the .com to start finding the URI
  hostName = argument.substring(0, findDotCom + 4); //from the start of the argument to the end of .com is the host name
  findURI = argument.substring(findDotCom + 4, argument.length); //from the end of .com to the end of the argument is the URI
  port = 80;
}

let clientRequest = `HTTP/1.1 200 OK
Date: ${date}
Host: ${hostName}
User-Agent: Custom Client`

const client = net.createConnection(port,  function() {
  client.write(processArgs);
});
client.on('data', () => {
  client.end();
});
client.on('end', () => {
  console.log('bye bruh come back later');
});

console.log()