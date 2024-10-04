import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-conversations',
  templateUrl: './conversations.component.html',
  styleUrls: ['./conversations.component.scss']
})
export class ConversationsComponent implements OnInit {
  otherUserId!: number;
  messages: any[] = [];
  newMessage: string = '';
  userId: any;
  selectedMessage: any;

  constructor(private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
    private dialog: MatDialog) { }

 
  ngOnInit(): void {
    const userData = localStorage.getItem('User');
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      this.userId = parsedUserData.user_id;
    }
    this.route.params.subscribe(params => {
      this.otherUserId = Number(params['userId']);
      console.log('Received userId from route params:', this.otherUserId);
      if (!isNaN(this.otherUserId)) {
        this.loadMessages();
      } else {
        console.error('No valid userId found in route params.');
      }
    });
  }

  loadMessages(): void {
    const userData = localStorage.getItem('User');
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      let obj = {
        user_id: parsedUserData.user_id,
        other_user_id: this.otherUserId
      };
      this.apiService.postData('get_message', obj).subscribe({
        next: (response: any) => {
          if (response.status == '1') {
            this.messages = response.data;
          } else {
            console.error(response.msg);
          }
        },
        error: (error) => {
          console.error('Error fetching messages. Please try again.');
        }
      });
    }
  }

  sendMessage(): void {
    const userData = localStorage.getItem('User');
    if (userData && this.newMessage.trim()) {
      const parsedUserData = JSON.parse(userData);
      let obj = {
        sender_id: parsedUserData.user_id,
        receiver_id: this.otherUserId,
        message: this.newMessage
      };

      this.apiService.postData('send_message', obj).subscribe({
        next: (response: any) => {
          if (response.status == '1') {
            this.messages.push({ message: this.newMessage, sender_first_name: 'You' });
            this.newMessage = '';
            this.loadMessages();
          } else {
            console.error(response.msg);
          }
        },
        error: (error) => {
          console.error('Error sending message. Please try again.');
        }
      });
    }
  }

  closeConversation(): void {
    this.router.navigate(['/messages']);
  }

  selectMessage(message: any): void {
    this.selectedMessage = message;
  }

  openDeleteDialog(messageId: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: 'Are you sure you want to delete this message?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteMessage(messageId);
      }
    });
  }

  deleteMessage(messageId: number): void {
    const userData = localStorage.getItem('User');
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      let obj = {
        message_id: messageId,
        user_id: parsedUserData.user_id
      };

      this.apiService.postData('delete_message', obj).subscribe({
        next: (response: any) => {
          if (response.status == '1') {
            this.messages = this.messages.filter(msg => msg.id !== messageId);
          } else {
            console.error(response.msg);
          }
        },
      });
    }
  }
}
