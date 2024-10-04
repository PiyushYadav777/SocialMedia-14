import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/Services/api.service';
import { HelperService } from 'src/app/Services/helper.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.scss']
})
export class FriendsListComponent implements OnInit {

  friends: any[] = [];
  loading: boolean = true;
  userId!: number;
  FILE_URL = environment.FILE_URL;
  limitedFriends: any[] = [];
  maxFriends: number = 5;


  constructor(private apiService: ApiService,
    private helperService: HelperService
  ) { }

  ngOnInit(): void {
    const userData = localStorage.getItem('User');
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      this.userId = parsedUserData.user_id;
      this.loadFriends();
    }
  }

  loadFriends(): void {
    const obj = { user_id: this.userId };
    this.apiService.postData('friends_list', obj).subscribe({
      next: (response: any) => {
        if (response.status === '1') {
          this.friends = response.details;
          this.limitedFriends = this.friends.slice(0, this.maxFriends);
        } else {
          this.helperService.error(response.msg);
        }
        this.loading = false;
      },
      error: (error) => {
        this.helperService.info('Error fetching friends list. Please try again.');
        this.loading = false;
      }
    });
  }
}
