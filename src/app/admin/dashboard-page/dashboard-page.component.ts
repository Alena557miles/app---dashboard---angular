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

  boards: Board[]
  pSub: Subscription

  constructor(
    public modalService: ModalService,
    private boardService: BoardService
    ) { }

  ngOnInit(): void {
    this.pSub = this.boardService.getAll().subscribe(boards =>
      this.boards = boards
      )
  }

  ngOnDestroy(): void {
    if (this.pSub){
      this.pSub.unsubscribe()
    }
  }

}
