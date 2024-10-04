import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';
import { HelperService } from 'src/app/Services/helper.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-all-suggestions',
  templateUrl: './all-suggestions.component.html',
  styleUrls: ['./all-suggestions.component.scss']
})
export class AllSuggestionsComponent implements OnInit {

  users: any[] = [];
  loading: boolean = false;
  userId!: number;
  FILE_URL = environment.FILE_URL;
  friendRequests: any[] = [];
  showRequests: boolean = false;
  totalCount: number = 0;
  pageSize: number = 8;
  currentPage: number = 0;
  searchQuery: string = '';

  constructor(private apiService: ApiService,
    private helperService: HelperService) { }

  ngOnInit(): void {
    const userData = localStorage.getItem('User');
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      this.userId = parsedUserData.user_id;
      this.loadUsers();
    }
  }

  loadUsers(pageIndex: number = this.currentPage, pageSize: number = this.pageSize, searchQuery: string = this.searchQuery): void {
    if (this.loading) return;
    this.loading = true;
    const obj = {
      user_id: this.userId,
      page: pageIndex,
      limit: pageSize,
      search_query: searchQuery
    };
    this.apiService.postData('friendSuggestion', obj).subscribe({
      next: (response: any) => {
        if (response.status == '1') {
          if (pageIndex == 0) {
            this.users = response.details;
          } else {
            this.users = [...this.users, ...response.details];
          }
          this.totalCount = response.total_count;
          this.currentPage = pageIndex + 1; 
        } else {
          this.helperService.error(response.msg);
        }
        this.loading = false;
      },
      error: () => {
        this.helperService.error('Error fetching friend suggestions. Please try again.');
        this.loading = false;
      }
    });
  }

  loadMore(): void {
    this.loadUsers(this.currentPage, this.pageSize, this.searchQuery);
  }
  
  onSearchChange(): void {
    this.currentPage = 0; 
    this.users = []; 
    this.loadUsers(0, this.pageSize, this.searchQuery);
  }

  sendFriendRequest(user: any): void {
    this.apiService.postData('sendFriendRequest', { sender_id: this.userId, receiver_id: Number(user.user_id) }).subscribe({
      next: (response: any) => {
        if (response.status === 'success') {
          this.helperService.success(response.msg);
          this.loadUsers(); 
        } else {
          this.helperService.info(response.msg);
        }
      },
      error: () => {
        this.helperService.info('Error sending friend request. Please try again.');
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
          this.helperService.error(response.msg);
        }
        this.loading = false;
      },
      error: () => {
        this.helperService.error('Error fetching friend requests. Please try again.');
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
          this.helperService.success(`Friend request from ${request.first_name} confirmed`);
          this.friendRequests = this.friendRequests.filter(r => r.request_id !== request.request_id);
        } else {
          this.helperService.success(response.msg);
        }
      },
      error: () => {
        this.helperService.error('Error confirming friend request. Please try again.');
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
        if (response.status === '1') {
          this.helperService.success(`Friend request from ${request.first_name} cancelled`);
          this.friendRequests = this.friendRequests.filter(r => r.request_id !== request.request_id);
        } else {
          this.helperService.error(response.msg);
        }
      },
      error: () => {
        this.helperService.error('Error cancelling friend request. Please try again.');
      }
    });
  }
}


