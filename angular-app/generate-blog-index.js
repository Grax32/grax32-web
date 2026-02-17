const fs = require('fs');
const path = require('path');

const blogPostsDir = path.join(__dirname, 'src/assets/blog-posts');
const outputFile = path.join(__dirname, 'src/assets/blog-posts.json');

// Read all markdown files
const files = fs.readdirSync(blogPostsDir).filter(f => f.endsWith('.md'));

// Parse frontmatter from each file
const posts = files.map(filename => {
  const content = fs.readFileSync(path.join(blogPostsDir, filename), 'utf-8');
  const lines = content.split('\n');
  
  let frontmatter = {};
  let inFrontmatter = false;
  let startIndex = 0;
  
  // Parse frontmatter
  if (lines[0] === '---') {
    inFrontmatter = true;
    startIndex = 1;
    
    for (let i = startIndex; i < lines.length; i++) {
      if (lines[i] === '---') {
        startIndex = i + 1;
        break;
      }
      
      const match = lines[i].match(/^(\w+):\s*(.+)$/);
      if (match) {
        const key = match[1];
        let value = match[2];
        
        // Handle arrays
        if (value.startsWith('[')) {
          value = value.replace(/[\[\]]/g, '').split(',').map(v => v.trim()).filter(v => v);
        }
        
        frontmatter[key] = value;
      }
    }
  }
  
  // Get content without frontmatter
  const contentWithoutFrontmatter = lines.slice(startIndex).join('\n').trim();
  
  // Create slug from filename
  const slug = filename.replace('.md', '');
  
  // Ensure tags is always an array
  let tags = frontmatter.tags || [];
  if (typeof tags === 'string') {
    tags = [];
  }
  
  return {
    slug,
    filename,
    title: frontmatter.title || slug,
    date: frontmatter.date || '',
    category: frontmatter.category || '',
    tags: tags,
    excerpt: contentWithoutFrontmatter.substring(0, 200) + '...'
  };
});

// Sort by date (newest first)
posts.sort((a, b) => {
  if (!a.date || !b.date) return 0;
  return new Date(b.date) - new Date(a.date);
});

// Write to JSON file
fs.writeFileSync(outputFile, JSON.stringify(posts, null, 2));
console.log(`Generated blog index with ${posts.length} posts`);
