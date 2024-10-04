import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  notifications: any[] = [];
  userId!: number;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    const userData = localStorage.getItem('User');
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      this.userId = parsedUserData.user_id;
    } 
    this.loadNotifications();
  }

  loadNotifications(): void {
    const obj = {
      user_id: this.userId
    };
    this.apiService.postData('get_notifications', obj).subscribe({
      next: (response: any) => {
        if (response.status == '1') {
          this.notifications = response.msg;
        } else {
          console.error(response.msg);
        }
      },
      error: () => {
        console.error('Error fetching notifications. Please try again.');
      }
    });
  }
}
