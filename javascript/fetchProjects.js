document.addEventListener("DOMContentLoaded", function () {
    const projectsContainer = document.getElementById('projects-container');
    const toggleViewBtn = document.getElementById('toggle-view');
    const searchBar = document.getElementById('search-bar');
    const filterSkill = document.getElementById('filter-skill');
    const sortProjects = document.getElementById('sort-projects');
    const projectsCountElement = document.getElementById('projects-count');

    let projects = [];
    
    // Load projects from JSON
    fetch('assets/data/projects.json')
        .then(response => response.json())
        .then(data => {
            projects = data;
        
            projectsCountElement.textContent = projects.length;// Update the counter

            // populateSkillFilter(projects);
            renderProjects(projects);
        })
        .catch(error => console.error('Error loading projects:', error));

    // Render projects
    function renderProjects(projects) {
        projectsContainer.innerHTML = '';
        projects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.classList.add('project-card');
            projectCard.innerHTML = `
            <img src="${project.logoUrl}" alt="Organization Logo" width="64px" height="64px">
            <div class="project-details">
            <h3>${project.name}</h3>
            <p><strong>Skills:</strong> ${project.skills.join(', ')}</p>
            <a href="${project.mediaUrl}" target="_blank">Relevant Documents</a>
            </div>
            `;
            projectsContainer.appendChild(projectCard);
        });
    }

    // Populate skill filter dropdown
    function populateSkillFilter(projects) {
        const skills = new Set();
        projects.forEach(course => {
            course.skills.forEach(skill => skills.add(skill));
        });
        const sortedSkills = Array.from(skills).sort(); // Sort skills alphabetically
        sortedSkills.forEach(skill => {
            const option = document.createElement('option');
            option.value = skill;
            option.textContent = skill;
            filterSkill.appendChild(option);
        });
    }

    // Search functionality
    searchBar.addEventListener('input', function () {
        const keyword = searchBar.value.toLowerCase();
        const filteredProjects = projects.filter(course =>
            course.name.toLowerCase().includes(keyword) ||
            course.org.toLowerCase().includes(keyword) ||
            course.skills.some(skill => skill.toLowerCase().includes(keyword))
        );
        renderProjects(filteredProjects);
    });

    // Filter by skill
    filterSkill.addEventListener('change', function () {
        const selectedSkill = filterSkill.value;
        const filteredProjects = selectedSkill
            ? projects.filter(course => course.skills.includes(selectedSkill))
            : projects;
        renderProjects(filteredProjects);
    });

    // Sorting functionality
    sortProjects.addEventListener('change', function () {
        const sortBy = sortProjects.value;
        let sortedProjects = [...projects];
        
        if (sortBy === 'name') {
            sortedProjects.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortBy === 'organization') {
            sortedProjects.sort((a, b) => a.org.localeCompare(b.org));
        } else if (sortBy === 'issue-date') {
            sortedProjects.sort((a, b) => new Date(a.issueDate) - new Date(b.issueDate));
        }
        
        renderProjects(sortedProjects);
    });

    // Toggle between grid and list view
    toggleViewBtn.addEventListener('click', function () {
        projectsContainer.classList.toggle('list-view');
        projectsContainer.classList.toggle('grid-view');
    });
});