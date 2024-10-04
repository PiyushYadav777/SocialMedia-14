import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-comment-dialog',
  templateUrl: './edit-comment-dialog.component.html',
  styleUrls: ['./edit-comment-dialog.component.scss']
})
export class EditCommentDialogComponent {
  commentText: string;

  constructor(
    public dialogRef: MatDialogRef<EditCommentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {    
    this.commentText = data.comment.comment_text;
  }

  ngOnInIt(){ }

  onSave(): void {
    this.dialogRef.close({
      comment_id: this.data.comment.id,
      comment_text: this.commentText
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
