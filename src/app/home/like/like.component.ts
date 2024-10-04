import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';
import { HelperService } from 'src/app/Services/helper.service';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.scss']
})
export class LikeComponent implements OnInit {
  @Input() postId!: number;
  @Input() userId!: number;
  @Input() isLiked!: boolean;
  liked: boolean = false;

  constructor(private apiService: ApiService,
    private helperService: HelperService
  ) { }

  ngOnInit(): void {
    this.liked = this.isLiked;
   }

  likePost(): void {
    let data = { user_id: this.userId, post_id: this.postId };
    this.apiService.postData('like_post', data).subscribe({
      next: (response: any) => {
        if (response.status == '1') {
          this.liked = true;
          this.notifyUser(response);
        } else {
        }
      },
      error: () => {
        this.helperService.error('Error liking post. Please try again.')
      }
    });
  }

  dislikePost(): void {
    let data = { user_id: this.userId, post_id: this.postId };
    this.apiService.postData('remove_like', data).subscribe({
      next: (response: any) => {
        if (response.status == '1') {
          this.liked = false;
        } else {
        }
      },
      error: () => {
        this.helperService.error('Error removing like. Please try again.')
      }
    });
  }

  private notifyUser(response: any): void {
    console.log('Notification triggered:', response)
  }
}
