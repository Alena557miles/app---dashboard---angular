import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Board, Task, FbCreateRsponseBoard } from "./interfaces";

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
            map((response: FbCreateRsponseBoard) => {
                return{
                    ...board,
                    id: response.title,
                    date: new Date(board.date)
                }
            })
        )
    }
    getAll(): Observable<Board[]>{
        return this.http.get(`${environment.fbDbUrl}/boards.json`)
                    .pipe(
                        map((response: {[key: string]: any}) => {
                            return Object
                                    .keys(response)
                                    .map(key => ({
                                        ...response[key],
                                        id: key,
                                        date: new Date(response[key].date)
                                    }))
                        })
                    )
    }
    getById(id: string|undefined): Observable<Board>{
        return this.http.get<Board>(`${environment.fbDbUrl}/boards/${id}.json`)
            .pipe(
                map((board: Board) => {
                    return{
                        ...board,
                        id,
                        date: new Date(board.date)
                    }
                })
            )
    }
    remove(id: string): Observable<void>{
        return this.http.delete<void>(`${environment.fbDbUrl}/boards/${id}.json`)
    }
    update(board: Board): Observable<Board>{
        return this.http.patch<Board>(`${environment.fbDbUrl}/boards/${board.id}.json`,board)
    }

    addTask(task: Task, board:Board): Observable<Board>{
        // if (board){
        //     this.getById(board.id).subscribe((board)=>{
        //         board.tasks?.push(task) 
        //         this.http.patch<Board>(`${environment.fbDbUrl}/boards/${board.id}.json`,board)
        //     })
            
        // }

        this.getById(board.id).subscribe((board)=>{
                    board.tasks?.push(task) 
                    
        })
        return this.http.patch<Board>(`${environment.fbDbUrl}/boards/${board.id}.json`,board)
    } 


}