/**
 * PartialSolution is the result of a PartialProblem, consisting of the PartialProblem's solution
 * and the coordinates to identify it in the overall problem.
 * @typedef {PartialSolution}
 * @property {number} partialSolution solution of the partial problem
 * @property {number} posX the x-value of the PartialSolution's position in the overall problem
 * @property {number} posY the y-value of the PartialSolution's position in the overall problem
 * 
 */
module.exports = class PartialSolution {
    /**
     * 
     * @param {number} _partialSolution the solution for the partial problem 
     * @param {number} _posX the x-value of the PartialSolution's position in the overall problem
     * @param {number} _posY the y-value of the PartialSolution's position in the overall problem
     */
    constructor(_partialSolution, _posX, _posY) {
        this.posX = _posX;
        this.posY = _posY;
        this.partialSolution = _partialSolution;
    }

    /**
     * Stringify this partial solution.
     */
    stringify() {
        let s = '';
        s += this.partialSolution + '#' + this.posX + '#' + this.posY;
        return s;
    }
}