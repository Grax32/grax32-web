import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Blog, BlogPost } from '../../services/blog';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  featuredPosts: BlogPost[] = [];

  constructor(private blogService: Blog) {}

  ngOnInit() {
    this.blogService.getPosts().subscribe(posts => {
      this.featuredPosts = posts.slice(0, 5);
    });
  }
}
