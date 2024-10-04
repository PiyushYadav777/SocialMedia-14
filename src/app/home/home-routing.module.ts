import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { FriendsListComponent } from './friends-list/friends-list.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { AllSuggestionsComponent } from './all-suggestions/all-suggestions.component';
import { AllFriendsListComponent } from './all-friends-list/all-friends-list.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { FriendProfileComponent } from './friend-profile/friend-profile.component';
import { StoriesComponent } from './stories/stories.component';
import { ViewStoryComponent } from './view-story/view-story.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'friends-list', component: FriendsListComponent
  },
  {
    path: 'post-details/:id', component: PostDetailsComponent
  },
  {
    path: 'all-suggestions', component: AllSuggestionsComponent
  },
  {
    path: 'all-firends-list', component: AllFriendsListComponent
  },
  {
    path: 'notifications', component: NotificationsComponent
  },
  {
    path: 'friendprofile/:id', component: FriendProfileComponent
  },
  {
    path: 'add-story', component: StoriesComponent
  },
  {
    path: 'view-stories', component: ViewStoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
