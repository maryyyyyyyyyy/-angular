import { Component, Output, EventEmitter } from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  standalone: true
})
export class FooterComponent {
  showFooter = true;

  toggleFooter() {
    this.showFooter = !this.showFooter;
  }

  @Output() contentChange: EventEmitter<string> = new EventEmitter<string>();

  moreContent(content: string) {
    this.contentChange.emit(content);
  }
}
