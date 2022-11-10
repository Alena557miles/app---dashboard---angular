import { HttpClient } from "@angular/common/http";
import { Token } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "src/app/shared/interfaces";

@Injectable()
export class AuthService{
    constructor(private http: HttpClient) {}

    get token(): string{
        return ''
    }
    login(user: User): Observable<any>{
        return this.http.post('', user)
    }
    logout(): void{

    }
    isAuthentificated(): boolean{
        return !!this.token
    }
    private setToken(){

    }
}