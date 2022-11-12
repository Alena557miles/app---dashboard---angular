import { Component,Input, OnInit } from '@angular/core';
import { Board } from '../../interfaces';

@Component({
  selector: 'app-board-item',
  templateUrl: './board-item.component.html',
  styleUrls: ['./board-item.component.scss']
})
export class BoardItemComponent implements OnInit {

  @Input() board: Board

  constructor() { }

  ngOnInit(): void {
  }

}
