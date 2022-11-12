import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { BoardService } from 'src/app/shared/board.service';
import { Board } from 'src/app/shared/interfaces';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-edit-board',
  templateUrl: './edit-board.component.html',
  styleUrls: ['./edit-board.component.scss']
})
export class EditBoardComponent implements OnInit, OnDestroy {


  form:FormGroup
  board: Board
  submitted = false
  uSub: Subscription


  constructor(    
    private boardService: BoardService,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.boardService.getById(params['id'])
      })
    ).subscribe((board: Board) => {
      this.board = board
      console.log(board)
      this.form = new FormGroup({
        title: new FormControl(board.title, Validators.required),
        description: new FormControl(board.description, Validators.required)
      })
    })

  }

  ngOnDestroy(): void {
    if (this.uSub){
      this.uSub.unsubscribe()
    }
  }

  submit(){
    if (this.form.invalid){
      return
    }
    this.submitted = true
    this.uSub = this.boardService.update({
      ...this.board,
      title: this.board.title,
      description: this.board.description,
    }).subscribe(() => {
      this.submitted = false
      this.router.navigate(['/admin','dashboard'])
      this.alertService.success('Board was update')
    })
  }
}
