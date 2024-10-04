import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';
import { HelperService } from 'src/app/Services/helper.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {

  newPostContent: string = '';
  imagePreview: string | ArrayBuffer | null = null;
  videoPreview: string | ArrayBuffer | null = null;
  imageFile: File | null = null;
  videoFile: File | null = null;
  userId!: number;
  selectedCategory: string = '';
  categoryOptions: { id: number, name: string }[] = []; 

  constructor(private apiService: ApiService,
    private helperService: HelperService,
    private router:Router
  ) { }

  ngOnInit(): void {
    const userData = localStorage.getItem('User');
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      this.userId = parsedUserData.user_id;
      this.loadCategories();
    }
  }

  loadCategories(): void {
    this.apiService.getData('view_all_categories').subscribe({
      next: (response: any) => {
        if (response.status == '1') {
          this.categoryOptions = response.data; 
        } else {
          this.helperService.error(response.msg);
        }
      },
      error: () => {
        this.helperService.error('Error fetching categories. Please try again.');
      }
    });
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

  createPost(): void {
    if (!this.newPostContent) {
      this.helperService.warning('Post content is required');
      return;
    }

    if (!this.userId) {
      this.helperService.error('User ID is not available. Please log in again.');
      return;
    }

    const formData = new FormData();
    formData.append('desc', this.newPostContent);
    formData.append('user_id', this.userId.toString());
    formData.append('category_id', this.selectedCategory);
    if (this.imageFile) {
      formData.append('img', this.imageFile, this.imageFile.name);
    }
    if (this.videoFile) {
      formData.append('video', this.videoFile, this.videoFile.name);
    }

    this.apiService.postData('add_posts', formData, true).subscribe({
      next: (response: any) => {
        if (response.status == '1') {
          this.helperService.success(response.msg);
          this.newPostContent = '';
          this.imageFile = null;
          this.videoFile = null;
          this.imagePreview = null;
          this.videoPreview = null;

          this.refreshPosts();

        } else {
          this.helperService.error(response.msg);
        }
      },
      error: () => {
        this.helperService.error('Error adding post. Please try again.');
      }
    });
  }

  refreshPosts(): void {
    this.helperService.refreshPosts();
    this.newPostContent = '';
    this.selectedCategory= '';
    this.imageFile = null;
    this.videoFile = null;
    this.imagePreview = null;
    this.videoPreview = null;
  }
}
