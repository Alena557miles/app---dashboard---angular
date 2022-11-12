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
import { CreateTaskComponent } from "./create-task/create-task.component";
import { SharedModule } from "../shared/shared.module";
import { AuthGuard } from "./shared/services/auth.guard";
import { HttpClientModule } from "@angular/common/http";
import { SearchPipe } from "./shared/search.pipes";
import { EditBoardComponent } from './edit-board/edit-board.component';
import { AlertComponent } from './shared/components/alert/alert.component';
import { AlertService } from "./shared/services/alert.service";



@NgModule({
    declarations:[
        AdminLayoutComponent,
        LoginPageComponent,
        DashboardPageComponent,
        CreateBoardComponent,
        CreateTaskComponent,
        BoardPageComponent,
        ModalBoardComponent,
        BoardItemComponent,
        SearchPipe,
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
                    {path:'board/:id', component: BoardPageComponent, canActivate:[AuthGuard]}

                ]
            }
        ])
    ],
    exports: [RouterModule],
    providers: [AlertService,AuthGuard]

})
export class AdminModule{

}