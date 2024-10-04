import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';
import { HelperService } from 'src/app/Services/helper.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: any = {};

  userData: any = [];
  posts: any[] = [];
  FILE_URL = environment.FILE_URL;
  userId!: number;
  postId!: number;
  pageSize: number = 20;
  totalCount: number = 0;
  constructor(
    private apiService: ApiService,
    private helperService: HelperService,
    private router: Router
  ) {
    this.userData = localStorage.getItem('User')
    this.userData = JSON.parse(this.userData)
  }

  ngOnInit(): void {
    const userData = localStorage.getItem('User');
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      this.userId = parsedUserData.user_id;
    }
    this.loadUserProfile();
  }

  viewPostDetails(postId: number): void {
    this.router.navigate(['/home/post-details', postId]);
  }

  loadUserProfile(): void {
    let postObj = {
      user_id: this.userData.user_id
    }
    this.apiService.postData('profile_get', postObj).subscribe({
      next: (response) => {
        if (response.status == 1) {
          this.user = response.details;
          // this.posts = response.post;
          this.totalCount = response.total_count;

          this.loadUserTimeline();
        } else {
          this.helperService.error(response.msg)
        }
      }
    });
  }

  loadUserTimeline(pageIndex: number = 0, pageSize: number = this.pageSize): void {
    let obj = {
      user_id: this.userId,
      page: pageIndex,
      limit: pageSize
    };
    this.apiService.postData('get_user_timeline', obj).subscribe({
      next: (response) => {
        if (response.status == 1) {
          this.posts = response.post;
        } else {
          this.helperService.error(response.msg);
        }
      }
    });
  }

  // onPageChange(event: any): void {
  //   this.loadUserTimeline(event.pageIndex, event.pageSize);
  // }
}