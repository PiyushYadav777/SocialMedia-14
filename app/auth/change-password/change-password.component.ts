import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';
import { AuthService } from 'src/app/Services/auth.service';
import { HelperService } from 'src/app/Services/helper.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: UntypedFormGroup;

  constructor(
    private fb: UntypedFormBuilder,
    private apiService: ApiService,
    private snackBar: MatSnackBar,
    private router: Router,
    private authService:AuthService,
    private helperService: HelperService
  ) {
    this.changePasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {}

  passwordMatchValidator(group: UntypedFormGroup): { [key: string]: boolean } | null {
    let newPassword = group.get('newPassword')?.value;
    let confirmPassword = group.get('confirmPassword')?.value;
    return newPassword == confirmPassword ? null : { mismatch: true };
  }

  changePassword(): void {
    if (this.changePasswordForm.valid) {
      let { email, oldPassword, newPassword } = this.changePasswordForm.value;
      this.apiService.postData('change_password', { email, old_password: oldPassword, new_password: newPassword, confirm_password: newPassword }).subscribe({
        next: (response) => {
          if (response.status == 1) {
            this.helperService.success(response.msg)
            this.authService.logout();
          } else {
          this.helperService.error(response.msg)
          }
        },
        error: (error) => {
          console.error('Change password failed', error);
          this.snackBar.open('An error occurred. Please try again.', 'Close', {
            duration: 5000,
            panelClass: ['error-snackbar']
          });
        }
      });
    }
  }
}
