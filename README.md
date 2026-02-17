# Custom Static Site

This repository contains both an Eleventy static site generator and an Angular application.

## Angular Application (New!)

The Angular application is located in the `angular-app/` directory.

### Getting Started with Angular

```bash
# Navigate to Angular app directory
cd angular-app

# Install dependencies
npm install

# Start development server
npm start
# or
npm run dev

# Build for production
npm run build

# The application will be available at http://localhost:4200/
```

### Angular Project Structure

```
angular-app/
├── src/
│   ├── app/
│   │   ├── components/       # Reusable components (header, footer, nav)
│   │   ├── pages/            # Page components (home, blog-list, blog-post)
│   │   └── services/         # Services (blog service)
│   ├── assets/
│   │   ├── blog-posts/      # Markdown blog posts
│   │   ├── blog-posts.json  # Blog posts index
│   │   └── images/          # Image assets
│   └── styles.css           # Global styles
├── angular.json             # Angular configuration
└── package.json             # Angular dependencies
```

### Features

- **Dynamic Blog Post Rendering**: Blog posts are loaded dynamically from markdown files
- **Markdown Support**: Uses ngx-markdown for rendering markdown content
- **Routing**: Angular Router for navigation between pages
- **Reusable Components**: Header, footer, and navigation components
- **Responsive Design**: Consistent styling across all devices

---

## Eleventy Static Site (Legacy)

A static site generator built with 11ty (Eleventy).

### Getting Started with Eleventy

```bash
# Install dependencies
npm install

# Start development server with live reload
npm run dev

# Build for production
npm run build

# Clean build directory
npm run clean
```

## Project Structure (Eleventy)

```
src/                    # Source files
├── _layouts/          # Nunjucks layouts
├── _includes/         # Reusable template includes  
├── articles/          # Blog posts and articles
├── content/           # CSS, JS, and other assets
├── data/              # Global data files (JSON)
├── images/            # Image assets
└── ...                # Pages and other content

_site/                 # Generated site (output)
.eleventy.js          # Eleventy configuration
```

## Development

- **Source**: `src/`
- **Output**: `_site/`
- **Dev Server**: https://localhost:8081/
- **Template Engine**: Nunjucks + Markdown
- **Static Assets**: Automatically copied from `src/content/` and `src/images/`

## Scripts

### Angular
- `cd angular-app && npm start` - Start Angular development server
- `cd angular-app && npm run build` - Build Angular production site

### Eleventy  
- `npm run dev` - Start development server with live reload
- `npm run build` - Build production site  
- `npm run clean` - Clean output directory
- `npm test` - Run tests
