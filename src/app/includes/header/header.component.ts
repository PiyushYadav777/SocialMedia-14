import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { NotificationsDialogComponent } from 'src/app/home/notifications-dialog/notifications-dialog.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(public authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  logout() {
    this.authService.logout();
  }
  
  openNotificationsDialog() {
    this.dialog.open(NotificationsDialogComponent, {
      width: '300px',
      // height: '500px',
      position: { right: '10px', top: '80px' }  
    });
  }
}
