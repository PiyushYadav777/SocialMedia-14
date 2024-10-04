import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';
import { HelperService } from 'src/app/Services/helper.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  forgotPasswordForm: UntypedFormGroup;
  otpSent: boolean = false;

  constructor(
    private fb: UntypedFormBuilder,
    private apiService: ApiService,
    private snackBar: MatSnackBar,
    private router: Router,
    private helperService:HelperService
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      otp: [''],
      newPassword: ['']
    });
  }

  requestOtp(): void {
    if (this.forgotPasswordForm.get('email')?.valid) {
      const { email } = this.forgotPasswordForm.value;
      this.apiService.postData('forgot_password', { email }).subscribe({
        next: (response) => {
          if (response.status == 1) {
            this.snackBar.open(response.msg, 'Close', {
              duration: 5000,
              panelClass: ['success-snackbar']
            });
            this.otpSent = true;
          } else {
            this.snackBar.open(response.msg, 'Close', {
              duration: 5000,
              panelClass: ['error-snackbar']
            });
          }
        },
        error: (error) => {
          console.error('Request OTP failed', error);
          this.snackBar.open('An error occurred. Please try again.', 'Close', {
            duration: 5000,
            panelClass: ['error-snackbar']
          });
        }
      });
    }
  }

  resetPassword(): void {
    if (this.forgotPasswordForm.valid) {
      const { email, otp, newPassword } = this.forgotPasswordForm.value;
      this.apiService.postData('reset_password', { email, otp, password: newPassword }).subscribe({
        next: (response) => {
          if (response.status == 1) {
            this.helperService.success(response.msg);
            this.router.navigate(['/login']);
          } else {
            this.helperService.error(response.msg);
          }
        },
        error: (error) => {
          this.helperService.error('An error occurred. Please try again.');
        }
      });
    }
  }
}
