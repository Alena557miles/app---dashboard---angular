import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
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
export class BoardPageComponent implements OnInit, OnDestroy {
  
  @Output ()  sortByValue: string ='desc'

  public title: string = ''
  board: Board
  id: string | undefined= ''
  statuses = ['todo','in progress','done']
  tasks: Task[] = []
  pSub: Subscription
  dSub: Subscription
  type: string = 'todo'
  searchStr: '';
  public submitted = false
  loading: boolean


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
        this.tasks = board.tasks
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
    console.log(text)
    return this.sortByValue = text
  }
  // description: new FormControl({value: board.description,disabled: true})


  submit(createTaskForm: any){
    console.log(createTaskForm)
    this.submitted = true
    const task: Task ={
      name: createTaskForm.value.name,
      status: createTaskForm.value.select,
      date: new Date(),
      board: this.board
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
        this.taskService.tasks = this.tasks.filter(task => task.id != id)
        this.boardService.update({
          ...this.board,
          tasks: this.taskService.tasks
        }).subscribe(() => {
          this.alertService.warning(`Task delete successfully`)
        })
      })
    }
  }


}
