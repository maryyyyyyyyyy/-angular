import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./main/main.component').then(m => m.MainComponent),
    children: [
      {
        path: 'home_menu',
        loadComponent: () => import('./main/content/content.component').then(m => m.ContentComponent),
      },
      {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
      },
      {
        path: 'register',
        loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent),
      },
      {
        path: 'settings',
        loadComponent: () => import('./pages/settings/settings.component').then(m => m.SettingsComponent),
        canActivate: [AuthGuard],
      },
      {
        path: '',
        redirectTo: 'home_menu',
        pathMatch: 'full',
      }
    ]
  },
  {
    path: '**',
    redirectTo: '',
  }
];
