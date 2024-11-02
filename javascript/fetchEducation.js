document.addEventListener("DOMContentLoaded", function () {
    const educationContainer = document.getElementById('education-container');
    // Load courses from JSON
    fetch('../assets/data/education.json')
    .then(response => response.json())
    .then(data => {
        education = data;

        renderEducation(education);
    })
    .catch(error => console.error('Error loading experience:', error));

    function renderEducation(education) {
        educationContainer.innerHTML = '';
        education.forEach(education => {
            const experienceCard = document.createElement('div');
            experienceCard.classList.add('job-experience-card');
            experienceCard.innerHTML = `
            <img src="${education.logoUrl}" alt="Picture placeholder" width="64px" height="64px">
            <div class="course-details">
            <h3>${education.org}</h3>
            <p>${education.degree} ${education.fieldOfStudy}</p>
            <p><strong>Description:</strong> ${education.description}</p>
            <p><strong>Start Date:</strong> ${education.startDate} <strong>End Date:</strong> ${education.endDate}</p>
            <p><strong>Skills:</strong> ${education.skills.join(', ')}</p>
            <a href="${education.program}" target="_blank">View Program</a>
            </div>
            `;
            educationContainer.appendChild(experienceCard);
        });
    }
})