import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { ModalService } from 'src/app/admin/shared/services/modal.service';
import { BoardService } from 'src/app/shared/services/board.service';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  
  loading: boolean
  pSub: Subscription
  dSub: Subscription
  searchStr: '';

  constructor(
    public modalService: ModalService,
    public boardService: BoardService,
    private alertService: AlertService
    ) { }

  ngOnInit(): void {
    this.loading = true
    this.pSub = this.boardService.getAll().subscribe(() =>
      this.loading = false
      )
  }
  
  remove(id: string|undefined) {
    if (id){
      this.dSub = this.boardService.remove(id).subscribe(() =>{
        this.pSub = this.boardService.getAll().subscribe(boards =>
          console.log(boards)
          )
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

}
