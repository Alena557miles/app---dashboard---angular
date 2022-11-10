import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ModalBoardComponent } from "../shared/components/modal-board/modal-board.component";
import { CreateBoardComponent } from "./create-board/create-board.component";
import { DashboardPageComponent } from "./dashboard-page/dashboard-page.component";
import { LoginPageComponent } from "./login-page/login-page.component";
import { AdminLayoutComponent } from "./shared/components/admin-layout/admin-layout.component";

@NgModule({
    declarations:[
        AdminLayoutComponent,
        LoginPageComponent,
        DashboardPageComponent,
        CreateBoardComponent,
    ],
    imports:[
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            {
                path:'', component:AdminLayoutComponent,children:[
                    {path:'', redirectTo:'/admin/login', pathMatch:'full'},
                    {path:'login', component: LoginPageComponent},
                    {path:'dashboard', component: DashboardPageComponent}

                ]
            }
        ])
    ],
    exports: [RouterModule]

})
export class AdminModule{

}