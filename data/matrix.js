/**
 * A matrix of numbers.
 * @typedef {Object} Matrix
 * @property {number} rows - row count
 * @property {number} columns - column count
 * @property {number[][]} values - the values of the matrix
 */
module.exports = class Matrix {
    /**
     * Constructor for a new matrix with given values.
     * @param {number[][]} values values of the matrix 
     */
    constructor(values) {
        // console.log(values, values.length, values[0].length);
        this.rows = values.length;
        this.columns = values[0].length;
        this.values = values;
    }

    /**
     * Returns the values of the given column.
     * @param {number} column the column whose values will be returned
     * @returns {number[]} the array of column values    
     */
    getColumnValues(column) {
        if (column < 0 || column >= this.columns) throw Error ('Column out of bounds: The matrix is too small.');
        else {
            let column_values = [];
            this.values.forEach(row => {
                column_values.push(row[column]);
            });
            return column_values;
        }
    }

    // /**
    //  * Constructor for a new empty matrix.
    //  * @param {number} rows Row count 
    //  * @param {number} columns column count
    //  */
    // constructor(rows, columns) {
    //     this.rows = rows;
    //     this.columns = columns;
    //     values = number[rows][columns];
    // }
    // /**
    //  * Row count.
    //  * @type {number}
    //  */
    // rows = 0;
    // /**
    //  * Column count.
    //  * @type {number}
    //  */
    // columns = 0;
    // /**
    //  * @type {number[][]} 
    //  */
    // values = [];
    
    /**
     * Prints the matrix onto the console.
     */
    print() {
        var output = '';
        this.values.forEach(row => {
            row.forEach(cell => {
                output += cell + ' ';
            });
            output += '\n';
        });
        console.log(output);
        return null;
    }

    /**
     * Stringify this Matrix.
     * @returns {String} the Matrix as a string.
     */
    stringify() {
        return JSON.stringify(this.values);
    }
}