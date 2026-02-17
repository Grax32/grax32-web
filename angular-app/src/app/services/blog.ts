import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface BlogPost {
  slug: string;
  filename: string;
  title: string;
  date: string;
  category: string;
  tags: string[];
  excerpt: string;
}

@Injectable({
  providedIn: 'root',
})
export class Blog {
  private postsCache: BlogPost[] | null = null;

  constructor(private http: HttpClient) { }

  getPosts(): Observable<BlogPost[]> {
    if (this.postsCache) {
      return of(this.postsCache);
    }
    
    return this.http.get<BlogPost[]>('/assets/blog-posts.json').pipe(
      map(posts => {
        this.postsCache = posts;
        return posts;
      }),
      catchError(error => {
        console.error('Error loading blog posts:', error);
        return of([]);
      })
    );
  }

  getPost(slug: string): Observable<{ post: BlogPost | null, content: string }> {
    return this.getPosts().pipe(
      map(posts => {
        const post = posts.find(p => p.slug === slug);
        if (!post) {
          return { post: null, content: '' };
        }
        return { post, content: '' };
      })
    );
  }

  getPostContent(filename: string): Observable<string> {
    return this.http.get(`/assets/blog-posts/${filename}`, { responseType: 'text' }).pipe(
      map(content => {
        // Remove frontmatter
        const lines = content.split('\n');
        if (lines[0] === '---') {
          let endIndex = lines.findIndex((line, index) => index > 0 && line === '---');
          if (endIndex > 0) {
            return lines.slice(endIndex + 1).join('\n').trim();
          }
        }
        return content;
      }),
      catchError(error => {
        console.error('Error loading blog post content:', error);
        return of('Content not found');
      })
    );
  }
}
