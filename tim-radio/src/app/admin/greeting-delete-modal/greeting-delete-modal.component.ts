import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-greeting-delete-modal',
  templateUrl: './greeting-delete-modal.component.html',
  styleUrls: ['./greeting-delete-modal.component.less']
})
export class GreetingDeleteModalComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
