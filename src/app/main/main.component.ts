import { Component } from '@angular/core';
import {HeaderComponent} from './header/header.component';
import {ContentComponent} from './content/content.component';
import {FooterComponent} from './footer/footer.component';

@Component({
  selector: 'app-main',
  imports: [HeaderComponent, ContentComponent, FooterComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  standalone: true
})
export class MainComponent {
}
