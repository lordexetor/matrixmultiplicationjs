var Client = require('./client/client');
var Server = require('./server/server');
var program = require('commander');
 
/**
 * Start options for the program.
 * -c starts a client
 * -s starts a server
 * -w starts a worker
 */
program
  .version('0.1.0')
  .option('-s, --server', 'Start a server')
  .option('-w, --worker', 'Start a worker')
  .option('-c, --client', 'Start a client')
  .parse(process.argv);
  
if (program.client) startClient();
if (program.server) startServer();
if (program.worker) startWorker();

/**
 * Start a new client that sends two matrices to multiply.
 */
function startClient() {
    var client = new Client();
    console.log('client started');
}

/**
 * Starts a new server that receives client tasks and distributes small problems to workers.
 */
function startServer() {
    var server = new Server();
    console.log('server started');
}

/**
 * Starts a new worker that solves a small problem.
 */
function startWorker() {
    console.log('worker started');
}