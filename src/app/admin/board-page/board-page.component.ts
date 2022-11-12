import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { ModalService } from 'src/app/admin/shared/services/modal.service';
import { BoardService } from 'src/app/shared/board.service';
import { TaskService } from 'src/app/shared/task.service';
import { Board, Task } from '../../shared/interfaces';
import { AlertService } from '../shared/services/alert.service';


@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss']
})
export class BoardPageComponent implements OnInit {
  
  title: string = ''

  statuses = ['todo','in progress','done']
  tasks: Task[] = []
  pSub: Subscription
  type: string = 'todo'

  constructor(
    public modalService: ModalService,
    private alertService: AlertService,
    private taskService: TaskService,
    private route: ActivatedRoute,
    private boardService: BoardService,
    ) { }

  ngOnInit(): void {

    this.route.params.pipe(
        switchMap((params: Params) => {
          return this.boardService.getById(params['id'])
        })
      ).subscribe((board: Board) => {
        this.title = board.name
      })
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
