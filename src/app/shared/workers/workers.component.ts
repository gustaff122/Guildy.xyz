import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { SimpleModalService } from 'ngx-simple-modal';
import { Subject, takeUntil } from 'rxjs';
import { User } from 'src/app/core/interfaces/user-interface';
import { ProjectService } from 'src/app/core/services/project.service';
import { WorkersModalComponent } from './workers-modal/workers-modal.component';

@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.scss'],
})
export class WorkersComponent implements OnInit {

  @Output() emittedFunction  = new EventEmitter<any>();
  @Input() workers: Array<User> = [];
  @Input() project: string = '';

  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private simpleModalService: SimpleModalService
  ) { }

    ngOnInit(): void {
      (this.workers)
    }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  openModal() {
    this.simpleModalService.addModal(WorkersModalComponent, {workers: this.workers, project: this.project}).pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.emittedFunction.emit();
    });
  }

}
