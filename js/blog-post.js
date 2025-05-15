document.addEventListener('DOMContentLoaded', function() {
    // Update copyright year
    const currentYear = new Date().getFullYear();
    const footerYear = document.querySelector('footer p');
    if (footerYear) {
        footerYear.innerHTML = footerYear.innerHTML.replace('2023', currentYear);
    }

    // Get the post ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

    if (postId) {
        loadBlogPost(postId)
            .then(post => {
                // Set the page title
                document.title = `${post.title} | My Website`;
                
                // Update the post title and date
                document.getElementById('post-title').textContent = post.title;
                document.getElementById('post-date').textContent = formatDate(post.date);
                
                // Load and render the markdown content
                return fetch(post.file)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Failed to load post content');
                        }
                        return response.text();
                    })
                    .then(markdown => {
                        // Convert markdown to HTML using marked.js
                        document.getElementById('post-content').innerHTML = marked.parse(markdown);
                    });
            })
            .catch(error => {
                console.error('Error loading blog post:', error);
                document.getElementById('post-content').innerHTML = `
                    <div class="error">
                        <h2>Error Loading Post</h2>
                        <p>Sorry, we couldn't load the requested blog post. It might not exist or there was an error.</p>
                        <p><a href="blog.html">Return to Blog</a></p>
                    </div>
                `;
            });
    } else {
        // No post ID provided
        window.location.href = 'blog.html';
    }
});

// Function to load a specific blog post by ID
async function loadBlogPost(id) {
    try {
        // In a real implementation, this would fetch from a JSON file or API
        // For this simple example, we'll use the same hardcoded posts
        const posts = [
            {
                id: 'first-post',
                title: 'Getting Started with Static Sites',
                date: '2023-06-15',
                file: 'content/blog/first-post.md'
            },
            {
                id: 'markdown-guide',
                title: 'Markdown Formatting Guide',
                date: '2023-06-10',
                file: 'content/blog/markdown-guide.md'
            },
            {
                id: 'static-vs-dynamic',
                title: 'Static vs. Dynamic Websites',
                date: '2023-06-05',
                file: 'content/blog/static-vs-dynamic.md'
            }
        ];
        
        const post = posts.find(post => post.id === id);
        
        if (!post) {
            throw new Error('Post not found');
        }
        
        return post;
    } catch (error) {
        console.error('Error fetching blog post:', error);
        throw error;
    }
}

// Function to format dates
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
} 