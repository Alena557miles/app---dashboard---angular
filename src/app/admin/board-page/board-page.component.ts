import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ModalService } from 'src/app/admin/shared/services/modal.service';
import { TaskService } from 'src/app/shared/task.service';
import { Task } from '../../shared/interfaces';
import { AlertService } from '../shared/services/alert.service';


@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss']
})
export class BoardPageComponent implements OnInit {
  
  title: string
  statuses = ['todo','in progress','done']
  tasks: Task[] = []
  pSub: Subscription

  constructor(
    public modalService: ModalService,
    private alertService: AlertService,
    private taskService: TaskService
    ) { }

  ngOnInit(): void {
    this.pSub = this.taskService.getAll().subscribe(tasks =>
      this.tasks = tasks
      )
  }
  submit(val: any){
    const task: Task ={
      name: val.value.name,
      status: val.value.select,
      date: new Date()
    }
    console.log(task)
    this.taskService.create(task).subscribe( () => {
      val.reset()
      this.modalService.close()
      this.alertService.success('Task was created succsessfully')
    })
  }

}
