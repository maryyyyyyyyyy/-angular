import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ContentComponent } from './main/content/content.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthComponent } from './pages/auth/auth.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'home_menu', component: ContentComponent },
      { path: 'account', component: AuthComponent },
      { path: 'settings', component: ContentComponent },
      { path: '', redirectTo: 'home_menu', pathMatch: 'full' },
    ]
  },
  { path: '**', redirectTo: '' }
];
