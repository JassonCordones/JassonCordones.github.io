document.addEventListener("DOMContentLoaded", function () {
    const blogsContainer = document.getElementById('all-blogs-container');
    // Load courses from JSON
    fetch('../assets/data/blogs.json')
    .then(response => response.json())
    .then(data => {
        featuredBlogs = data;

        renderBlogs(featuredBlogs);
    })
    .catch(error => console.error('Error loading blogs:', error));


    function renderBlogs(Blogs) {
        blogsContainer.innerHTML = '';
        Blogs.forEach(blog => {
            const blogCard = document.createElement('div');
            blogCard.classList.add('featured-blog-card');
            blogCard.innerHTML = `
            <img src="${blog.logoUrl}" alt="Picture placeholder" width="64px" height="64px">
            <div class="course-details">
            <h3>${blog.title}</h3>
            <p><strong>Date:</strong> ${blog.date}</p>
            <p><strong>Tags:</strong> ${blog.tags.join(', ')}</p>
            <a href="${blog.link}" target="_blank">View</a>
            </div>
            `;
            blogsContainer.appendChild(blogCard);
        });
    }
});