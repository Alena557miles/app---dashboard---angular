import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { DashboardPageComponent } from "./dashboard-page/dashboard-page.component";
import { LoginPageComponent } from "./login-page/login-page.component";
import { AdminLayoutComponent } from "./shared/components/admin-layout/admin-layout.component";

@NgModule({
    declarations:[
        AdminLayoutComponent,
        LoginPageComponent,
        DashboardPageComponent
    ],
    imports:[
        CommonModule,
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