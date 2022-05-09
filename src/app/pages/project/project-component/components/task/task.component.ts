import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { SimpleModalService } from 'ngx-simple-modal';
import { Subject, takeUntil } from 'rxjs';
import { TaskInterface } from 'src/app/core/interfaces/task-interface';
import { TaskModalComponent } from '../modals/task-modal/task-modal.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],

})
export class TaskComponent {

  @Input()
  task!: TaskInterface | null;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private simpleModalService: SimpleModalService
  ) {

  }

  openModal() {
    this.simpleModalService.addModal(TaskModalComponent, {task: this.task}).pipe(takeUntil(this.destroy$)).subscribe();
  }

}
