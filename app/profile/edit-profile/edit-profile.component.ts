import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';
import { HelperService } from 'src/app/Services/helper.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  @ViewChild('fileInput')
  fileInput!: ElementRef;

  editProfileForm: UntypedFormGroup;
  user: any = {};
  userData: any = [];
  FILE_URL = environment.FILE_URL;
  profileImgFile: File | null = null;

  constructor(
    private fb: UntypedFormBuilder,
    private apiService: ApiService,
    private router: Router,
    private helperService: HelperService,
    private snackBar: MatSnackBar
  ) {
    this.userData = localStorage.getItem('User');
    this.userData = JSON.parse(this.userData);
    this.editProfileForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      country: [''],
      state: [''],
      city: [''],
      gender: [''],
      mobile: ['']
    });
  }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    let postObj = {
      user_id: this.userData.user_id
    };
    this.apiService.postData('profile_get', postObj).subscribe({
      next: (response) => {
        if (response.status === 1) {
          this.user = response.details;
          this.editProfileForm.patchValue(this.user);
        } else {
          this.helperService.error(response.message);
        }
      },
      error: (error) => {
        console.error('failed', error);
      }
    });
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.profileImgFile = event.target.files[0];
    }
  }
  
  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  onSubmit(): void {
    if (this.editProfileForm.invalid) {
      return;
    }  
  
    let updatedData = this.editProfileForm.value;
    updatedData.user_id = this.userData.user_id;  
    
    let form = new FormData();
    for (const key in updatedData) {
      if (updatedData.hasOwnProperty(key)) {
        form.append(key, updatedData[key]);
      }
    }
    
    if (this.profileImgFile) {
      form.append('profile_img', this.profileImgFile);
    }    
  
    this.apiService.postData('update_profile', form, true).subscribe({
      next: (response) => {
        if (response.status == 1) {
          this.helperService.success(response.msg);
          this.router.navigate(['/profile/user-profile']);
        } else {
          this.helperService.error(response.msg);
        }
      },
      error: (error) => {
        console.error('failed', error);
      }
    });
  }
}
