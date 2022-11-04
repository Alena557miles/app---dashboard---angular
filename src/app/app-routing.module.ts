import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardPageComponent } from './board-page/board-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';

import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';

const routes: Routes = [
  {
    path:'', component: MainLayoutComponent, children:[
      { path:'', redirectTo: '/', pathMatch: 'full'},
      { path:'', component: DashboardPageComponent},
      { path:'board/:id', component: BoardPageComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
