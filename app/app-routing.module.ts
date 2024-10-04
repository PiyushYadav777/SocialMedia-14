import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from "./includes/main/main.component";
import { AuthGuard } from './auth.guard';
const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
      },
      {
        path: 'home',
        canActivate: [AuthGuard],
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'profile',
        canActivate: [AuthGuard],
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
      },
      {
        path: 'messages',
        canActivate: [AuthGuard],
        loadChildren: () => import('./message/message.module').then(m => m.MessageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
