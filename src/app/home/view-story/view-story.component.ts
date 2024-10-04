import { Component, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { NgImageSliderComponent } from 'ng-image-slider';
import { ApiService } from 'src/app/Services/api.service';
import { HelperService } from 'src/app/Services/helper.service';
import { environment } from 'src/environments/environment';
// import { ViewStoryViewersComponent } from '../view-story-viewers/view-story-viewers.component';

@Component({
  selector: 'app-view-story',
  templateUrl: './view-story.component.html',
  styleUrls: ['./view-story.component.scss']
})
export class ViewStoryComponent implements OnInit {
  stories: any[] = [];
  loading: boolean = true;
  FILE_URL = environment.FILE_URL;
  userId!: number;
  selectedStory: any = null;
  popupTimeout: any;
  currentIndex: number = 0;
  storyInterval: any;

  constructor(private apiService: ApiService, private helperService: HelperService,
    // private bottomSheet: MatBottomSheet
  ) { }

  ngOnInit(): void {
    const userData = localStorage.getItem('User');
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      this.userId = parsedUserData.user_id;
      this.loadStories();
    } else {
      this.helperService.error('User data not found.');
    }
  }

  loadStories(): void {
    let obj = {
      user_id: this.userId
    };
    this.apiService.postData('view_story', obj).subscribe({
      next: (response: any) => {
        if (response.status == '1') {
          this.stories = response.data;
        } 
        this.loading = false;
      },
      error: () => {
        this.helperService.error('Error fetching stories. Please try again.');
        this.loading = false;
      }
    });
  }

  openPopup(story: any): void {
    this.selectedStory = story.stories;
    this.currentIndex = 0;
    this.startStoryCycle();

  //   // Call API to mark story as viewed
  //   this.apiService.postData('user_view_story', {
  //     story_id: story.id,
  //     viewer_id: this.userId
  // }).subscribe({
  //     next: () => { },
  //     error: (err) => {
  //         this.helperService.error('Error marking story as viewed');
  //     }
  // });
  }

//   openViewers(storyId: number): void {
//     this.apiService.getData(`user_view_story/${storyId}`).subscribe(viewers => {
//         this.bottomSheet.open(ViewStoryViewersComponent, {
//             data: viewers 
//         });
//     });
// }


  startStoryCycle(): void {
    this.showCurrentStory();

    this.storyInterval = setInterval(() => {
      this.currentIndex++;
      if (this.currentIndex >= this.selectedStory.length) {
        this.closePopup();
      } else {
        this.showCurrentStory();
      }
    }, 5000); 
  }

  showCurrentStory(): void {  }

  closePopup(): void {
    this.selectedStory = null;
    clearInterval(this.storyInterval); 
  }

  ngOnDestroy(): void {
    clearInterval(this.storyInterval); 
  }

  getCurrentStory() {
    return this.selectedStory ? this.selectedStory : [];
  }
  
  getUserName(): string {
    if (this.selectedStory && this.selectedStory.length > 0) {
      const currentStory = this.selectedStory[this.currentIndex];
      const user = this.stories.find(story => story.stories.includes(currentStory));
      return user ? `${user.first_name} ${user.last_name}` : '';
    }
    return '';
  }
}






