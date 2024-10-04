
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/Services/api.service';
import { HelperService } from 'src/app/Services/helper.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-friends-suggestions',
  templateUrl: './friends-suggestions.component.html',
  styleUrls: ['./friends-suggestions.component.scss']
})
export class FriendsSuggestionsComponent implements OnInit {
  users: any[] = [];
  limitedUsers: any[] = [];
  loading: boolean = true;
  userId!: number;
  showRequests: boolean = false;
  friendRequests: any[] = [];
  FILE_URL = environment.FILE_URL;
  maxSuggestions: number = 5;

  constructor(private apiService: ApiService,
    private helperService: HelperService) { }

  ngOnInit(): void {
    const userData = localStorage.getItem('User');
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      this.userId = parsedUserData.user_id;
      this.loadUsers();
    } else {
      this.helperService.error('User not logged in. Please log in again.')
    }
  }

  loadUsers(): void {
    const obj = {
      user_id: this.userId
    };
    this.apiService.postData('friendSuggestion', obj).subscribe({
      next: (response: any) => {
        if (response.status == '1') {
          this.users = response.details;
          this.limitedUsers = this.users.slice(0, this.maxSuggestions);
        } else {
          this.helperService.error(response.msg)
        }
        this.loading = false;
      },
      error: (error) => {
        this.helperService.error('Error fetching friend suggestions. Please try again.')
        this.loading = false;
      }
    });
  }

  sendFriendRequest(user: any): void {
    this.apiService.postData('sendFriendRequest', { sender_id: this.userId, receiver_id: Number(user.user_id) }).subscribe({
      next: (response: any) => {
        if (response.status == 'success') {
          this.helperService.success(`Friend request sent to ${user.first_name}`)
          this.loadUsers();
        } else {
          this.helperService.error(response.msg);
        }
      },
      error: () => {
        this.helperService.error('Error sending friend request. Please try again.');
      }
    });
  }

  loadFriendRequests(): void {
    const obj = {
      user_id: this.userId
    };

    this.apiService.postData('friends_request_list', obj).subscribe({
      next: (response: any) => {
        if (response.status === '1') {
          this.friendRequests = response.details;
        } else {
          this.helperService.error(response.msg)
          console.warn(response.msg);
        }
        this.loading = false;
      },
      error: (error) => {
        this.helperService.error('Error fetching friend requests. Please try again.')
        this.loading = false;
      }
    });
  }

  toggleView(): void {
    this.showRequests = !this.showRequests;
    if (this.showRequests) {
      this.loadFriendRequests();
    }
  }

  confirmRequest(request: any): void {
    const obj = {
      request_id: request.request_id,
      status: 'accepted'
    };
    this.apiService.postData('respondFriendRequest', obj).subscribe({
      next: (response: any) => {
        if (response.status === '1') {
          this.helperService.success(`Friend request from ${request.first_name} confirmed`)

          this.friendRequests = this.friendRequests.filter(r => r.request_id !== request.request_id);
        } else {
          this.helperService.error(response.msg)
        }
      },
      error: () => {
        this.helperService.error('Error confirming friend request. Please try again.')
      }
    });
  }


  cancelRequest(request: any): void {
    const obj = {
      request_id: request.request_id,
      status: 'rejected'
    };
    this.apiService.postData('respondFriendRequest', obj).subscribe({
      next: (response: any) => {
        if (response.status == '1') {
          this.helperService.success(`Friend request from ${request.first_name} cancelled`);
          this.friendRequests = this.friendRequests.filter(r => r.request_id !== request.request_id);
        } else {
          this.helperService.error(response.error);
        }
      },
      error: () => {
        this.helperService.error('Error cancelling friend request. Please try again.');
      }
    });
  }
}
