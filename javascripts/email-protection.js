document.addEventListener("DOMContentLoaded", function() {
    const emailSpan = document.getElementById("email-protected");
    emailSpan.addEventListener("click", function() {
        console.log('hi')
        const user = "jasson.cordones";
        const domain = "hotmail.com";
        const email = `${user}@${domain}`;
        emailSpan.textContent = email;
        emailSpan.href = `mailto:${email}`;
        emailSpan.classList.remove("clickable");
    });
});