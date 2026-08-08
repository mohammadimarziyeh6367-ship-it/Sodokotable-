// ========================================
// جدول شگفت انگیز - سودوکوی کلاس اول
// ========================================

const symbols = ["🍎", "🐱", "⭐", "🚗"];

let solution = [];
let puzzle = [];

let selectedSymbol = null;


// ========================================
// شروع بازی
// ========================================

document.getElementById("startGame").addEventListener("click", function () {

    const name = document
        .getElementById("studentName")
        .value
        .trim();

    if (name === "") {
        alert("🥰 لطفاً نام زیبایت را وارد کن");
        return;
    }

    document.getElementById("welcome").textContent =
        "🌸 " + name + " جان، موفق باشی!";

    document.querySelector(".welcome").style.display = "none";

    document.getElementById("game").style.display = "flex";

    createNewGame();
});


// ========================================
// ساخت جدول جدید
// ========================================

function createNewGame() {

    selectedSymbol = null;

    solution = createSudoku();

    puzzle = solution.map(row => [...row]);

    // چند خانه را خالی می‌کنیم
    const emptyCells = 7;

    let removed = 0;

    while (removed < emptyCells) {

        const row = Math.floor(Math.random() * 4);
        const col = Math.floor(Math.random() * 4);

        if (puzzle[row][col] !== "") {

            puzzle[row][col] = "";

            removed++;
        }
    }

    drawBoard();

    showSymbols();

    document.getElementById("message").textContent =
        "🧩 شکل مناسب را انتخاب کن!";
}


// ========================================
// ساخت سودوکوی صحیح ۴×۴
// ========================================

function createSudoku() {

    const base = [
        [0, 1, 2, 3],
        [2, 3, 0, 1],
        [1, 0, 3, 2],
        [3, 2, 1, 0]
    ];

    // جابه‌جایی تصادفی شکل‌ها
    const shuffledSymbols = [...symbols].sort(
        () => Math.random() - 0.5
    );

    let board = base.map(row =>
        row.map(value => shuffledSymbols[value])
    );

    // جابه‌جایی ردیف‌های داخل پنجره‌ها
    if (Math.random() > 0.5) {
        [board[0], board[1]] = [board[1], board[0]];
    }

    if (Math.random() > 0.5) {
        [board[2], board[3]] = [board[3], board[2]];
    }

    // جابه‌جایی دو گروه ردیف
    if (Math.random() > 0.5) {
        [board[0], board[2]] = [board[2], board[0]];
        [board[1], board[3]] = [board[3], board[1]];
    }

    // جابه‌جایی ستون‌های داخل پنجره‌ها
    if (Math.random() > 0.5) {
        for (let row of board) {
            [row[0], row[1]] = [row[1], row[0]];
        }
    }

    if (Math.random() > 0.5) {
        for (let row of board) {
            [row[2], row[3]] = [row[3], row[2]];
        }
    }

    // جابه‌جایی دو گروه ستون
    if (Math.random() > 0.5) {
        for (let row of board) {
            [row[0], row[2]] = [row[2], row[0]];
            [row[1], row[3]] = [row[3], row[1]];
        }
    }

    return board;
}


// ========================================
// نمایش جدول
// ========================================

function drawBoard() {

    const boardElement = document.getElementById("board");

    boardElement.innerHTML = "";

    for (let row = 0; row < 4; row++) {

        for (let col = 0; col < 4; col++) {

            const cell = document.createElement("button");

            cell.className = "cell";

            cell.dataset.row = row;
            cell.dataset.col = col;

            if (puzzle[row][col] !== "") {

                cell.textContent = puzzle[row][col];

                cell.classList.add("fixed");

            } else {

                cell.textContent = "";

                cell.addEventListener("click", function () {

                    putSymbol(row, col, cell);

                });
            }

            boardElement.appendChild(cell);
        }
    }
}


// ========================================
// نمایش شکل‌ها
// ========================================

