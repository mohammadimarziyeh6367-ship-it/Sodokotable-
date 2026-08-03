const symbols = ["🍎", "🐱", "⭐", "🚗"];

const solvedBoard = [
    [0,1,2,3],
    [2,3,0,1],
    [1,0,3,2],
    [3,2,1,0]
];

let currentBoard = [];
let answerBoard = [];
let selectedCell = null;

//=========================
function copyBoard(board){
    return board.map(r=>[...r]);
}

//=========================
function shuffle(board){

    if(Math.random()>0.5)
        [board[0],board[1]]=[board[1],board[0]];

    if(Math.random()>0.5)
        [board[2],board[3]]=[board[3],board[2]];

    if(Math.random()>0.5){

        for(let i=0;i<4;i++)
            [board[i][0],board[i][1]]=[board[i][1],board[i][0]];
    }

    if(Math.random()>0.5){

        for(let i=0;i<4;i++)
            [board[i][2],board[i][3]]=[board[i][3],board[i][2]];
    }

    return board;
}


//=========================
//=========================
document.getElementById("check").onclick = function () {

    let correct = true;

    document.querySelectorAll(".cell").forEach(cell => {

        let r = Number(cell.dataset.row);
        let c = Number(cell.dataset.col);

        if (currentBoard[r][c] !== answerBoard[r][c]) {

            cell.style.background = "#ffb3b3"; // قرمز
            correct = false;

        } else {

            cell.style.background = "#b8ffb8"; // سبز

        }

    });

    if (correct) {

        document.getElementById("message").innerHTML =
            "🎉 آفرین! جدول را درست کامل کردی. 🌟";

    } else {

        document.getElementById("message").innerHTML =
            "😊 چند خانه اشتباه است، دوباره تلاش کن.";

    }

}
function newGame(){

    answerBoard = shuffle(copyBoard(solvedBoard));

    currentBoard = copyBoard(answerBoard);

    let removed = 0;

    while(removed<6){

        let r=Math.floor(Math.random()*4);
        let c=Math.floor(Math.random()*4);

        if(currentBoard[r][c]!==null){

            currentBoard[r][c]=null;
            removed++;

        }

    }

    drawBoard();

}

//=========================
function drawBoard(){

    const board=document.getElementById("board");

    board.innerHTML="";

    for(let r=0;r<4;r++){

        for(let c=0;c<4;c++){

            const cell=document.createElement("div");

            cell.className="cell";

            cell.dataset.row=r;
            cell.dataset.col=c;

            if(currentBoard[r][c]==null){

                cell.textContent="";

                cell.classList.add("empty");

                cell.onclick=()=>{

                    document.querySelectorAll(".cell").forEach(x=>x.classList.remove("selected"));

                    selectedCell=cell;

                    cell.classList.add("selected");

                }

            }else{

                cell.textContent=symbols[currentBoard[r][c]];

            }

            board.appendChild(cell);

        }

    }

}

//=========================
document.querySelectorAll(".piece").forEach((btn,index)=>{

    btn.onclick=()=>{

        if(selectedCell==null)
            return;

        let r=selectedCell.dataset.row;
        let c=selectedCell.dataset.col;

        currentBoard[r][c]=index;

        selectedCell.textContent=symbols[index];

        selectedCell.classList.remove("empty");
        selectedCell.classList.remove("selected");

        selectedCell=null;

    }

});

//=========================
document.getElementById("newGame").onclick=newGame;

newGame();
document.getElementById("startGame").onclick = function(){

    const name =
        document.getElementById("studentName").value.trim();

    if(name===""){

        alert("لطفاً نام زیبایت را واردکن🤗");

        return;

    }

    document.getElementById("welcome").innerHTML =
        "🥰 خوش آمدی " + name;

    document.querySelector(".login").style.display="none";

    document.getElementById("game").style.display="block";

    newGame();

}
