document.addEventListener("DOMContentLoaded", function () {
    const featuredBlogsContainer = document.getElementById('featured-blogs-container');
    // Load courses from JSON
    fetch('../assets/data/featured-blogs.json')
    .then(response => response.json())
    .then(data => {
        featuredBlogs = data;

        renderFeaturedBlogs(featuredBlogs);
    })
    .catch(error => console.error('Error loading featured blogs:', error));


    function renderFeaturedBlogs(featuredBlogs) {
        featuredBlogsContainer.innerHTML = '';
        featuredBlogs.forEach(featuredBlog => {
            const featuredBlogCard = document.createElement('div');
            featuredBlogCard.classList.add('featured-blog-card');
            featuredBlogCard.innerHTML = `
            <img src="${featuredBlog.logoUrl}" alt="Picture placeholder" width="64px" height="64px">
            <div class="course-details">
            <h3>${featuredBlog.title}</h3>
            <p><strong>Date:</strong> ${featuredBlog.date}</p>
            <p><strong>Tags:</strong> ${featuredBlog.tags.join(', ')}</p>
            <a href="${featuredBlog.link}" target="_blank">View</a>
            </div>
            `;
            featuredBlogsContainer.appendChild(featuredBlogCard);
        });
    }
});