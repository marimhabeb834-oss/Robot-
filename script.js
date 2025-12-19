const robot = document.getElementById("robot");
const status = document.getElementById("status");

let loggedIn = false;
let ordersCount = 0;

// تحميل البيانات المحفوظة
window.onload = function () {
    let savedName = localStorage.getItem("worker");
    let savedOrders = localStorage.getItem("orders");

    if (savedName) {
        document.getElementById("welcome").innerText =
            "👋 أهلاً يا " + savedName;
        loggedIn = true;
    }

    if (savedOrders) {
        ordersCount = savedOrders;
        document.getElementById("ordersCount").innerText =
            "عدد الطلبات: " + ordersCount;
    }
};

// تسجيل الدخول
function login() {
    let name = document.getElementById("workerName").value;
    if (name === "") {
        alert("من فضلك اكتب اسمك");
        return;
    }

    localStorage.setItem("worker", name);
    loggedIn = true;

    document.getElementById("welcome").innerText =
        "👋 أهلاً يا " + name + "، التحكم مفعل";
}

// تسجيل الطلب
function saveOrder() {
    if (!loggedIn) return alert("سجّل دخول الأول");

    let order = document.getElementById("order").value;
    ordersCount++;

    localStorage.setItem("orders", ordersCount);

    document.getElementById("orderStatus").innerText =
        "📋 تم تسجيل الطلب: " + order;

    document.getElementById("ordersCount").innerText =
        "عدد الطلبات: " + ordersCount;

    speak("تم تسجيل الطلب");
}

// استلام الطلب
function takeOrder() {
    if (!loggedIn) return alert("سجّل دخول");

    robot.style.top = "120px";
    robot.style.left = "20px";
    status.innerText = "📥 تم استلام الطلب";
    speak("تم استلام الطلب");
}

// الذهاب للمطبخ مع عائق
function goKitchen() {
    if (!loggedIn) return;

    status.innerText = "⚠️ في عائق، تغيير المسار...";
    speak("يوجد عائق");

    setTimeout(() => {
        robot.style.top = "40px";
        robot.style.left = "250px";
        status.innerText = "🍳 الروبوت وصل المطبخ";
        speak("وصلت إلى المطبخ");
    }, 1200);
}

// التوصيل
function deliver() {
    if (!loggedIn) return;

    robot.style.top = "170px";
    robot.style.left = "250px";
    status.innerText = "✅ تم توصيل الطلب";
    speak("تم توصيل الطلب");
}

// وضع تلقائي
function autoMode() {
    if (!loggedIn) return alert("سجّل دخول");

    takeOrder();
    setTimeout(goKitchen, 1500);
    setTimeout(deliver, 3000);
}

// التقييم
function rate(stars) {
    document.getElementById("ratingResult").innerText =
        "🙏 شكراً لتقييمك: " + stars + " نجوم";
}

// صوت الروبوت
function speak(text) {
    let speech = new SpeechSynthesisUtterance(text);
    speech.lang = "ar-EG";
    window.speechSynthesis.speak(speech);
}
