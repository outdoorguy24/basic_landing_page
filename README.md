# Static Site with HTML, CSS, JavaScript and Markdown

A simple static website with blog functionality using markdown for content.

## Features

1. Simple landing page
2. Blog with markdown support
3. About and FAQ pages using markdown
4. Contact form
5. No frameworks or build tools required

## Project Structure

```
static-site/
├── index.html              # Landing page
├── blog.html              # Blog listing page
├── post.html              # Blog post template
├── about.html             # About page
├── faq.html               # FAQ page
├── contact.html           # Contact form
├── css/
│   └── style.css          # Main stylesheet
├── js/
│   ├── marked.min.js      # Markdown parser library
│   ├── main.js            # Main JavaScript file
│   └── blog-post.js       # Blog post handling
└── content/
    ├── blog/              # Blog posts in markdown
    │   └── first-post.md
    └── pages/             # Page content in markdown
        ├── about.md
        └── faq.md
```

## How to Use

1. **View the site locally**: 
   - Simply open `index.html` in your web browser, or
   - Run the development server:
     ```
     npm install
     npm run dev
     ```
   - Open your browser to http://localhost:3000

2. **Add a new blog post**:
   - Create a new markdown file in the `content/blog/` directory
   - Add the post metadata to the `loadBlogPosts()` function in `js/main.js`

3. **Edit page content**:
   - Modify the markdown files in `content/pages/` directory

4. **Deploy the site**:
   - Upload all files to any web hosting service
   - No server-side processing required

## Customization

- **Styling**: Edit `css/style.css` to change the site's appearance
- **Layout**: Modify the HTML files to change the structure
- **Content**: Update the markdown files in the `content` directory

## ConvertKit Integration

To integrate with ConvertKit for email newsletters:

1. Create a form in your ConvertKit account
2. Add the form embed code to your pages

## Contact Form

The contact form currently shows a success message without sending data. To make it functional:

1. Set up a form handling service (e.g., Formspree, Netlify Forms)
2. Update the form action and method in `contact.html`

## License

MIT
# basic_landing_page
# basic_landing_page
