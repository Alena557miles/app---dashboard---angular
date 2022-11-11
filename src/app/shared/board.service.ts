import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn:"root"
})
export class BoardService{

    constructor(
        private http: HttpClient
    ){}

    create()
}