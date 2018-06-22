var zmq = require('zeromq')
  , sock = zmq.socket('rep');
var Matrix = require('../data/matrix');
var MatrixTask = require('../data/matrixTask');

/**
 * Decodes two stringified matrices.
 * @param {Buffer} clientProblem Two matrices stringified as A_values#B_values 
 */
var decodeProblem = function(clientProblem) {
    var encodedMatrices = clientProblem.toString().split("#");
    var A = new Matrix(JSON.parse(encodedMatrices[0]));
    var B = new Matrix(JSON.parse(encodedMatrices[1]));
    console.log('Matrices', A, B);
    return [A,B];
}

module.exports = class Server {

    // /** The row and column count at which the matrices will be split. */
    // splitIndexRow = 0;
    // splitIndexColumn = 0;
    // /** A list of available workers that are not already in use. */
    // workerQueue;
    // /** The Matrix to solve */
    // matrix;

    /**
     */
    constructor() {
        sock.connect('tcp://127.0.0.1:3000');
        console.log('Server connected to port 3000');

        sock.on('message', function(msg) {
            decodeProblem(msg);
        });
    }



    // public void addWorker(Worker w) {
    //     idleWorkers.add(w);
    // }

    // /** Get a worker from the idle workers. This worker is then no longer idle. */
    // public Worker getWorker() throws Exception {
    //     if (!idleWorkers.isEmpty()) {
    //         return idleWorkers.remove(0);
    //     } else {
    //         throw new Exception("No idle workers available");
    //     }
    // }

    /** Sets the Matrix to be solved */
    setMatrix(_matrix){
        this.matrix = _matrix;
    }

    /** Splits the Matrix to be solved, depending on the current row/column index */
    splitMatrixIntoTask(_matrix){
        row = _matrix.getRow(splitIndexRow);
        column = _matrix.getColumn(splitIndexColumn);
        matrixTask = new MatrixTask(splitIndexRow,splitIndexColumn,row,column);
        splitIndexRow++;
        splitIndexColumn++;
        return matrixTask;
    }

    /**
    Server logic is implemented here
     */
    run(){
      // init context and sockets
      context = ZMQ.context(1);
      frontend = context.socket(ZMQ.ROUTER);
		  backend = context.socket(ZMQ.ROUTER);
	    frontend.bind(frontendURL);
		  backend.bind(backendURL);
    }

    /**
    Receives a client request from the frontend
    request contains frames: address,empty,matrixTask
     */
    getClientMatrix(){
      if (items.pollin(frontendPollerId)) {
        // Now get next client request, route to LRU worker
		    // Client request is [address][empty][request]
		    clientAddress = frontend.recvStr();
		    empty = frontend.recv();
		    assert (empty.length == 0);
		    matrixBytes = frontend.recv();
        // TODO:
        //matrix = bytesToMatrix(matrixBytes);
        }
    }

    /**
    Sends a matrix task to a idle worker
     */
    sendMatrixTask(_matrixTask){
      // Get the next worker from the queue
      workerAddress = workerQueue.poll();
      backend.sendMore(workerAddr);
		  backend.sendMore("");
      // TODO:
      // backend.sendMore(clientAddr);
		  // backend.sendMore("");
		  // backend.send(request);
    }
}
