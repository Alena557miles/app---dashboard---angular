import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { ModalBoardComponent } from "./shared/components/modal-board/modal-board.component";
import { CreateBoardComponent } from "./create-board/create-board.component";
import { DashboardPageComponent } from "./dashboard-page/dashboard-page.component";
import { LoginPageComponent } from "./login-page/login-page.component";
import { AdminLayoutComponent } from "./shared/components/admin-layout/admin-layout.component";
import { BoardItemComponent } from "./shared/components/board-item/board-item.component";
import { BoardPageComponent } from "./board-page/board-page.component";
import { SharedModule } from "../shared/shared.module";
import { AuthGuard } from "./shared/services/auth.guard";
import { HttpClientModule } from "@angular/common/http";
import { SearchPipe } from "./shared/pipes/search.pipes";
import { EditBoardComponent } from './edit-board/edit-board.component';
import { AlertComponent } from './shared/components/alert/alert.component';
import { AlertService } from "./shared/services/alert.service";
import { ModalService } from "./shared/services/modal.service";
import { StatusPipe } from "./shared/pipes/status.pipes";
import { SearchTaskPipe } from "./shared/pipes/searcTask.pipe";



@NgModule({
    declarations:[
        AdminLayoutComponent,
        LoginPageComponent,
        DashboardPageComponent,
        CreateBoardComponent,
        BoardPageComponent,
        ModalBoardComponent,
        BoardItemComponent,
        SearchPipe,
        StatusPipe,
        SearchTaskPipe,
        EditBoardComponent,
        AlertComponent,
    ],
    imports:[
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        HttpClientModule,
        RouterModule.forChild([
            {
                path:'', component:AdminLayoutComponent,children:[
                    {path:'', redirectTo:'/admin/login', pathMatch:'full'},
                    {path:'login', component: LoginPageComponent},
                    {path:'dashboard', component: DashboardPageComponent, canActivate:[AuthGuard]},
                    {path:'board/:id', component: BoardPageComponent, canActivate:[AuthGuard]},
                    {path:'board/:id/edit', component: EditBoardComponent, canActivate:[AuthGuard]}
                ]
            }
        ])
    ],
    exports: [RouterModule],
    providers: [AlertService,ModalService,AuthGuard]

})
export class AdminModule{

}