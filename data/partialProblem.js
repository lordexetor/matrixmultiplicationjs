/**
 * PartialProblem consists of two matrices A, B to be multiplied. 
 * It also has an index that identifies its position in the overall problem.
 * @typedef {Object} PartialProbelm
 * @property {number[]} A - first one-dimensional partial matrix 
 * @property {number[]} B - second one-dimensional partial matrix
 * @property {number} posX the x-value of the PartialProblem's position in the overall probelm
 * @property {number} posY the y-value of the PartialProblem's position in the overall probelm
 */
module.exports = class PartialProblem {
    /**
     * Create a new PartialProbelm.
     * @param {number[]} _A the first one-dimensional partial matrix
     * @param {number[]} _B the second one-dimensional partial matrix
     * @param {number} _posX the x-value of the PartialProblem's position in the overall probelm
     * @param {number} _posY the y-value of the PartialProblem's position in the overall probelm
     */
    constructor(_A, _B, _posX, _posY) {
        this.A = _A;
        this.B = _B;
        this.posX = _posX;
        this.posY = _posY;
    }

    /**
     * Stringifies this partialProblem
     * @returns {string} A string representation of this partial problem.
     */
    stringify() {
        let s = '';
        s += JSON.stringify(this.A) + '#' + JSON.stringify(this.B) + '#' + this.posX + '#' + this.posY; 
        return s;
    }
}