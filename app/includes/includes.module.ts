import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IncludesRoutingModule } from './includes-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    IncludesRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
    MatTooltipModule,
    MatDialogModule
  ]
})
export class IncludesModule { }
