// ============================================================
// 🧩 جدول شگفت‌انگیز
// بازی آموزشی سودوکوی ۴×۴ برای کلاس اول
// طراحی و تولید محتوای آموزشی: مرضیه محمدی
// ============================================================


// ============================================================
// 1. تنظیمات اصلی بازی
// ============================================================

const symbols = ["🍎", "🐱", "⭐", "🚗"];

const BOARD_SIZE = 4;
const EMPTY_CELLS = 7;


// ============================================================
// 2. وضعیت بازی
// ============================================================

let solution = [];
let puzzle = [];

let selectedSymbol = null;


// ============================================================
// 3. عناصر صفحه
// ============================================================

const startGameButton = document.getElementById("startGame");
const studentNameInput = document.getElementById("studentName");

const welcomePage = document.querySelector(".welcome");
const gamePage = document.getElementById("game");

const welcomeMessage = document.getElementById("welcome");
const boardElement = document.getElementById("board");
const messageElement = document.getElementById("message");

const checkButton = document.getElementById("check");
const newGameButton = document.getElementById("newGame");

const pieces = document.querySelectorAll(".piece");


// ============================================================
// 4. مدیریت صدا
// ============================================================

let audioContext = null;


/**
 * ساخت AudioContext فقط در صورت نیاز
 */
function getAudioContext() {

    if (!audioContext) {

        const AudioContext =
            window.AudioContext ||
            window.webkitAudioContext;

        if (!AudioContext) {
            return null;
        }

        audioContext = new AudioContext();
    }

    return audioContext;
}


/**
 * فعال‌سازی صدا در صورت نیاز
 */
function prepareAudio() {

    const audio = getAudioContext();

    if (!audio) {
        return;
    }

    if (audio.state === "suspended") {
        audio.resume();
    }
}


// ============================================================
// 5. شروع بازی
// ============================================================

startGameButton.addEventListener("click", startGame);


/**
 * شروع بازی با نام دانش‌آموز
 */
function startGame() {

    const name = studentNameInput.value.trim();

    if (name === "") {

        alert("🥰 لطفاً نام زیبایت را وارد کن");

        studentNameInput.focus();

        return;
    }


    // فعال‌سازی AudioContext پس از لمس کاربر
    prepareAudio();


    // نمایش نام دانش‌آموز
    welcomeMessage.textContent =
        `🌸 ${name} جان، موفق باشی!`;


    // مخفی کردن صفحه شروع
    welcomePage.style.display = "none";


    // نمایش صفحه بازی
    gamePage.style.display = "flex";


    // ساخت اولین جدول
    createNewGame();
}


// ============================================================
// 6. ساخت جدول جدید
// ============================================================

function createNewGame() {

    selectedSymbol = null;


    // حذف حالت انتخاب‌شده از شکل‌ها
    pieces.forEach(piece => {
        piece.classList.remove("selected");
    });


    // ساخت جواب کامل جدول
    solution = createSudoku();


    // ساخت نسخه قابل بازی
    puzzle = solution.map(row => [...row]);


    // خالی کردن تعدادی از خانه‌ها
    removeRandomCells();


    // نمایش جدول
    drawBoard();


    // نمایش شکل‌ها
    showSymbols();


    // پیام اولیه
    setMessage(
        "🧩 شکل مناسب را انتخاب کن!"
    );
}


// ============================================================
// 7. خالی کردن خانه‌های تصادفی
// ============================================================

function removeRandomCells() {

    let removed = 0;

    while (removed < EMPTY_CELLS) {

        const row =
            Math.floor(Math.random() * BOARD_SIZE);

        const col =
            Math.floor(Math.random() * BOARD_SIZE);


        // اگر خانه هنوز پر است، آن را خالی می‌کنیم
        if (puzzle[row][col] !== "") {

            puzzle[row][col] = "";

            removed++;
        }
    }
}


// ============================================================
// 8. ساخت سودوکوی صحیح ۴×۴
// ============================================================

