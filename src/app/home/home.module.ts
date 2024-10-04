import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { FeedsComponent } from './feeds/feeds.component';
import { FriendsSuggestionsComponent } from './friends-suggestions/friends-suggestions.component';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FriendsListComponent } from './friends-list/friends-list.component';
import { AddPostComponent } from './add-post/add-post.component';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { EditPostDialogComponent } from './edit-post-dialog/edit-post-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PostDetailsComponent } from './post-details/post-details.component';
import { LikeComponent } from './like/like.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { EditCommentDialogComponent } from './edit-comment-dialog/edit-comment-dialog.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AllSuggestionsComponent } from './all-suggestions/all-suggestions.component';
import { AllFriendsListComponent } from './all-friends-list/all-friends-list.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NotificationsComponent } from './notifications/notifications.component';
import { NotificationsDialogComponent } from './notifications-dialog/notifications-dialog.component';
import { FriendProfileComponent } from './friend-profile/friend-profile.component';
import { FriendProfilePageComponent } from './friend-profile-page/friend-profile-page.component';
import { StoriesComponent } from './stories/stories.component';
import { ViewStoryComponent } from './view-story/view-story.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { InterestsComponent } from './interests/interests.component';
import { ViewStoryViewersComponent } from './view-story-viewers/view-story-viewers.component';
// import { MatBottomSheetModule } from '@angular/material/bottom-sheet';


@NgModule({
  declarations: [
    HomeComponent,
    FeedsComponent,
    FriendsSuggestionsComponent,
    FriendsListComponent,
    AddPostComponent,
    ConfirmDialogComponent,
    EditPostDialogComponent,
    PostDetailsComponent,
    LikeComponent,
    EditCommentDialogComponent,
    AllSuggestionsComponent,
    AllFriendsListComponent,
    NotificationsComponent,
    NotificationsDialogComponent,
    FriendProfileComponent,
    FriendProfilePageComponent,
    StoriesComponent,
    ViewStoryComponent,
    InterestsComponent,
    ViewStoryViewersComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    MatCardModule,
    MatListModule,
    MatFormFieldModule,
    FormsModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatOptionModule,
    MatSelectModule,
    MatMenuModule,
    MatDialogModule,
    ScrollingModule,
    MatPaginatorModule,
    InfiniteScrollModule,
    MatProgressBarModule,
    MdbCarouselModule,
    // MatBottomSheetModule

  ]
})
export class HomeModule { }
