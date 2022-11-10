import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardPageComponent } from './admin/board-page/board-page.component';
import { HomePageComponent } from './home-page/home-page.component';

import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';

const routes: Routes = [
  {
    path:'', component: MainLayoutComponent, children:[
      { path:'', redirectTo: '/', pathMatch: 'full'},
      { path:'', component: HomePageComponent},
      { path:'board/:id', component: BoardPageComponent}
    ]
  },
  {
    path:'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
