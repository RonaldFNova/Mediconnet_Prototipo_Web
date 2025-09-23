import { Routes } from '@angular/router';

export const routes: Routes = [
    {
    path: '',
    redirectTo: 'index',
    pathMatch: 'full'
  },

  {
    path: 'Auth',
    loadChildren: () => import('./Features/Auth/auth.module').then(m => m.AuthModule)
  },

  {
    path: 'Home',
    loadChildren: () => import('./Features/Home/home.module').then(m =>m.HomeModule)
  },

  {
    path: 'index',
    loadChildren: () => import('./Features/Index/index.module').then(m =>m.IndexModule)
  }
];
