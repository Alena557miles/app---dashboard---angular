import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, delay, map,tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Board, Task, FbCreateRsponseBoard } from "./interfaces";
import { ErrorService } from "./services/error.service";

@Injectable({
    providedIn:"root"
})
export class BoardService{

    constructor(
        private http: HttpClient,
        private errorService: ErrorService
    ){}
    boards: Board[] = []

    create(board: Board): Observable<Board>{
        return this.http.post<Board>(`${environment.fbDbUrl}/boards.json`, board)
        .pipe(
            map((response: FbCreateRsponseBoard) => {
                return{
                    ...board,
                    id: response.title,
                    date: new Date(board.date)
                }
            }),
            tap(board => this.boards.push(board)),
        )
    }
    getAll(): Observable<Board[]>{
        return this.http.get(`${environment.fbDbUrl}/boards.json`)
                    .pipe(
                        delay(1500),
                        map((response: {[key: string]: any}) => {
                            return Object
                                    .keys(response)
                                    .map(key => ({
                                        ...response[key],
                                        id: key,
                                        date: new Date(response[key].date)
                                    }))
                        }),
                        tap(boards => this.boards = boards),
                        catchError(this.errorHAndler.bind(this))
                    )
    }
    getById(id: string|undefined): Observable<Board>{
        return this.http.get<Board>(`${environment.fbDbUrl}/boards/${id}.json`)
            .pipe(
                delay(1500),
                map((board: Board) => {
                    return{
                        ...board,
                        id,
                        date: new Date(board.date)
                    }
                })
            )
    }
    private errorHAndler(error: HttpErrorResponse){
        this.errorService.handle(error.message)
        return throwError(() => error.message)
    }

    remove(id: string): Observable<void>{
        return this.http.delete<void>(`${environment.fbDbUrl}/boards/${id}.json`)
    }
    update(board: Board): Observable<Board>{
        return this.http.patch<Board>(`${environment.fbDbUrl}/boards/${board.id}.json`,board)
    }



}