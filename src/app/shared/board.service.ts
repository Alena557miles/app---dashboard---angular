import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Board, FbCreateRsponse } from "./interfaces";

@Injectable({
    providedIn:"root"
})
export class BoardService{

    constructor(
        private http: HttpClient
    ){}

    create(board: Board): Observable<Board>{
        return this.http.post<Board>(`${environment.fbDbUrl}/boards.json`, board)
        .pipe(
            map((response: FbCreateRsponse) => {
                return{
                    ...board,
                    id: response.name,
                    date: new Date(board.date)
                }
            })
        )
    }
    getAll(): Observable<Board[]>{
        return this.http.get(`${environment.fbDbUrl}/posts.json`)
            .pipe(
                map((response: {[key: string]: any}) =>{
                    Object.
                    keys(response)
                    .map(key => ({
                        ...response[key],
                        id: key,
                        date: new Date(response[key].date)

                    }))
                    return []
                })
            )
    }
}