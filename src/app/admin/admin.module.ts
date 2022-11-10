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
import { AuthService } from "./shared/services/auth.service";
import { SharedModule } from "../shared/components/shared.module";



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
    ],
    imports:[
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        RouterModule.forChild([
            {
                path:'', component:AdminLayoutComponent,children:[
                    {path:'', redirectTo:'/admin/login', pathMatch:'full'},
                    {path:'login', component: LoginPageComponent},
                    {path:'dashboard', component: DashboardPageComponent},
                    {path:'board/:id', component: BoardPageComponent}

                ]
            }
        ])
    ],
    exports: [RouterModule],
    providers: [AuthService]

})
export class AdminModule{

}