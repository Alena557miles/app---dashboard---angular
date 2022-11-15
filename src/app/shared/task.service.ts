import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Task, FbCreateRsponse } from "./interfaces";

@Injectable({
    providedIn:"root"
})
export class TaskService{

    constructor(
        private http: HttpClient
    ){}

    create(task: Task): Observable<Task>{
        return this.http.post<Task>(`${environment.fbDbUrl}/tasks.json`, task)
        .pipe(
            map((response: FbCreateRsponse) => {
                return{
                    ...task,
                    id: response.name,
                    date: new Date(task.date)
                }
            })
        )
    }
    getAll(): Observable<Task[]>{
        return this.http.get(`${environment.fbDbUrl}/tasks.json`)
                    .pipe(
                        map((response: {[key: string]: any}) => {
                            return Object
                                    .keys(response)
                                    .map(key => ({
                                        ...response[key],
                                        id: key,
                                        date: new Date(response[key].date)
                                    }))
                                    // .filter(task => task.board.title == title)                           
                        })
                    )
    }
    // getById(id: string): Observable<Board>{
    //     return this.http.get<Board>(`${environment.fbDbUrl}/boards/${id}.json`)
    //         .pipe(
    //             map((board: Board) => {
    //                 return{
    //                     ...board,
    //                     id,
    //                     date: new Date(board.date)
    //                 }
    //             })
    //         )
    // }
    remove(id: string): Observable<void>{
        return this.http.delete<void>(`${environment.fbDbUrl}/tasks/${id}.json`)
    }
    // update(board: Board): Observable<Board>{
    //     return this.http.patch<Board>(`${environment.fbDbUrl}/boards/${board.id}.json`,board)
    // }

}