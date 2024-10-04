import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';
import { AuthService } from 'src/app/Services/auth.service';
import { HelperService } from 'src/app/Services/helper.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  registrationForm!: UntypedFormGroup;
  errorMessage: string | null = null;

  constructor(private fb: UntypedFormBuilder,
    private router: Router,
    private apiService: ApiService,
  private helperService:HelperService) { }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      // confirmPassword: ['', Validators.required],
      // terms: [false, Validators.requiredTrue]
    },
      // { validator: this.passwordMatchValidator }
    );
  }

  // passwordMatchValidator: (form: FormGroup) => { [key: string]: boolean } | null = (form: FormGroup) => {
  //   const password = form.get('password')?.value;
  //   const confirmPassword = form.get('confirmPassword')?.value;
  //   if (password !== confirmPassword) {
  //     return { 'mismatch': true };
  //   }
  //   return null;
  // }


  onSubmit(): void {
    if (this.registrationForm.valid) {
      const { first_name, last_name, email, mobile, password } = this.registrationForm.value;
      this.apiService.postData('signup', { first_name, last_name, email, mobile, password }).subscribe({
        next: (response) => {
          this.helperService.success("Signup successful!");
          this.router.navigate(['/login']);
        },
        error: (error) => {
          if (error.status === 0) {
            this.errorMessage = error.error.msg;
          } else {
            this.errorMessage = 'An unexpected error occurred. Please try again later.';
          }
          console.error('Signup failed', error);
        }
      });
    } else {
      this.registrationForm.markAllAsTouched();
    }
  }
}
