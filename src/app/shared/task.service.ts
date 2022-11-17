import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map,tap, filter, delay } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Task, FbCreateRsponse } from "./interfaces";
import { ErrorService } from "./services/error.service";

@Injectable({
    providedIn:"root"
})
export class TaskService{

    constructor(
        private http: HttpClient,
        private errorService: ErrorService
    ){}
        
    tasks: Task[] = []

    create(task: Task): Observable<Task>{
        return this.http.post<Task>(`${environment.fbDbUrl}/tasks.json`, task)
        .pipe(
            map((response: FbCreateRsponse) => {
                return{
                    ...task,
                    id: response.name,
                    date: new Date(task.date)
                }
            }),
            tap(task => this.tasks.push(task)),
        )
    }
    getAll(title: string): Observable<Task[]>{
        return this.http.get(`${environment.fbDbUrl}/tasks.json`)
                    .pipe(
                        delay(1000),
                        map((response: {[key: string]: any}) => {
                            return Object
                                    .keys(response)
                                    .map(key => ({
                                        ...response[key],
                                        id: key,
                                        date: new Date(response[key].date)
                                    }))
                        }),
                        map((tasks)=>{
                           return tasks.filter(task => task.board.title == title)
                        }),
                        tap(tasks => this.tasks = tasks),
                        catchError(this.errorHAndler.bind(this))     
                    )
    }
    private errorHAndler(error: HttpErrorResponse){
        this.errorService.handle(error.message)
        return throwError(() => error.message)
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