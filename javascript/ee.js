const sparkles = document.getElementById("sparkles");
const target = document.getElementById("sparkle-target");
const message = document.getElementById("message");

function createSparkle() {
    const s = document.createElement("div");
    s.className = "sparkle";

    const angle = Math.random() * 2 * Math.PI;
    const radius = Math.random() * 30 + 10; // distance around target
    s.style.setProperty("--x", Math.cos(angle) * radius);
    s.style.setProperty("--y", Math.sin(angle) * radius);

    sparkles.appendChild(s);
    setTimeout(() => s.remove(), 1500);
}

setInterval(createSparkle, 500);

target.addEventListener("click", () => {
    message.classList.toggle("hidden");
});
