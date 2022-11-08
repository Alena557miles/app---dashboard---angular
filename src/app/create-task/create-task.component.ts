import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Task } from '../shared/interfaces';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {

  form: FormGroup;
  
  get title(){
    return this.form.controls.title as FormControl
  }
  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl<string>('',[
        Validators.required,
        Validators.minLength(2)
      ])
    })
  }

  submit(){
    if (this.form.invalid){
      return
    }
    console.log(this.form.value.title)
    const board: Task = {
      name: this.form.value.title
    }
  }
}
