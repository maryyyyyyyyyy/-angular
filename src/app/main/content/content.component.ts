import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss',
})
export class ContentComponent implements OnInit {
  products = ['Phone', 'Tablet', 'Laptop', 'Desktop'];
  content: string = 'Оберіть розділ'; // Більше не @Input()

  data: any[] = [];
  error: string = '';
  postSuccess = false;

  form!: FormGroup;

  private apiService = inject(ApiService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  ngOnInit(): void {
    this.setContentFromUrl();     // 🆕 Динамічне визначення розділу
    this.fetchData();

    this.form = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
    });
  }

  setContentFromUrl(): void {
    const url = this.router.url;

    if (url.includes('home_menu')) {
      this.content = 'Головна';
    } else if (url.includes('account')) {
      this.content = 'Профіль';
    } else if (url.includes('settings')) {
      this.content = 'Налаштування';
    } else {
      this.content = 'Оберіть розділ';
    }
  }

  fetchData(): void {
    this.apiService.getData().subscribe({
      next: (res) => {
        this.data = res;
        this.error = '';
      },
      error: (err) => {
        this.error = err.message;
      }
    });
  }

  submitForm(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.error = 'Будь ласка, заповніть усі поля.';
      return;
    }

    const newEntry = this.form.value;

    this.apiService.postData(newEntry).subscribe({
      next: () => {
        this.data.unshift(newEntry);
        this.postSuccess = true;
        this.error = '';
        this.form.reset();
      },
      error: (err) => {
        this.error = err.message;
      }
    });
  }
}