function showSymbols() {

    const pieces = document.querySelectorAll(".piece");

    pieces.forEach((piece, index) => {

        piece.textContent = symbols[index];

        piece.onclick = function () {

            selectedSymbol = symbols[index];

            pieces.forEach(p =>
                p.classList.remove("selected")
            );

            piece.classList.add("selected");

            document.getElementById("message").textContent =
                "👆 حالا یک خانه خالی را انتخاب کن";
        };
    });
}


// ========================================
// قرار دادن شکل در خانه
// ========================================

function putSymbol(row, col, cell) {

    if (selectedSymbol === null) {

        document.getElementById("message").textContent =
            "😊 اول یکی از شکل‌ها را انتخاب کن";

        return;
    }

    puzzle[row][col] = selectedSymbol;

    cell.textContent = selectedSymbol;

    cell.classList.add("user-cell");

    checkCell(row, col, cell);
}


// ========================================
// بررسی همان خانه
// ========================================
function checkCell(row, col, cell) {

    if (puzzle[row][col] === solution[row][col]) {

        // پاسخ درست
        cell.classList.remove("wrong");

        cell.classList.add("correct");

        correctSound();

        document.getElementById("message").textContent =
            "🌟 آفرین! درست انتخاب کردی";

    } else {

        // پاسخ اشتباه
        cell.classList.remove("correct");

        cell.classList.add("wrong");

        wrongSound();

        document.getElementById("message").textContent =
            "💡 اشکالی ندارد، دوباره امتحان کن 😊";
    }


}


// ========================================
// بررسی کامل جدول
// ========================================

document.getElementById("check").addEventListener("click", function () {

    let complete = true;
    let correct = true;

    for (let row = 0; row < 4; row++) {

        for (let col = 0; col < 4; col++) {

            if (puzzle[row][col] === "") {

                complete = false;

            } else if (puzzle[row][col] !== solution[row][col]) {

                correct = false;
            }
        }
    }

    if (!complete) {

        document.getElementById("message").textContent =
            "🧩 هنوز چند خانه خالی مانده است";

        return;
    }

    if (correct) {

        document.getElementById("message").textContent =
            "🎉🎉 آفرین! جدول را کامل حل کردی! 🏆";

    } else {

        document.getElementById("message").textContent =
            "💡 بعضی جواب‌ها درست نیستند؛ دوباره امتحان کن";
    }
});


// ========================================
// جدول جدید
// ========================================

document.getElementById("newGame").addEventListener("click", function () {

    createNewGame();

});// ========================================
// صدای پاسخ اشتباه
// ========================================

function wrongSound() {

    const audio = new (window.AudioContext ||
        window.webkitAudioContext)();

    const oscillator = audio.createOscillator();
    const gain = audio.createGain();

    oscillator.type = "sine";

    oscillator.frequency.setValueAtTime(
        220,
        audio.currentTime
    );

    oscillator.frequency.exponentialRampToValueAtTime(
        140,
        audio.currentTime + 0.25
    );

    gain.gain.setValueAtTime(
        0.25,
        audio.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
        0.01,
        audio.currentTime + 0.25
    );

    oscillator.connect(gain);
    gain.connect(audio.destination);

    oscillator.start();

    oscillator.stop(
        audio.currentTime + 0.25
    );
}


// ========================================
// صدای پاسخ درست
// ========================================

function correctSound() {

    const audio = new (window.AudioContext ||
        window.webkitAudioContext)();

    const oscillator = audio.createOscillator();
    const gain = audio.createGain();

    oscillator.type = "sine";

    oscillator.frequency.setValueAtTime(
        523,
        audio.currentTime
    );

    oscillator.frequency.setValueAtTime(
        659,
        audio.currentTime + 0.12
    );

    gain.gain.setValueAtTime(
        0.2,
        audio.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
        0.01,
        audio.currentTime + 0.3
    );

    oscillator.connect(gain);
    gain.connect(audio.destination);

    oscillator.start();

    oscillator.stop(
        audio.currentTime + 0.3
    );
}
س
