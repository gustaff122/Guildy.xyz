import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';
import { TaskInterface } from 'src/app/core/interfaces/task-interface';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskModalComponent extends SimpleModalComponent<any, string> {

@Input() task!: TaskInterface

  constructor() {
    super()
  }
  xd() {
    console.log(this.task.deadline)
  }

  closeModal() {
    this.close()
  }
}
