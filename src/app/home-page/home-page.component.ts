import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalService } from '../services/modal.service';
import { BoardService } from '../shared/board.service';
import { Board } from '../shared/interfaces';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  
  boards$ :Observable<Board[]>

  constructor(
    private boardService: BoardService
  ) { }

  ngOnInit(): void {
    this.boards$ = this.boardService.getAll()
  }

}
