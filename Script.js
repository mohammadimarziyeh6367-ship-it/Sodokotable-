// چهار نماد بازی
const symbols = ["🍎", "🐱", "⭐", "🚗"];

// جدول پایه معتبر
const baseBoard = [
    [0,1,2,3],
    [2,3,0,1],
    [1,0,3,2],
    [3,2,1,0]
];

// کپی جدول
function copyBoard(board){
    return board.map(r=>[...r]);
}

// جابجایی دو سطر
function swapRows(board,r1,r2){
    [board[r1],board[r2]]=[board[r2],board[r1]];
}

// جابجایی دو ستون
function swapCols(board,c1,c2){
    for(let i=0;i<4;i++){
        [board[i][c1],board[i][c2]]=[board[i][c2],board[i][c1]];
    }
}

// تولید جدول جدید
function generateBoard(){

    let board = copyBoard(baseBoard);

    // جابجایی سطرهای داخل هر گروه
    if(Math.random()>0.5)
        swapRows(board,0,1);

    if(Math.random()>0.5)
        swapRows(board,2,3);

    // جابجایی ستون‌های داخل هر گروه
    if(Math.random()>0.5)
        swapCols(board,0,1);

    if(Math.random()>0.5)
        swapCols(board,2,3);

    return board;
}
