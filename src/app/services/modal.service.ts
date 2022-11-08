import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  isVisiBle$ = new BehaviorSubject<boolean>(false)

  open(){
    this.isVisiBle$.next(true)
  }

  close(){
    this.isVisiBle$.next(false)
  }
}
