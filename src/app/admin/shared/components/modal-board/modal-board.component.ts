import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from 'src/app/admin/shared/services/modal.service';

@Component({
  selector: 'app-modal-board',
  templateUrl: './modal-board.component.html',
  styleUrls: ['./modal-board.component.scss']
})
export class ModalBoardComponent implements OnInit {
  
  @Input() title: string 

  constructor(public modalService: ModalService) { }

  ngOnInit(): void {
  }

}
