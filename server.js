'use strict';

const net = require('net');
const send404 = require('./404.js');
const styles = require('./styles.js');
const helium = require('./helium.js');
const hydrogen = require('./hydrogen.js');

let response = '';

// this creates a server
const server = net
  .createServer((socket) => {
    socket.setEncoding('utf8');
    socket.on('data', (data) => {
      // this is the request

      // do work here
      const endIndex = data.indexOf(' HTTP/1.1');
      let headRequest = data.substring(5, endIndex);
      console.log(headRequest);
      if (headRequest == 'helium.html') {
        response = `
HTTP/1.1 200 OK
Content-Length: 635
${helium.content}`;
      }
      console.log(response);
      // send response back here
      socket.end(response);
    });
  })
  // handle errors on the server
  .on('error', (err) => {
    console.log(err);
  });

// this starts the server
server.listen(8080, () => {
  console.log('Server is UP');
});
