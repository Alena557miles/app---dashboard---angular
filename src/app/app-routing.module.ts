import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from './admin/not-found-page/not-found-page.component';
import { BoardPageComponent } from './board-page/board-page.component';
import { HomePageComponent } from './home-page/home-page.component';

import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';

const routes: Routes = [
  {
    path:'', component: MainLayoutComponent, children:[
      { path:'', redirectTo: '/', pathMatch: 'full'},
      { path:'', component: HomePageComponent},
      { path:'board/:id', component: BoardPageComponent},
    ]
  },
  {
    path:'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
