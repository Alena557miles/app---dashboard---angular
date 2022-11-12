import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalService } from 'src/app/admin/shared/services/modal.service';


@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss']
})
export class BoardPageComponent implements OnInit {
  
  title: string
  form: FormGroup

  constructor(public modalService: ModalService) { }

  ngOnInit(): void {
  }
  submit(){
    
  }

}
