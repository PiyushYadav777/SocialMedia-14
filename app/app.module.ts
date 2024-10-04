import { CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IncludesModule } from './includes/includes.module';
import { HttpClientModule } from '@angular/common/http';
import { TimeAgoPipe } from './Pipes/time-ago.pipe';
import { ToastrModule } from 'ngx-toastr';
import { NgImageSliderModule } from 'ng-image-slider';
import { AllFriendsListComponent } from './home/all-friends-list/all-friends-list.component';
import { AllSuggestionsComponent } from './home/all-suggestions/all-suggestions.component';
import { createCustomElement } from '@angular/elements';

@NgModule({
  declarations: [
    AppComponent,
    TimeAgoPipe
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    IncludesModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    NgImageSliderModule
  ],
  // entryComponents: [
  //   AllFriendsListComponent,
  //   AllSuggestionsComponent
  // ],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
//   constructor(private injector: Injector) {
//     const AllFriendsListElement = createCustomElement(AllFriendsListComponent, { injector });
//     const AllSuggestionsElement = createCustomElement(AllSuggestionsComponent, { injector });

//     customElements.define('all-friends-list', AllFriendsListElement);
//     customElements.define('all-suggestions', AllSuggestionsElement);
//   }

//   ngDoBootstrap() {}
}

