var zmq = require('zeromq')
  , sock_rep = zmq.socket('rep')
  , PartialProblem = require('../data/partialProblem')
  , PartialSolution = require('../data/partialSolution');

/**
 * Decodes an encoded partial problem.
 * @param {string} encodedPartialProblem An encoded partial problem
 * @returns {PartialProblem} The decoded partial problem.
 */
var decodePartialProblem = function(encodedPartialProblem) {
    let params = encodedPartialProblem.toString().split('#');
    if (params.length = 4) {
        // console.log(params);
        return new PartialProblem(JSON.parse(params[0]), JSON.parse(params[1]), params[2], params[3]);
    } else {
        throw Error('Could not decode partial problem: invalid format');
    }
}

module.exports = class Worker {
    // /**
    // Unique id of this worker 
    // */
    // id;
    // /**
    // Flag that shows if this worker is stopped or running
    // */
    // stopped; 
    constructor() {
        // id = UUID.randomUUID().toString();
        // stopped = new AtomicBoolean(true);
        sock_rep.connect('tcp://localhost:3001');
        console.log('Worker connected on port 3001');

        sock_rep.on('message', (msg) => {
            console.log('received partial problem');
            sock_rep.send(
                this.solvePartialProblem(decodePartialProblem(msg)).stringify()
            );
        });
    }
    

    /**
     * Solves a partial probelm
     * @param {PartialProblem} partialProblem the partial problem to solve 
     * @returns {PartialSolution} returns the partial solution for this partial problem
     */
    solvePartialProblem(partialProblem) {
        let solution = 0;
        console.log('solving', partialProblem);
        for (let i = 0; i < partialProblem.A.length; i++) {
            solution += partialProblem.A[i] * partialProblem.B[i];
        }
        console.log('solution', solution);
        return new PartialSolution(solution, partialProblem.posX, partialProblem.posY);
    }
    
    // run(){
    //     stopped.set(false);
	// 	worker.setIdentity(id.getBytes());
    //     worker.connect(serverBackendURL);
	// 	// Tell server we're ready for work
	// 	worker.send("READY");
    //     while(!stopped.get()){
    //         // Try to fetch a task from the server
    //         var matrixTask = getServerMatrixTask();
    //         // If the server supplied us a Task, solve it. Then Reset the task.
    //         var result;
    //         if(matrixTask != null){
    //             result = solveMatrix(matrixTask)
    //             matrixTask = null;
    //         }
    //         // If there is a solved Matrix, return value to server
    //         if(matrix != null){
    //             // TODO sendValue(value)
    //             matrix = null;
    //         }
    //     }
    // }


    // /** Returns the result of A x B 
    // TODO: Document and javascriptify
    // */
    // multiplyMatrices(matrixA,matrixB){
    //     if (matrixA.getNumberOfColumns() == matrixB.getNumberOfRows()) {
    //         //  Solve the matrix.
    //         matrixC = new Matrix(matrixA.getNumberOfRows(), matrixB.getNumberOfColumns());
    //         for (row_A = 0; row_A < matrixA.getNumberOfRows(); row_A++) {
    //             row = martrixA.getRow(row_A);                        
    //             for (column_B = 0; column_B < matrixB.getNumberOfColumns(); column_B++) {
    //                 sum = 0;
    //                 column = B.getColumn(column_B);
    //                 for (i = 0; i < row.length; i++) {
    //                     sum += row[i] * column[i];
    //                 }
    //                 C.setValue(row_A, column_B, sum);
    //             }
    //         }
    //         return C;
    //     } else {
    //         throw new Exception("The matrices can not be multiplied.");
    //     }
    // }

    // /** Retrives a MatrixTask from the Server */
    // getServerMatrixTask(){
    //     while (!stopped.get()) {
	// 		clientAddress = worker.recvStr();
	// 		empty = worker.recvStr();
	// 		assert (empty.length() == 0);
	// 		data = worker.recv();
    //         matrixTask;// TODO: = serialize(data);
    //         if(matrixTask!=null) return matrixTask;
    //     }
    //     return null;
    // }

    // /** Uses a MatrixTask to get the row and column that should be computed.
    // The row and column double arrays are converted to Matrix objects.
    // Using these Matrices, we can call the multiply Matrices function to solve the problem.
    // After that, the result Matrix is returned.*/
    // solveMatrix(_matrixTask){
    //     rowMatrix = new Matrix();
    //     rowMatrix = rowMatrix.initAsSingleRow(_matrixTask.getRow);
    //     columnMatrix = new Matrix();
    //     columnMatrix = columnMatrix.initAsSingleRow(_matrixTask.getColumn);
    //     result = new Matrix();
    //     result = multiplyMatrices(columnMatrix,rowMatrix);
    //     return result;
    // }
}