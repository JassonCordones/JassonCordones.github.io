document.addEventListener("DOMContentLoaded", function () {
    const coursesContainer = document.getElementById('courses-container');
    const toggleViewBtn = document.getElementById('toggle-view');
    const searchBar = document.getElementById('search-bar');
    const filterSkill = document.getElementById('filter-skill');
    const sortCourses = document.getElementById('sort-courses');
    const courseCountElement = document.getElementById('course-count');

    let courses = [];
    
    // Load courses from JSON
    fetch('assets/data/courses.json')
        .then(response => response.json())
        .then(data => {
            courses = data;
        
            courseCountElement.textContent = courses.length;// Update the counter

            populateSkillFilter(courses);
            renderCourses(courses);
        })
        .catch(error => console.error('Error loading courses:', error));

    // Render courses
    function renderCourses(courses) {
        coursesContainer.innerHTML = '';
        courses.forEach(course => {
            const courseCard = document.createElement('div');
            courseCard.classList.add('course-card');
            courseCard.innerHTML = `
            <div class="course-details">
            <h3>${course.name}</h3>
            <p><strong>Issuing Organization:</strong> ${course.org}</p>
            <p><strong>Issue Date:</strong> ${course.issueDate}</p>
            <p><strong>Expiry Date:</strong> ${course.expiryDate}</p>
            <p><strong>Skills:</strong> ${course.skills.join(', ')}</p>
            <p><strong>Credential ID:</strong> ${course.credentialId}</p>
            <a href="${course.credentialUrl}" target="_blank">View Credential</a>
            <a href="${course.mediaUrl}" target="_blank">Relevant Documents</a>
            </div>
            <img src="${course.logoUrl}" alt="Organization Logo">
            `;
            coursesContainer.appendChild(courseCard);
        });
    }

    // Populate skill filter dropdown
    function populateSkillFilter(courses) {
        const skills = new Set();
        courses.forEach(course => {
            course.skills.forEach(skill => skills.add(skill));
        });
        skills.forEach(skill => {
            const option = document.createElement('option');
            option.value = skill;
            option.textContent = skill;
            filterSkill.appendChild(option);
        });
    }

    // Search functionality
    searchBar.addEventListener('input', function () {
        const keyword = searchBar.value.toLowerCase();
        const filteredCourses = courses.filter(course =>
            course.name.toLowerCase().includes(keyword) ||
            course.org.toLowerCase().includes(keyword) ||
            course.skills.some(skill => skill.toLowerCase().includes(keyword))
        );
        renderCourses(filteredCourses);
    });

    // Filter by skill
    filterSkill.addEventListener('change', function () {
        const selectedSkill = filterSkill.value;
        const filteredCourses = selectedSkill
            ? courses.filter(course => course.skills.includes(selectedSkill))
            : courses;
        renderCourses(filteredCourses);
    });

    // Sorting functionality
    sortCourses.addEventListener('change', function () {
        const sortBy = sortCourses.value;
        let sortedCourses = [...courses];
        
        if (sortBy === 'name') {
            sortedCourses.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortBy === 'organization') {
            sortedCourses.sort((a, b) => a.org.localeCompare(b.org));
        } else if (sortBy === 'issue-date') {
            sortedCourses.sort((a, b) => new Date(a.issueDate) - new Date(b.issueDate));
        }
        
        renderCourses(sortedCourses);
    });

    // Toggle between grid and list view
    toggleViewBtn.addEventListener('click', function () {
        coursesContainer.classList.toggle('list-view');
        coursesContainer.classList.toggle('grid-view');
    });
});