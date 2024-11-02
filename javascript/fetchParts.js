document.addEventListener("DOMContentLoaded", async () => {
    const footer = document.getElementById('footer');
    if (!footer) return; // Exit if footer doesn't exist

    try {
        const response = await fetch('../parts/footer.html')
        if (response.ok) {
            footer.innerHTML = await response.text();
        } else {
            console.error('Failed to load footer:', response.status);
        }
    } catch (error) {
        console.error('Error loading footer:', error);
    }
});