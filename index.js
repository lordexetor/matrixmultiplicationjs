var Client = require('./client/client');
var Server = require('./server/server');
var program = require('commander');
 
program
  .version('0.1.0')
  .option('-s, --server', 'Start a server')
  .option('-w, --worker', 'Start a worker')
  .option('-c, --client', 'Start a client')
  .parse(process.argv);
  
if (program.client) startClient();
if (program.server) startServer();
if (program.worker) startWorker();

function startClient() {
    var client = new Client();
    console.log('client started');
}

function startServer() {
    var server = new Server();
    console.log('server started');
}

function startWorker() {
    console.log('worker started');
}