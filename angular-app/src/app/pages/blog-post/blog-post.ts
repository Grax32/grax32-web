import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';
import { Blog, BlogPost } from '../../services/blog';

@Component({
  selector: 'app-blog-post',
  imports: [CommonModule, MarkdownModule],
  templateUrl: './blog-post.html',
  styleUrl: './blog-post.css',
})
export class BlogPostComponent implements OnInit {
  post: BlogPost | null = null;
  content: string = '';
  loading = true;
  notFound = false;

  constructor(
    private route: ActivatedRoute,
    private blogService: Blog
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const slug = params['slug'];
      this.loadPost(slug);
    });
  }

  loadPost(slug: string) {
    this.loading = true;
    this.notFound = false;

    this.blogService.getPost(slug).subscribe(result => {
      if (!result.post) {
        this.notFound = true;
        this.loading = false;
        return;
      }

      this.post = result.post;
      
      // Load the actual content
      this.blogService.getPostContent(result.post.filename).subscribe(content => {
        this.content = content;
        this.loading = false;
      });
    });
  }
}
