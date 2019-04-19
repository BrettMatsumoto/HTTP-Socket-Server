'use strict';

const net = require('net');
const send404 = require('./404.js');
const styles = require('./styles.js');
const helium = require('./helium.js');
const hydrogen = require('./hydrogen.js');
const index = require('./index.js');
const getNow = new Date();
const date = getNow.toUTCString();
let response = '';

// this creates a server
const server = net
  .createServer((socket) => {
    socket.setEncoding('utf8');
    socket.on('data', (data) => {
      // this is the request

      // do work here
      let URI = data.slice(data.indexOf('/'), data.indexOf('HTTP') - 1);

      if (URI == '/helium.html') {
        response = `HTTP/1.1 200 OK
Date: ${date}
Content-Length: ${helium.content.length}

${helium.content}`;
      } else if (URI == '/hydrogen.html') {
        response = `HTTP/1.1 200 OK
Date: ${date}
Content-Length: ${hydrogen.content.length}

${hydrogen.content}`;
      } else if (URI == '/styles.html') {
        response = `HTTP/1.1 200 OK
Date: ${date}
Content-Length: ${styles.content.length}

${styles.content}`;
      } else if (URI == '/index.html') {
        response = `HTTP/1.1 200 OK
Date: ${date}
Content-Length: ${index.content.length}

${index.content}`;
      } else {
        response = `HTTP/1.1 404 NOT FOUND
Date: ${date}
Content-Length: ${send404.content.length}

${send404.content}`;
      }
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
