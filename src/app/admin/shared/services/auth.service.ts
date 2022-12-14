import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, Subject,throwError } from "rxjs";
import { tap } from "rxjs/operators";
import { FbAuthResponse, User } from "src/app/shared/interfaces";
import { environment } from "src/environments/environment";

@Injectable({providedIn: 'root'})
export class AuthService{

    public error$: Subject<string> = new Subject<string>()

    constructor(private http: HttpClient) {}

    get token(): string | null{
        const date = localStorage.getItem('fb-token-exp')
        if (date){
            const expDate = new Date(date)
            if (new Date() > expDate){
                this.logout()
            return null
            }
        }       
        return localStorage.getItem('fb-token')
    }

    login(user: User): Observable<any>{
        user.returnSecureToken = true
        return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
        .pipe(
            tap(this.setToken),
            catchError(this.handleError.bind(this))
        )
    }
    logout(){
        this.setToken(null)
    }
    isAuthentificated(): boolean{
        return !!this.token
    }
    private handleError(error: HttpErrorResponse){
        const messege = error.error.error.message
         switch (messege){
            case 'INALID_EMAIL':
                this.error$.next('Invalid e-mail')
                break
            case 'INVALID_PASSWORD':
                this.error$.next('Invalid password')
                break
            case 'EMAIL_NOT_FOUND':
                this.error$.next('E-mail not found')
                break
        }
        return throwError(() => error)
    }
    private setToken(response: FbAuthResponse | any){
        // console.log(response)
        if (response){
            const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000)
            localStorage.setItem('fb-token', JSON.stringify(response.idToken))
            localStorage.setItem('fb-token-exp', JSON.stringify(expDate.toString()))
        } else {
            localStorage.clear()
        }
    }
}