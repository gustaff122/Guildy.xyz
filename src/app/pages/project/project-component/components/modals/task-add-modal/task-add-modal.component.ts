import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';

@Component({
  selector: 'app-task-add-modal',
  templateUrl: './task-add-modal.component.html',
  styleUrls: ['task-add-modal.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskAddModalComponent extends SimpleModalComponent<any, string> {

  constructor() {
    super()
   }

   closeModal() {
     this.close()
   }
}
