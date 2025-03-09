import { Routes } from '@angular/router';
import {MainComponent} from './main/main.component';
import {ContentComponent} from './main/content/content.component';

export const routes: Routes = [
  {path: '', component: MainComponent, children: [
    {path: 'home_menu', component: ContentComponent},
      {path: 'account', component: ContentComponent},
      {path: 'settings', component: ContentComponent},
    ]},
];
