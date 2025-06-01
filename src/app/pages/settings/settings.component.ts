import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {

  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('user'); // видаляємо користувача з localStorage
    this.router.navigate(['/login']); // редірект на логін
  }
}
