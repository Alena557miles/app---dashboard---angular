import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, tap, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AuthService } from "../admin/shared/services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(
        private auth: AuthService,
        private router: Router
        ){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.auth.isAuthentificated()){
            if (this.auth.token){
                req = req.clone({
                    setParams:{
                        auth: this.auth.token
                    }
                })
            }
        }
        return next.handle(req)
        .pipe(
            tap( () => {
                console.log('intercept working')
            }),
            catchError((error: HttpErrorResponse) => {
                console.log('Interceptor error: ', error)
                if (error.status === 401) {
                    this.auth.logout()
                    this.router.navigate(['/admin','login'], {
                        queryParams: {
                            authFailed: true
                        }
                    })
                }
              return throwError(() => error);
            })
        )
    }
    
}