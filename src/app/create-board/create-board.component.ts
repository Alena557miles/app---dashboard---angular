import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Board } from '../shared/interfaces';


@Component({
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.scss']
})
export class CreateBoardComponent implements OnInit {

  form: FormGroup;

  get title(){
    return this.form.controls.title as FormControl
  }

  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl<string>('null',[
        Validators.required,
        Validators.minLength(4)
      ])
    })
  }

  submit(){
    if (this.form.invalid){
      return
    }
    const board: Board = {
      name: this.form.value.title,
      date: new Date(),
    }
  }
}
