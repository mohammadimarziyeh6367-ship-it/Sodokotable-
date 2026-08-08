const startGame = document.getElementById("startGame");

startGame.addEventListener("click", function () {

    const name = document
        .getElementById("studentName")
        .value
        .trim();

    if (name === "") {

        alert("🥰 لطفاً نام زیبایت را وارد کن");

        return;
    }

    // نمایش نام دانش‌آموز
    document.getElementById("welcome").textContent =
        "🌸 " + name + " جان، آماده‌ای؟";

    // مخفی کردن صفحه اول
    document.querySelector(".welcome").style.display = "none";

    // نمایش صفحه بازی
    document.getElementById("game").style.display = "flex";

});