function createSudoku() {

    /*
        الگوی پایه:

        🍎 🐱 ⭐ 🚗
        ⭐ 🚗 🍎 🐱
        🐱 🍎 🚗 ⭐
        🚗 ⭐ 🐱 🍎

        سپس شکل‌ها، ردیف‌ها و ستون‌ها
        به صورت تصادفی جابه‌جا می‌شوند.
    */

    const base = [
        [0, 1, 2, 3],
        [2, 3, 0, 1],
        [1, 0, 3, 2],
        [3, 2, 1, 0]
    ];


    // --------------------------------------------------------
    // جابه‌جایی تصادفی شکل‌ها
    // --------------------------------------------------------

    const shuffledSymbols = [...symbols]
        .sort(() => Math.random() - 0.5);


    let board = base.map(row =>
        row.map(value =>
            shuffledSymbols[value]
        )
    );


    // --------------------------------------------------------
    // جابه‌جایی ردیف‌های داخل گروه اول
    // --------------------------------------------------------

    if (Math.random() > 0.5) {

        [board[0], board[1]] =
            [board[1], board[0]];
    }


    // --------------------------------------------------------
    // جابه‌جایی ردیف‌های داخل گروه دوم
    // --------------------------------------------------------

    if (Math.random() > 0.5) {

        [board[2], board[3]] =
            [board[3], board[2]];
    }


    // --------------------------------------------------------
    // جابه‌جایی دو گروه ردیف
    // --------------------------------------------------------

    if (Math.random() > 0.5) {

        [board[0], board[2]] =
            [board[2], board[0]];

        [board[1], board[3]] =
            [board[3], board[1]];
    }


    // --------------------------------------------------------
    // جابه‌جایی ستون‌های داخل گروه اول
    // --------------------------------------------------------

    if (Math.random() > 0.5) {

        for (const row of board) {

            [row[0], row[1]] =
                [row[1], row[0]];
        }
    }


    // --------------------------------------------------------
    // جابه‌جایی ستون‌های داخل گروه دوم
    // --------------------------------------------------------

    if (Math.random() > 0.5) {

        for (const row of board) {

            [row[2], row[3]] =
                [row[3], row[2]];
        }
    }


    // --------------------------------------------------------
    // جابه‌جایی دو گروه ستون
    // --------------------------------------------------------

    if (Math.random() > 0.5) {

        for (const row of board) {

            [row[0], row[2]] =
                [row[2], row[0]];

            [row[1], row[3]] =
                [row[3], row[1]];
        }
    }


    return board;
}


// ============================================================
// 9. نمایش جدول
// ============================================================

function drawBoard() {

    // پاک کردن جدول قبلی
    boardElement.innerHTML = "";


    for (let row = 0; row < BOARD_SIZE; row++) {

        for (let col = 0; col < BOARD_SIZE; col++) {

            const cell =
                document.createElement("button");


            // تنظیمات پایه خانه
            cell.type = "button";
            cell.className = "cell";

            cell.dataset.row = row;
            cell.dataset.col = col;


            // ------------------------------------------------
            // خانه ثابت
            // ------------------------------------------------

            if (puzzle[row][col] !== "") {

                cell.textContent =
                    puzzle[row][col];

                cell.classList.add("fixed");

                cell.disabled = true;
            }


            // ------------------------------------------------
            // خانه خالی
            // ------------------------------------------------

            else {

                cell.textContent = "";

                cell.addEventListener(
                    "click",
                    () => putSymbol(row, col, cell)
                );
            }


            boardElement.appendChild(cell);
        }
    }
}


// ============================================================
// 10. نمایش شکل‌های انتخابی
// ============================================================

function showSymbols() {

    pieces.forEach((piece, index) => {

        const symbol = symbols[index];


        // نمایش شکل
        piece.textContent = symbol;


        // حذف listener قبلی
        piece.onclick = null;


        // انتخاب شکل
        piece.onclick = () => {

            prepareAudio();

            selectedSymbol = symbol;


            // حذف انتخاب قبلی
            pieces.forEach(item => {
                item.classList.remove("selected");
            });


            // انتخاب شکل فعلی
            piece.classList.add("selected");


            setMessage(
                "👆 حالا یک خانه خالی را انتخاب کن"
            );
        };
    });
}


// ============================================================
// 11. قرار دادن شکل در خانه
// ============================================================

function putSymbol(row, col, cell) {

    // اگر خانه ثابت باشد، کاری انجام نمی‌شود
    if (cell.classList.contains("fixed")) {
        return;
    }


    // اگر هنوز شکلی انتخاب نشده باشد
    if (selectedSymbol === null) {

        setMessage(
            "😊 اول یکی از شکل‌ها را انتخاب کن"
        );

        return;
    }


    // قرار دادن شکل
    puzzle[row][col] = selectedSymbol;

    cell.textContent = selectedSymbol;


    // خانه توسط دانش‌آموز پر شده
    cell.classList.add("user-cell");


    // پاک کردن حالت قبلی
    cell.classList.remove(
        "correct",
        "wrong"
    );


    // بررسی پاسخ
    checkCell(row, col, cell);
}


