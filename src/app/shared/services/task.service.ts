import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map,tap, filter, delay } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Task, FbCreateRsponse } from "../interfaces";
import { ErrorService } from "./error.service";

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

    getById(id: string): Observable<Task>{
        return this.http.get<Task>(`${environment.fbDbUrl}/tasks/${id}.json`)
            .pipe(
                map((task: Task) => {
                    return{
                        ...task,
                        id,
                        date: new Date(task.date)
                    }
                }),
                catchError(this.errorHAndler.bind(this))   
            )
    }
    remove(id: string): Observable<void>{
        return this.http.delete<void>(`${environment.fbDbUrl}/tasks/${id}.json`)
                                .pipe(
                                    tap(() => {
                                        this.tasks.filter(task => task.id != id)
                                    })
                                )
    }
    update(task: Task): Observable<Task>{
        return this.http.patch<Task>(`${environment.fbDbUrl}/tasks/${task.id}.json`,task)
                        .pipe(
                            tap((task:Task) =>{
                             const index = this.tasks.findIndex(x => x.id === task.id)
                                this.tasks[index] = task
                                }
                            ),
                            catchError(this.errorHAndler.bind(this))
                        )
    }

}