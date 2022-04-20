import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskModalComponent extends SimpleModalComponent<any, string> {

  constructor() {
    super()
  }

}