// ============================================================
// 12. بررسی یک خانه
// ============================================================

function checkCell(row, col, cell) {

    const isCorrect =
        puzzle[row][col] === solution[row][col];


    if (isCorrect) {

        // -----------------------------------------------
        // پاسخ درست
        // -----------------------------------------------

        cell.classList.remove("wrong");

        cell.classList.add("correct");


        correctSound();


        setMessage(
            "🌟 آفرین! درست انتخاب کردی"
        );

    } else {

        // -----------------------------------------------
        // پاسخ اشتباه
        // -----------------------------------------------

        cell.classList.remove("correct");

        cell.classList.add("wrong");


        wrongSound();


        setMessage(
            "💡 اشکالی ندارد، دوباره امتحان کن 😊"
        );
    }
}


// ============================================================
// 13. بررسی کامل جدول
// ============================================================

checkButton.addEventListener(
    "click",
    checkCompleteBoard
);


/**
 * بررسی تمام خانه‌های جدول
 */
function checkCompleteBoard() {

    let complete = true;
    let correct = true;


    for (let row = 0; row < BOARD_SIZE; row++) {

        for (let col = 0; col < BOARD_SIZE; col++) {

            // خانه خالی
            if (puzzle[row][col] === "") {

                complete = false;

                continue;
            }


            // پاسخ اشتباه
            if (
                puzzle[row][col] !==
                solution[row][col]
            ) {

                correct = false;
            }
        }
    }


    // --------------------------------------------------------
    // جدول هنوز کامل نشده
    // --------------------------------------------------------

    if (!complete) {

        setMessage(
            "🧩 هنوز چند خانه خالی مانده است"
        );

        return;
    }


    // --------------------------------------------------------
    // جدول کاملاً صحیح است
    // --------------------------------------------------------

    if (correct) {

        setMessage(
            "🎉🎉 آفرین! جدول را کامل حل کردی! 🏆"
        );


        successEffect();

    }


    // --------------------------------------------------------
    // جدول کامل است اما اشتباه دارد
    // --------------------------------------------------------

    else {

        setMessage(
            "💡 بعضی جواب‌ها درست نیستند؛ دوباره امتحان کن"
        );
    }
}


// ============================================================
// 14. جدول جدید
// ============================================================

newGameButton.addEventListener(
    "click",
    createNewGame
);


// ============================================================
// 15. پیام بازی
// ============================================================

function setMessage(text) {

    messageElement.textContent = text;
}


// ============================================================
// 16. صدای پاسخ اشتباه
// ============================================================

function wrongSound() {

    const audio = getAudioContext();

    if (!audio) {
        return;
    }


    if (audio.state === "suspended") {
        audio.resume();
    }


    const oscillator =
        audio.createOscillator();

    const gain =
        audio.createGain();


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
        0.18,
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


// ============================================================
// 17. صدای پاسخ درست
// ============================================================

function correctSound() {

    const audio = getAudioContext();

    if (!audio) {
        return;
    }


    if (audio.state === "suspended") {
        audio.resume();
    }


    const oscillator =
        audio.createOscillator();

    const gain =
        audio.createGain();


    oscillator.type = "sine";


    // نت اول
    oscillator.frequency.setValueAtTime(
        523,
        audio.currentTime
    );


    // نت دوم
    oscillator.frequency.setValueAtTime(
        659,
        audio.currentTime + 0.12
    );


    gain.gain.setValueAtTime(
        0.16,
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


// ============================================================
// 18. افکت موفقیت
// ============================================================

function successEffect() {

    const audio = getAudioContext();

    if (!audio) {
        return;
    }


    if (audio.state === "suspended") {
        audio.resume();
    }


    const oscillator =
        audio.createOscillator();

    const gain =
        audio.createGain();


    oscillator.type = "sine";


    oscillator.frequency.setValueAtTime(
        523,
        audio.currentTime
    );


    oscillator.frequency.setValueAtTime(
        659,
        audio.currentTime + 0.12
    );


    oscillator.frequency.setValueAtTime(
        784,
        audio.currentTime + 0.24
    );


    gain.gain.setValueAtTime(
        0.18,
        audio.currentTime
    );


    gain.gain.exponentialRampToValueAtTime(
        0.01,
        audio.currentTime + 0.5
    );


    oscillator.connect(gain);
    gain.connect(audio.destination);


    oscillator.start();


    oscillator.stop(
        audio.currentTime + 0.5
    );
}


// ============================================================
// پایان
// ============================================================
