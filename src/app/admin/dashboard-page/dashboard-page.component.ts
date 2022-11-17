import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ModalService } from 'src/app/admin/shared/services/modal.service';
import { BoardService } from 'src/app/shared/board.service';
import { Board } from 'src/app/shared/interfaces';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  
  public action = 'create'

  boards: Board[] = []
  public board: Board
  form:FormGroup
  pSub: Subscription
  dSub: Subscription
  searchStr: '';

  constructor(
    public modalService: ModalService,
    private boardService: BoardService,
    private alertService: AlertService
    ) { }

  ngOnInit(): void {
    this.pSub = this.boardService.getAll().subscribe(boards =>
      this.boards = boards
      )
  }
  
  remove(id: string|undefined) {
    if (id){
      this.dSub = this.boardService.remove(id).subscribe(() =>{
        this.boards = this.boards.filter(board => board.id != id)
        this.alertService.warning('Board delete successfully')
      })
    }
  }

  ngOnDestroy(): void {
    if (this.pSub){
      this.pSub.unsubscribe()
    }
    if (this.dSub){
      this.dSub.unsubscribe()
    }
  }

  edit(id: string | undefined): string | null {
    if (id) {
      this.action = 'edit'
      this.boardService.getById(id).subscribe((board: Board) => {
      this.board = board
      return id
    })
  }
    return null
  }

}
