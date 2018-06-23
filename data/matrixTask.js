module.exports = class MatrixTask {
//    /**  
//     *   The index of the row from the matrix 
//     *   @type {number}
//     */
//     indexRow;
//    /**  
//     *   The index of the column from the matrix 
//     *   @type {number}
//     */
//     indexColumn;
//    /**  
//     *   The values of the row from the matrix 
//     *   @type {number[]}
//     */
//     valuesRow;
//    /**  
//     *   The values of the column from the matrix 
//     *   @type {number[]}
//     */
//     valuesColumn;

    // /**
    // * Default constructor
    // */
    // constructor() {
       
    // }
    /**
    Constructor for a MatrixTask to be solved
     */
	constructor(_indexRow,_indexColumn,_valuesRow,_valuesColumn) {
		this.indexRow = _indexRow;
		this.indexColumn = _indexColumn;
        this.valuesRow = Arrays.copyOf(     _valuesRow,     _valuesRow.length);
		this.valuesColumn = Arrays.copyOf( _valuesColumn,  _valuesColumn.length);
	}

    /**
    Prints this entity to the console
     */
	print() {
        console.log(
            getClass().getName() + ": "
			+ " | indexRow=" + indexRow
			+ " | indexColumn=" + indexColumn
			+ " | valuesRow=" + Arrays.toString(valuesRow)
			+ " | valuesColumn=" + Arrays.toString(valuesColumn)
        );
	}
}