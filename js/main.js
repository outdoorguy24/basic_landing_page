document.addEventListener('DOMContentLoaded', function() {
    // Update copyright year
    const currentYear = new Date().getFullYear();
    const footerYear = document.querySelector('footer p');
    if (footerYear) {
        footerYear.innerHTML = footerYear.innerHTML.replace('2023', currentYear);
    }

    // Load blog posts
    const latestPostsElement = document.getElementById('latest-posts');
    const blogPostsElement = document.getElementById('blog-posts');
    
    if (latestPostsElement || blogPostsElement) {
        loadBlogPosts()
            .then(posts => {
                // Sort posts by date (newest first)
                posts.sort((a, b) => new Date(b.date) - new Date(a.date));
                
                // Display posts
                if (latestPostsElement) {
                    // Show only the 3 most recent posts on the homepage
                    displayBlogPosts(posts.slice(0, 3), latestPostsElement);
                }
                
                if (blogPostsElement) {
                    // Show all posts on the blog page
                    displayBlogPosts(posts, blogPostsElement);
                }
            })
            .catch(error => {
                console.error('Error loading blog posts:', error);
                const errorMessage = document.createElement('p');
                errorMessage.textContent = 'Failed to load blog posts. Please try again later.';
                
                if (latestPostsElement) latestPostsElement.appendChild(errorMessage.cloneNode(true));
                if (blogPostsElement) blogPostsElement.appendChild(errorMessage);
            });
    }
});

// Function to load blog posts from the content/blog directory
async function loadBlogPosts() {
    try {
        // In a real implementation, this would fetch a JSON file with blog metadata
        // For this simple example, we'll hardcode some sample posts
        return [
            {
                id: 'first-post',
                title: 'Getting Started with Static Sites',
                date: '2023-06-15',
                excerpt: 'Learn how to build a simple static site with HTML, CSS, and JavaScript.',
                file: 'content/blog/first-post.md'
            },
            {
                id: 'markdown-guide',
                title: 'Markdown Formatting Guide',
                date: '2023-06-10',
                excerpt: 'A quick reference for Markdown syntax and formatting options.',
                file: 'content/blog/markdown-guide.md'
            },
            {
                id: 'static-vs-dynamic',
                title: 'Static vs. Dynamic Websites',
                date: '2023-06-05',
                excerpt: 'Comparing static and dynamic websites: pros, cons, and when to use each.',
                file: 'content/blog/static-vs-dynamic.md'
            }
        ];
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        throw error;
    }
}

// Function to display blog posts in the specified container
function displayBlogPosts(posts, container) {
    container.innerHTML = '';
    
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'blog-card';
        
        postElement.innerHTML = `
            <h3><a href="post.html?id=${post.id}">${post.title}</a></h3>
            <div class="date">${formatDate(post.date)}</div>
            <p>${post.excerpt}</p>
            <a href="post.html?id=${post.id}" class="read-more">Read more</a>
        `;
        
        container.appendChild(postElement);
    });
}

// Function to format dates
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
} 