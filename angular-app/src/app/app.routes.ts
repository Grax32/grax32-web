import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { BlogList } from './pages/blog-list/blog-list';
import { BlogPostComponent } from './pages/blog-post/blog-post';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'articles', component: BlogList },
  { path: 'articles/:slug', component: BlogPostComponent },
  { path: 'about', redirectTo: '/', pathMatch: 'full' },
  { path: '**', redirectTo: '/' }
];
