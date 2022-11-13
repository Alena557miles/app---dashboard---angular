import { ChangeDetectionStrategy, Component, Input, OnInit, Output } from '@angular/core';
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
  styleUrls: ['./board-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class BoardPageComponent implements OnInit {
  
  @Output ()  sortByValue: string ='desc'

  title: string = ''
  board: Board
  statuses = ['todo','in progress','done']
  tasks: Task[] = []
  pSub: Subscription
  dSub: Subscription
  type: string = 'todo'
  searchStr: '';


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
        this.board = board
        this.title = board.title
      })
    this.pSub = this.taskService.getAll().subscribe(tasks =>
      this.tasks = tasks
      )
  }

  sortBy(text: string): string{
    console.log(text)
    return this.sortByValue = text
  }

  submit(val: any){
    const task: Task ={
      name: val.value.name,
      status: val.value.select,
      date: new Date(),
      board: this.board
    }
    this.taskService.create(task).subscribe( () => {
      val.reset()
      this.modalService.close()
      this.alertService.success('Task was created succsessfully')
    })
    this.boardService.addTask(task, this.board).subscribe((board)=>{
      console.log(this.board)
    })
  }


  remove(id: string|undefined) {
    if (id){
      this.dSub = this.boardService.remove(id).subscribe(() =>{
        this.tasks = this.tasks.filter(task => task.id != id)
        this.alertService.warning(`Task delete successfully`)
      })
    }
  }


}
