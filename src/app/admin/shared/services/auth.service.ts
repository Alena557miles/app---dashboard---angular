import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { FbAuthResponse, User } from "src/app/shared/interfaces";
import { environment } from "src/environments/environment";

@Injectable()
export class AuthService{
    constructor(private http: HttpClient) {}

    get token(): string | null{
        // const expDate: Date  = new Date(localStorage.getItem('fb-token-exp'))
        // if (new Date() > expDate){
        //     this.logout()
        //     return null
        // }
        return localStorage.getItem('fb-token')
    }
    login(user: User): Observable<any>{
        user.returnSecureToken = true
        return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
        .pipe(
            tap({
                next: val => {
                  this.setToken(val)
                },
                error: error => {
                  console.log('on error', error.message);
                },
                complete: () => console.log('on complete')
              })
        )
    }
    logout(){
        this.setToken(null)
    }
    isAuthentificated(): boolean{
        return !!this.token
    }
    private setToken(response: FbAuthResponse | any){
        if (response){
        const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000)
        localStorage.setItem('fb-token', JSON.stringify(response.idToken))
        localStorage.setItem('fb-token-exp', JSON.stringify(expDate.toString()))
        } else {
            localStorage.clear()
        }
    }
}