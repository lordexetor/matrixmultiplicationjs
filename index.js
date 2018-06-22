var program = require('commander');
 
program
  .version('0.1.0')
  .option('-s, --server', 'Start a server')
  .option('-w, --worker', 'Start a worker')
  .option('-c, --client', 'Start a client')
  .parse(process.argv);
 
if (program.server) console.log('server started');
if (program.worker) console.log('worker started');
if (program.client) console.log('client started');
