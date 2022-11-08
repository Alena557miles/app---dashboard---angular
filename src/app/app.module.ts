import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';

import { BoardItemComponent } from './shared/components/board-item/board-item.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { BoardPageComponent } from './board-page/board-page.component';
import { ModalBoardComponent } from './shared/components/modal-board/modal-board.component';
import { CreateBoardComponent } from './create-board/create-board.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateTaskComponent } from './create-task/create-task.component';


@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    BoardItemComponent,
    DashboardPageComponent,
    BoardPageComponent,
    ModalBoardComponent,
    CreateBoardComponent,
    CreateTaskComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
