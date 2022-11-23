import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { ModalService } from 'src/app/admin/shared/services/modal.service';
import { BoardService } from 'src/app/shared/services/board.service';
import { TaskService } from 'src/app/shared/services/task.service';
import { Board, Task } from '../../shared/interfaces';
import { AlertService } from '../shared/services/alert.service';


@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss'],
})
export class BoardPageComponent implements OnInit, OnDestroy {
  
  @Output ()  sortByValue: string ='desc'

  public title: string = '' 
  public submitted = false
  board: Board
  task: Task
  id: string | undefined= ''
  statuses = ['todo','in progress','done']
  status = this.statuses[0]
  // tasks: Task[] = []
  pSub: Subscription
  dSub: Subscription
  type: string = 'todo'
  searchStr: '';
  loading: boolean
  editTask: boolean = false


  constructor(
    public modalService: ModalService,
    private alertService: AlertService,
    public taskService: TaskService,
    private route: ActivatedRoute,
    private boardService: BoardService,
    ) { }

  ngOnInit(): void {
    this.loading = true
    this.route.params.pipe(
        switchMap((params: Params) => {
          return this.boardService.getById(params['id'])
        })
      ).subscribe((board: Board) => {
        this.board = board
        this.title = board.title
        this.id = board.id
        console.log(board.tasks)
        this.pSub = this.taskService.getAll(board.title).subscribe(() =>
          this.loading = false
        )
      })
  }

  ngOnDestroy(): void {
    if (this.pSub){
      this.pSub.unsubscribe()
    }
    if (this.dSub){
      this.dSub.unsubscribe()
    }
  }

  sortBy(text: string): string{
    return this.sortByValue = text
  }

  getStatus(index: number):string{
    return this.status = this.statuses[index]
  }

  submit(createTaskForm: any){
    console.log(createTaskForm)
    this.submitted = true
    const task: Task ={
      name: createTaskForm.value.name,
      status: this.status,
      date: new Date(),
      board: this.board,
      isArchived: false
    }

    this.taskService.create(task).subscribe(() => {
      createTaskForm.reset()
      this.modalService.close()
      this.boardService.update({
        ...this.board,
        tasks: this.taskService.tasks
      }).subscribe(() => {
        this.submitted = false
      })
      this.pSub = this.taskService.getAll(this.board.title).subscribe(()=>{
        this.alertService.success('Task was created succsessfully')
      })
    })
  }


  remove(id: string|undefined) {
    if (id){
      this.dSub = this.taskService.remove(id).subscribe(() =>{
        this.taskService.tasks = this.taskService.tasks.filter(task => task.id != id)
        this.boardService.update({
          ...this.board,
          tasks: this.taskService.tasks
        }).subscribe(() => {
          this.alertService.warning(`Task delete successfully`)
        })
      })
    }
  }

  done(id: string){
    this.taskService.getById(id).subscribe((task)=>{
      this.task = task
      task.isArchived = !task.isArchived
      this.taskService.update({
        ...this.task,
        isArchived: this.task.isArchived
      }).subscribe(() => {
        this.boardService.update({
          ...this.board,
          tasks: this.taskService.tasks
        }).subscribe(() => {
          this.pSub = this.taskService.getAll(this.board.title).subscribe(() =>
          this.loading = false
        )
        this.alertService.success('Success')
        })
      })
    })
  }

  allowDrop(ev: DragEvent| any) {
    ev.preventDefault();
  }

  drag(ev: DragEvent| any) {
    ev.dataTransfer.setData("text", ev.target.id);
    console.log("Event. dataTransfer:",ev.dataTransfer)
    console.log("Event. target.id:",ev.target.id)
  }

  drop(ev: DragEvent| any) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    console.log(data)
    ev.target.appendChild(document.getElementById(data));
  }

}
