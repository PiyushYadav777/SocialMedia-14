import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';
import { HelperService } from 'src/app/Services/helper.service';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss']
})
export class StoriesComponent implements OnInit {

  storyContent: string = '';
  imagePreview: string | ArrayBuffer | null = null;
  videoPreview: string | ArrayBuffer | null = null;
  imageFile: File | null = null;
  videoFile: File | null = null;
  userId!: number;
  titleOptions: string[] = ['study', 'lunch', 'work', 'movie', 'chilling', 'travelling', 'Fitness', 'Shopping', 'Sports'];
  selectedTitle: string = '';
  expiresIn: number = 4;

  constructor(
    private apiService: ApiService,
    private helperService: HelperService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const userData = localStorage.getItem('User');
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      this.userId = parsedUserData.user_id;
    }
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

  createStory(): void {
    if (!this.storyContent) {
      this.helperService.warning('Story content is required');
      return;
    }

    if (!this.userId) {
      this.helperService.error('User ID is not available. Please log in again.');
      return;
    }

    const formData = new FormData();
    formData.append('desc', this.storyContent);
    formData.append('user_id', this.userId.toString());
    formData.append('title', this.selectedTitle);
    formData.append('expires_in', this.expiresIn.toString());

    if (this.imageFile) {
      formData.append('img', this.imageFile, this.imageFile.name);
    }
    if (this.videoFile) {
      formData.append('video', this.videoFile, this.videoFile.name);
    }

    this.apiService.postData('add_stories', formData, true).subscribe({
      next: (response: any) => {
        if (response.status == '1') {
          this.helperService.success(response.msg);
          this.router.navigate(['/home']);
          this.resetForm();
        } else {
          this.helperService.error(response.msg);
        }
      },
      error: () => {
        this.helperService.error('Error adding story. Please try again.');
      }
    });
  }

  resetForm(): void {
    this.storyContent = '';
    this.imageFile = null;
    this.videoFile = null;
    this.imagePreview = null;
    this.videoPreview = null;
    this.selectedTitle = '';
  }
}

