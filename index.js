const http = require('http');
const app = require('./app/app.js')
const port = process.env.SERVER_PORT || process.env.PORT || 5000;

if (port === undefined) {
  throw new Error(
    "Port is not defined."
  );
}

app.set('port', port);

const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  switch (error.code) {
    case 'EACCES':
      console.log(`Port ${port} requires privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.log(`Port ${port} is already in use.`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

async function openBrowser(port) {
  const open = require('open');
  await open(`http://localhost:${port}`, { app: { name: 'google chrome'} } )
}

function onListening() {
  if(process.env.NODE_ENV === "development") openBrowser(port);
  console.log(`Listening on ${port}.`)
}
