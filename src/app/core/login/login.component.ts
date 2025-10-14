import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private supabaseService: SupabaseService,
    private toastService: MessageService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.supabaseService.getAccount().subscribe(
        res => {
          if (res) {
            const found = res.find((item: any) => item.username === this.loginForm.get('username')?.value);
            if (found) {
              if (this.loginForm.get('password')?.value === found.password) {
                localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYm')
                this.toastService.add({
                  severity: 'success',
                  summary: 'Thành công',
                  detail: 'Đăng nhập thành công!',
                });
                this.router.navigate(['/manager']);
              } else {
                this.toastService.add({
                  severity: 'error',
                  summary: 'Thất bại',
                  detail: 'Mật khẩu không chính xác'
                });
              }
            } else {
              this.toastService.add({
                severity: 'error',
                summary: 'Thất bại',
                detail: 'thông tin đăng nhập không chính xác'
              });
            }
          }
        },
        err => {
          this.toastService.add({
            severity: 'error',
            summary: 'Thất bại',
            detail: 'Đăng nhập thất bại!'
          });
        }
      )
    }
  }
}
