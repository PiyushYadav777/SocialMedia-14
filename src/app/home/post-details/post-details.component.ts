import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { EditCommentDialogComponent } from '../edit-comment-dialog/edit-comment-dialog.component';
import { HelperService } from 'src/app/Services/helper.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {
  post: any;
  FILE_URL = environment.FILE_URL;
  comments: any[] = [];
  postId: any;
  userId!: number;
  commentText: string = '';
  isInputVisible: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private helperService: HelperService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    const userData = localStorage.getItem('User');
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      this.userId = parsedUserData.user_id;
    }
    this.postId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.postId) {
      this.getPostDetails(this.postId, this.userId);
      this.getComments(this.postId);
      this.helperService.refreshComments$.subscribe(() => {
        this.getComments(this.postId);
      });
    }
  }

  getPostDetails(postId: number, userId: number): void {
    this.apiService.postData('post_details', { post_id: postId, user_id: userId }).subscribe({
      next: (response: any) => {
        if (response.status == '1') {
          this.post = response.details;
        } else {
          this.helperService.error(response.msg)
        }
      },
      error: () => {
        this.helperService.error('Error fetching post details. Please try again.')
      }
    });
  }

  getComments(postId: number): void {
    this.apiService.postData('view_all_comment', { post_id: postId }).subscribe({
      next: (response: any) => {
        if (response.status === '1') {
          this.comments = response.details;
        } else {
          this.helperService.error(response.msg)
        }
      },
      error: () => {
        this.helperService.error('Error fetching comments. Please try again.')
      }
    });
  }

  toggleInput(): void {
    this.isInputVisible = !this.isInputVisible;
    if (!this.isInputVisible) {
      this.commentText = '';
    }
  }

  addComment(): void {
    if (this.commentText.trim() == '') {
      this.helperService.warning('Comment cannot be empty')
      return;
    }

    const data = {
      post_id: this.postId,
      user_id: this.userId,
      comment_text: this.commentText
    };

    this.apiService.postData('add_comments', data).subscribe({
      next: (response: any) => {
        if (response.status == '1') {
          this.helperService.success('Comment added!')
          this.commentText = '';
          this.helperService.refreshComments();
        } else {
          this.helperService.error(response.msg)
        }
      },
      error: () => {
        this.helperService.error('Error adding comment. Please try again.')
      }
    });
  }

  editComment(comment: any): void {
    const dialogRef = this.dialog.open(EditCommentDialogComponent, {
      width: '250px',
      data: { comment }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateComment(result);
      }
    });
  }

  updateComment(updatedComment: any): void {
    this.apiService.postData('update_comments', updatedComment).subscribe({
      next: (response: any) => {
        if (response.status == '1') {
          this.helperService.success(response.msg)
          this.getComments(this.postId);
        } else {
          this.helperService.error(response.msg)
        }
      },
      error: () => {
        this.helperService.error('Error updating comment. Please try again.')
      }
    });
  }

  confirmDeleteComment(commentId: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      // width: '250px',
      data: { message: 'Are you sure you want to delete this comment?' }
    });
    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.deleteComment(commentId);
      }
    });
  }

  deleteComment(commentId: number): void {
    this.apiService.postData('delete_comments', { comment_id: commentId }).subscribe({
      next: (response: any) => {
        if (response.status === '1') {
          this.helperService.success(response.msg)
          this.getComments(this.postId);
        } else {
          this.helperService.error(response.msg)
        }
      },
      error: () => {
        this.helperService.error('Error deleting comment. Please try again.')
      }
    });
  }
}
