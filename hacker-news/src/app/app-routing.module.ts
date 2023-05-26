import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'top-stories',
    pathMatch: 'full'
  },
  {
    path: 'top-stories',
    loadChildren: () => import('./pages/top-stories/top-stories.module').then(m => m.TopStoriesPageModule)
  },
  {
    path: 'comments/:id',
    loadChildren: () => import('./pages/comments/comments.module').then(m => m.CommentsPageModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
