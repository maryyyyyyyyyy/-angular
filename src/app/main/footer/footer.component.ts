import { Component, Output, EventEmitter } from '@angular/core';
import {CommonModule} from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  standalone: true
})
export class FooterComponent {
  showFooter = true;
  form: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  toggleFooter() {
    this.showFooter = !this.showFooter;
  }

  @Output() contentChange: EventEmitter<string> = new EventEmitter<string>();

  moreContent(content: string) {
    this.contentChange.emit(content);
  }

  onSubmit() {
    if (this.form.valid) {
      this.http.post('http://localhost:3000/register', this.form.value)
        .subscribe({
          next: res => console.log('Дані успішно відправлено:', res),
          error: err => console.error('Помилка при відправці:', err)
        });
    } else {
      console.warn('Форма не валідна');
    }
  }
}
