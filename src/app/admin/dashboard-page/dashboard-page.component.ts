import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalService } from 'src/app/services/modal.service';
import { BoardService } from 'src/app/shared/board.service';
import { Board } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  
  public action = 'create'
  boards: Board[] = []
  pSub: Subscription
  dSub: Subscription
  searchStr: '';

  constructor(
    public modalService: ModalService,
    private boardService: BoardService
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

  addOption(){
    this.action = 'create'
  }

  edit(id: string | undefined): string | null {
    if (id) {
      this.action = 'edit'
      // this.boardService.getById(id).subscribe(()=> {

      // })
      return id
    }
    return null
  }

}
