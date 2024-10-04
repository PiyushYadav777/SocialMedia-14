import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';
import { HelperService } from 'src/app/Services/helper.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-friend-profile-page',
  templateUrl: './friend-profile-page.component.html',
  styleUrls: ['./friend-profile-page.component.scss']
})
export class FriendProfilePageComponent implements OnInit {

  user: any = {};
  posts: any[] = [];
  FILE_URL = environment.FILE_URL;
  friendId : any;
  pageSize: number = 10;

  constructor(
    private apiService: ApiService,
    private helperService: HelperService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.friendId = this.route.snapshot.paramMap.get('id');
    console.log(this.friendId,"PPPPPPPPPPPPPPP");
    
    // this.loadFriendProfile();
  }

  loadFriendProfile(): void {
    let obj = {
      user_id: this.friendId
    };
    this.apiService.postData('profile_get', obj).subscribe({
      next: (response) => {
        if (response.status == 1) {
          this.user = response.details;
          this.loadFriendTimeline();
        } else {
          this.helperService.error(response.msg);
        }
      }
    });
  }

  loadFriendTimeline(pageIndex: number = 0, pageSize: number = this.pageSize): void {
    let obj = {
      user_id: this.friendId,
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

  viewPostDetails(postId: number): void {
    this.router.navigate(['/home/post-details', postId]);
  }
}
