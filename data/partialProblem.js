const Matrix = require('./matrix');

/**
 * PartialProblem consists of two matrices A, B to be multiplied. 
 * It also has an index that identifies its position in the overall problem.
 * @typedef {Object} PartialProbelm
 * @property {Matrix} A - first one-dimensional partial matrix 
 * @property {Matrix} B - second one-dimensional partial matrix
 * @property {number} posX the x-value of the PartialProblem's position in the overall probelm
 * @property {number} posY the y-value of the PartialProblem's position in the overall probelm
 */
module.exports = class PartialProblem {
    /**
     * Create a new PartialProbelm.
     * @param {Matrix} _A the first one-dimensional partial matrix
     * @param {Matrix} _B the second one-dimensional partial matrix
     * @param {number} _posX the x-value of the PartialProblem's position in the overall probelm
     * @param {number} _posY the y-value of the PartialProblem's position in the overall probelm
     */
    constructor(_A, _B, _posX, _posY) {
        this.A = _A;
        this.B = _B;
        this.posX = _posX;
        this.posY = _posY;
    }
}