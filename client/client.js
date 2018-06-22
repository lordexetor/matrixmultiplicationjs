var Matrix = require('./../data/matrix');
var zmq = require('zeromq')
, sock = zmq.socket('req');

module.exports = class Client {
    constructor() {

        sock.bindSync('tcp://127.0.0.1:3000');
        console.log('Producer bound to port 3000');
        
        var A = new Matrix([[1,2,3],[4,5,6]]);
        var B = new Matrix([[2,1],[2,2],[3,1]]);
        A.print();
        B.print();

        this.sendProblem(A, B);
        // setInterval(function(){
        //   console.log('sending work');
        //   sock.send('some work');
        // }, 500);
    }

    /**
     * Send two matrices to the server to be multiplied.
     * @param {Matrix} A - first matrix 
     * @param {Matrix} B - second matrix
     */
    sendProblem(A, B) {
        var payload1 = A.stringify();
        var payload2 = B.stringify();
        console.log(payload1, payload2);
        sock.send(payload1 + '#' + payload2);
        
    }
}


