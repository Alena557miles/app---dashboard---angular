import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalService } from 'src/app/admin/shared/services/modal.service';
import { BoardService } from 'src/app/shared/board.service';
import { Board } from '../../shared/interfaces';
import { AlertService } from '../shared/services/alert.service';


@Component({
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.scss']
})
export class CreateBoardComponent implements OnInit {

  form: FormGroup;

  constructor(
    private boardService: BoardService,
    private modalService: ModalService,
    private alertService: AlertService,
    ) { }

  ngOnInit(): void {
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

  submit(){
    if (this.form.invalid){
      return
    }
    const board: Board = {
      title: this.form.value.title,
      description: this.form.value.description,
      date: new Date(),
      tasks: []
    }
    this.boardService.create(board).subscribe( () => {
      this.form.reset()
      this.modalService.close()
      this.alertService.success('Board was created succsessfully')
    })
  }
}
