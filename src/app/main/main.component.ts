import { Component } from '@angular/core';
import {HeaderComponent} from './header/header.component';
import {ContentComponent} from './content/content.component';
import {FooterComponent} from './footer/footer.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-main',
  imports: [HeaderComponent, ContentComponent, FooterComponent, RouterOutlet],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  standalone: true
})
export class MainComponent {
  contentText= 'Приховано';

  updateContent(newContent: string){
    this.contentText = newContent;
  }
}
