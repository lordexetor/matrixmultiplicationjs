let zmq = require('zeromq')
  , sock = zmq.socket('rep');
let Matrix = require('../data/matrix');
let MatrixTask = require('../data/matrixTask');
let PartialProblem = require('../data/partialProblem');

/**
 * Decodes two stringified matrices.
 * @param {Buffer} clientProblem Two matrices stringified as A_values#B_values 
 */
let decodeProblem = function(clientProblem) {
    let encodedMatrices = clientProblem.toString().split("#");
    let A = new Matrix(JSON.parse(encodedMatrices[0]));
    let B = new Matrix(JSON.parse(encodedMatrices[1]));
    console.log('Matrices', A, B);
    return [A,B];
}

/**
 * Create the partial problems to solve for the matrix mulitplication.
 * Each problem represents one value in the solution matrix and has corresponding coordinates to identify its position.
 * @param {Matrix} A first Matrix
 * @param {Matrix} B second Matrix
 * @returns {PartialProblem[]} An array of partial problems to be distributed to the workers.
 */
let createPartialProblems = function(A, B) {
    const partialProblems = [];
    
    for (r = 0; r < A.rows; r++) {
        const row = A.values[r];
        for (c = 0; c < B.columns; c++) {
            const column = B.getColumnValues(c);
            const partialProblem = new PartialProblem(row, column, r, c);
            console.log(partialProblem);
            partialProblems.push(partialProblem);
        }
    }   
    console.log('Created', partialProblems.length, 'partial problems');
    return partialProblems;
}

/**
 * Validates, whether or not the matrices can be multiplied.
 * @param {Matrix} A first matrix
 * @param {Matrix} B second matrix
 * @returns {boolean} true, if the column count of the first matrix equals the row count of the second matrix
 */
let validateMatrices = function(A, B) {
    const columnsA = A.values[0].length;
    const rowsB = B.values.length;
    if (columnsA === rowsB) return true;
    else return false;
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
            const matrices = decodeProblem(msg);
            const A = matrices[0];
            const B = matrices[1];
            if (validateMatrices(A, B)) {
                this.partialProblems = createPartialProblems(A, B);
            } else {
                throw Error('Matrices are not compatible!')
            }
            sock.send('solution');
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
