import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';
import { AuthService } from 'src/app/Services/auth.service';
import { HelperService } from 'src/app/Services/helper.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: UntypedFormGroup;

  constructor(private fb: UntypedFormBuilder,
    private router: Router,
    private apiService: ApiService,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private helperService:HelperService

  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  navigateToSignup() {
    this.router.navigate(['/signup']);
  }

  navigateToForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }

  login(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.apiService.postData('login', { email, password }).subscribe({
        next: (response) => {
          if (response.status === 0) {
            this.helperService.error(response.msg);
          } else {
            this.helperService.success(response.msg);
            this.authService.login(response.details);
            this.router.navigate(['/home']);
          }
        },
        error: (error) => {
          this.helperService.error('An error occurred during login. Please try again.');
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }
}

