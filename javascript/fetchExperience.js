document.addEventListener("DOMContentLoaded", function () {
    const jobExperienceContainer = document.getElementById('experience-container');
    // Load courses from JSON
    fetch('../assets/data/experience.json')
    .then(response => response.json())
    .then(data => {
        jobExperience = data;

        renderExpereinces(jobExperience);
    })
    .catch(error => console.error('Error loading experience:', error));

    function renderExpereinces(jobExperience) {
        jobExperienceContainer.innerHTML = '';
        jobExperience.forEach(jobExperience => {
            const experienceCard = document.createElement('div');
            experienceCard.classList.add('job-experience-card');
            experienceCard.innerHTML = `
            <img src="${jobExperience.logoUrl}" alt="Picture placeholder" width="64px" height="64px">
            <div class="course-details">
            <h3>${jobExperience.jobTitle}</h3>
            <p>${jobExperience.description}</p>
            <p><strong>Start Date:</strong> ${jobExperience.startDate}</p>
            <p><strong>End Date:</strong> ${jobExperience.endDate}</p>
            <p><strong>Skills:</strong> ${jobExperience.skills.join(', ')}</p>
            </div>
            `;
            jobExperienceContainer.appendChild(experienceCard);
        });
    }
})