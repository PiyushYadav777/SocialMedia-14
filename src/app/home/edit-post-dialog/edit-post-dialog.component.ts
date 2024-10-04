import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/Services/api.service';
import { HelperService } from 'src/app/Services/helper.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-post-dialog',
  templateUrl: './edit-post-dialog.component.html',
  styleUrls: ['./edit-post-dialog.component.scss']
})
export class EditPostDialogComponent {
  post: any;
  imagePreview: string | ArrayBuffer | null = null;
  videoPreview: string | ArrayBuffer | null = null;
  imageFile: File | null = null;
  videoFile: File | null = null;
  FILE_URL = environment.FILE_URL;
  titleOptions: string[] = ['study', 'lunch', 'work', 'movie', 'chilling', 'travelling', 'Fitness', 'Shopping', 'Sports'];
  userId: any;

  constructor(
    public dialogRef: MatDialogRef<EditPostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: ApiService,
    private snackBar: MatSnackBar,
    private helperService: HelperService
  ) {
    this.post = { ...data };
    this.loadExistingMedia();
  }

  ngOnInit(): void {
    const userData = localStorage.getItem('User');
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      this.userId = parsedUserData.user_id;
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  onImageChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.imageFile = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(this.imageFile);
    }
  }

  onVideoChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.videoFile = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.videoPreview = reader.result;
      };
      reader.readAsDataURL(this.videoFile);
    }
  }

  removeImage(): void {
    this.imageFile = null;
    this.imagePreview = null;
    this.post.img = null;
  }

  removeVideo(): void {
    this.videoFile = null;
    this.videoPreview = null;
    this.post.video = null;
  }

  editPost(): void {
    const formData = new FormData();
    formData.append('post_id', this.post.id);
    formData.append('user_id', this.userId);
    formData.append('title', this.post.title);
    formData.append('desc', this.post.desc);

    if (this.imageFile) {
      formData.append('img', this.imageFile, this.imageFile.name);
    }
    if (this.videoFile) {
      formData.append('video', this.videoFile, this.videoFile.name);
    }

    this.apiService.postData('edit_post', formData, true).subscribe({
      next: (response: any) => {
        if (response.status === '1') {
          this.helperService.success(response.msg);
          this.dialogRef.close(true);
        } else {
          this.helperService.error(response.msg);
        }
      },
      error: () => {
        this.helperService.error('Error updating post. Please try again.');
      }
    });
  }

  private loadExistingMedia(): void {
    if (this.post.img) {
      this.imagePreview = `${this.FILE_URL}${this.post.img}`;
    }
    if (this.post.video) {
      this.videoPreview = `${this.FILE_URL}${this.post.video}`;
    }
  }
}
