import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';
import { HelperService } from 'src/app/Services/helper.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-all-friends-list',
  templateUrl: './all-friends-list.component.html',
  styleUrls: ['./all-friends-list.component.scss']
})
export class AllFriendsListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  friends: any[] = [];
  loading: boolean = true;
  userId!: number;
  FILE_URL = environment.FILE_URL;
  totalCount: number = 0;
  searchQuery: string = '';
  currentPage: number = 0;
  pageSize: number = 8;

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
      this.loadFriends();
    }
  }

  loadFriends(pageIndex: number = 0, pageSize: number = this.pageSize, searchQuery: string = this.searchQuery): void {
    this.loading = true;

    const obj = {
      user_id: this.userId,
      page: pageIndex,
      limit: pageSize,
      search_query: searchQuery
    };
    this.apiService.postData('friends_list', obj).subscribe({
      next: (response: any) => {
        if (response.status == '1') {
          if (pageIndex == 0) {
            this.friends = response.details;
          } else {
            this.friends = [...this.friends, ...response.details];
          }
          this.totalCount = response.total_count;
        } else {
          this.helperService.error(response.msg);
        }
        this.loading = false;
      },
      error: (error) => {
        this.helperService.error('Error fetching friends list. Please try again.');
        this.loading = false;
      }
    });
  }

  loadMore(): void {
    this.currentPage++;
    this.loadFriends(this.currentPage, this.pageSize, this.searchQuery);
  }

  onPageChange(event: any): void {
    this.loadFriends(event.pageIndex, event.pageSize, this.searchQuery);
  }

  onSearchChange(): void {
    this.paginator.pageIndex = 0;
    this.loadFriends(0, this.pageSize, this.searchQuery);
  }

  openProfile(friendId: any): void {
    this.router.navigate(['/home/friendprofile', friendId]);
  }

  openConversation(friendId: any): void {
    console.log('Opening conversation with friend ID:', friendId);
    if (friendId) {
      this.router.navigate(['/messages/conversations'], { queryParams: { userId: friendId } });
    } else {
      console.error('Friend ID is undefined.');
    }
  }

}
