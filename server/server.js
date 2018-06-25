let zmq = require('zeromq')
  , sock_clientRouter = zmq.socket('router')
  , sock_dlr = zmq.socket('dealer');
let Matrix = require('../data/matrix');
let MatrixTask = require('../data/matrixTask');
let PartialProblem = require('../data/partialProblem');
let PartialSolution = require('../data/partialSolution');

/**
 * Decodes two stringified matrices.
 * @param {Buffer} clientProblem Two matrices stringified as A_values#B_values 
 */
let decodeProblem = function(encodedClientProblem) {
    let encodedMatrices = encodedClientProblem.toString().split("#");
    let A = new Matrix(JSON.parse(encodedMatrices[0]));
    let B = new Matrix(JSON.parse(encodedMatrices[1]));
    console.log('Matrices', A, B);
    return [A,B];
}

/**
 * Decodes an encoded partial solution
 * @param {Buffer} encodedPartialSolution The encoded partial solution
 * @returns {PartialSolution} the decoded partial solution
 */
let decodePartialSolution = function(encodedPartialSolution) {
    console.log(encodedPartialSolution.toString());
    let params = encodedPartialSolution.toString().split('#');
    if (params.length !== 3) throw Error ('Invalid partial solution');
    else {
        return new PartialSolution(params[0], params[1], params[2]);
    }
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
    if (A.columns === B.rows) return true;
    else return false;
}

/**
 * A Server for MatrixMultiplication
 * @typedef {Object} Server
 * @property {PartialProblem[]} partialProblems the partial problems generated from the client problem
 */
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
        this.availableWorkers = [];
        this.partialProblems = [];

        sock_clientRouter.bind('tcp://localhost:3000');
        console.log('Server connected to port 3000 for client requests');

        sock_dlr.bind('tcp://localhost:3001');
        console.log('Server connected to port 3001 for worker tasks');

        sock_clientRouter.on('message', (msg) => {
            sock_clientRouter.send('Server is listening');
            // this.partialProblems = this.onReceiveClientProblem(msg)
            // this.distributePartialProblems();
        });

        sock_dlr.on('message', (msg) => {
            this.onReceivePartialSolution(msg)
        });
    }

    /**
     * When receiving a problem from a client, decode it, then validate the problem and create the partial problems from it.
     * Distribute the partial problems to the workers.
     * @param {*} msg The Problem, consisting of two matrices to be multiplied
     */
    onReceiveClientProblem(msg) {
        const matrices = decodeProblem(msg);
        const A = matrices[0];
        const B = matrices[1];
        if (validateMatrices(A, B)) {
            return createPartialProblems(A, B);
        } else {
            throw Error('Matrices are not compatible!')
        }
    }

    onReceivePartialSolution(msg) {
        console.log('received', decodePartialSolution(msg));
    }
  
    /**
     * While there are unsolved partial problems, send them to the workers.
     * TODO: when the worker fails, keep the partial problems somewhere
     */
    distributePartialProblems() {
        if (this.partialProblems.length > 0) {
            console.log('distributing partial problems ...');
            let s = this.partialProblems[0].stringify();
            console.log(s);
            sock_dlr.send(s);
            // this.partialProblems.forEach(p => {
            //     sock_dlr.send(p.stringify());
            // });
        }
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
