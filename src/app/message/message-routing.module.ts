import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessageComponent } from './message.component';
import { ConversationsComponent } from './conversations/conversations.component';

const routes: Routes = [

  {
    path: '',
    component: MessageComponent,
    children: [
        {
            path: 'conversations/:userId',
            component: ConversationsComponent
        }
      ]
  }    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessageRoutingModule { }
