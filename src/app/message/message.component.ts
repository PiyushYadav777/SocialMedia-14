import { Component, OnInit } from '@angular/core';
import { ApiService } from '../Services/api.service';
import { HelperService } from '../Services/helper.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  messages: any[] = [];
  userId!: number;
  FILE_URL = environment.FILE_URL;
  selectedUserId?: number;

  constructor(private apiService: ApiService, 
    private helperService: HelperService,
  private router: Router) { }

  ngOnInit(): void {
    const userData = localStorage.getItem('User');
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      this.userId = parsedUserData.user_id;
      this.loadMessages();
    }
  }

  loadMessages(): void {
    const obj = { user_id: this.userId };

    this.apiService.postData('view_message_list', obj).subscribe({
      next: (response: any) => {
        if (response.status == '1') {
          this.messages = response.details;
        } else {
          this.helperService.error(response.msg);
        }
      },
      error: (error) => {
        this.helperService.error('Error fetching messages. Please try again.');
      }
    });
  }

  openMessage(otherUserId: number): void {
    this.selectedUserId = otherUserId;
    this.router.navigate(['/messages/conversations', otherUserId]); 
  }
}
