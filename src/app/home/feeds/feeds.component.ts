import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { EditPostDialogComponent } from '../edit-post-dialog/edit-post-dialog.component';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/Services/helper.service';
import { Subscription } from 'rxjs';
import { CategoryService } from 'src/app/Services/category.service';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.scss']
})
export class FeedsComponent implements OnInit {
  posts: any[] = [];
  loading: boolean = true;
  displayedPosts: any[] = [];
  totalPostsCount: number = 0;
  postsPerPage: number = 5;
  currentPage: number = 1;
  FILE_URL = environment.FILE_URL;
  userId!: number;
  postId!: number;
  isLiked!: boolean;
  liked: boolean = false;

  private subscriptions: Subscription = new Subscription();

  constructor(private apiService: ApiService,
    private dialog: MatDialog,
    private router: Router,
    private helperService: HelperService,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    const userData = localStorage.getItem('User');
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      this.userId = parsedUserData.user_id;
      this.loadPosts(this.userId);
      this.subscriptions.add(
        this.helperService.refreshPosts$.subscribe(() => {
          this.loadPosts(this.userId);
        }));

      this.subscriptions.add(
        this.categoryService.selectedCategory$.subscribe(categoryId => {
          if (categoryId) {
            this.loadPostsByCategory(categoryId);
          } else {
            this.loadPosts(this.userId);
          }
        })
      );
    }
    this.liked = this.isLiked;
  }

  loadPosts(userId: number, categoryId = ''): void {
    let obj = { user_id: userId, category_id: categoryId };
    this.apiService.postData('post_list', obj, true).subscribe({
      next: (response: any) => {
        if (response.status == '1') {
          this.posts = response.data;
          this.totalPostsCount = response.total_count;
          this.currentPage = 1;
          this.displayedPosts = [];
          this.displayedPosts = this.posts.slice(0, this.postsPerPage);
          this.canLoadMore;
        }
        else {
          this.helperService.error(response.msg);
        }
        this.loading = false;
      },
      error: () => {
        this.helperService.error('Error fetching posts. Please try again.');
        this.loading = false;
      }
    });
  }

  loadMore(): void {
    let start = this.currentPage * this.postsPerPage;
    let end = start + this.postsPerPage;

    if (start < this.posts.length) {
      this.displayedPosts = this.displayedPosts.concat(this.posts.slice(start, end));
      this.currentPage++;
    }
  }

  get canLoadMore(): boolean {
    return this.displayedPosts.length < this.totalPostsCount;
  }

  loadPostsByCategory(categoryId: number): void {
    let requestData = { user_id: this.userId, category_id: categoryId };
    this.apiService.postData('post_list', requestData).subscribe({
      next: (response: any) => {
        if (response.status == '1') {
          this.posts = response.data;
          this.displayedPosts = this.posts;
        } else {
          this.helperService.error(response.msg);
        }
      },
      error: () => {
        this.helperService.error('Error fetching posts. Please try again.');
      }
    });
  }

  openEditDialog(post: any): void {
    const dialogRef = this.dialog.open(EditPostDialogComponent, {
      width: '500px',
      data: post
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Dialog result:', result);
        console.log('UserId:', this.userId);
        this.loadPosts(this.userId);
      }
    });
  }

  confirmDelete(post: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { message: 'Are you sure you want to delete this post?' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deletePost(post);
      }
    });
  }

  deletePost(post: any): void {
    let obj = {
      post_id: post.id,
      user_id: this.userId
    };
    this.apiService.postData('delete_post', obj).subscribe({
      next: (response: any) => {
        if (response.status == '1') {
          this.helperService.success(response.msg);
          this.posts = this.posts.filter(p => p.id !== post.id);
        } else {
          this.helperService.error(response.msg);
        }
      },
      error: () => {
        this.helperService.error('Error deleting post. Please try again.')
      }
    });
  }

  viewPostDetails(postId: number): void {
    this.router.navigate(['/home/post-details', postId]);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}



