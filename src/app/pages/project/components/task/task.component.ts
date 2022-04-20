import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SimpleModalService } from 'ngx-simple-modal';
import { Subject, takeUntil } from 'rxjs';
import { TaskModalComponent } from '../task-modal/task-modal.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskComponent {

  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private simpleModalService: SimpleModalService
  ) {

  }

  openModal() {
    this.simpleModalService.addModal(TaskModalComponent).pipe(takeUntil(this.destroy$)).subscribe();
  }

}
