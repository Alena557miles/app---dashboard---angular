import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { ModalService } from 'src/app/admin/shared/services/modal.service';
import { BoardService } from 'src/app/shared/board.service';
import { Board } from 'src/app/shared/interfaces';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-edit-board',
  templateUrl: './edit-board.component.html',
  styleUrls: ['./edit-board.component.scss']
})
export class EditBoardComponent implements OnInit, OnDestroy {

  @Input()

  form:FormGroup
  board: Board
  submitted = false
  uSub: Subscription


  constructor(    
    private boardService: BoardService,
    private modalService: ModalService,
    private alertService: AlertService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    // this.route.params.pipe(
    //   switchMap((params: Params) => {
    //     console.log(params)
    //     return this.boardService.getById(params['id'])
    //   })
    // ).subscribe((board: Board) => {
    //   this.board = board
    //   console.log(board)
    //   this.form = new FormGroup({
    //     name: new FormControl(board.name, Validators.required),
    //     description: new FormControl(board.description, Validators.required)
    //   })
    // })

    this.form = new FormGroup({
      title: new FormControl<string>('',[
        Validators.required,
        Validators.minLength(4)
      ]),
      description: new FormControl<string>('',[
        Validators.required,
        Validators.minLength(7)
      ])
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
      name: this.board.name,
      description: this.board.description,
    }).subscribe(() => {
      this.submitted = false
      this.modalService.close()
      this.alertService.success('Board was update')
    })
  }
}
