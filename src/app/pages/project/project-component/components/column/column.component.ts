import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { SimpleModalService } from 'ngx-simple-modal';
import { Subject, takeUntil } from 'rxjs';
import { TaskInterface } from 'src/app/core/interfaces/task-interface';
import { TaskAddModalComponent } from '../modals/task-add-modal/task-add-modal.component';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent {

  @Input() tasks: Array<TaskInterface> = []
  @Input() header: string = ''

  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private simpleModalService: SimpleModalService
  ) {

  }

  openModal() {
    //this.simpleModalService.addModal(TaskAddModalComponent).pipe(takeUntil(this.destroy$)).subscribe();
    console.log(this.tasks)
  }

}
