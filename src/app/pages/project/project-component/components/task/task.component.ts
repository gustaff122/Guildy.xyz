import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { SimpleModalService } from 'ngx-simple-modal';
import { Subject, takeUntil } from 'rxjs';
import { TaskInterface } from 'src/app/core/interfaces/task-interface';
import { User } from 'src/app/core/interfaces/user-interface';
import { ProjectService } from 'src/app/core/services/project.service';
import { TaskModalComponent } from '../modals/task-modal/task-modal.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],

})
export class TaskComponent implements OnInit {

  @Input()
  task!: TaskInterface;

  @Input()
  project!: string;

  @Input() projectworkers: Array<User> = []

  @Output() emittedFunction  = new EventEmitter<any>();

  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private simpleModalService: SimpleModalService,
    private projectService: ProjectService
  ) {

  }

  ngOnInit(): void {
    console.log(this.task)
  }

  openModal() {
    this.projectService.getTask(this.project, this.task.id).subscribe(res => {

      let taskData = {
        title: res.title,
        description: res.description,
        deadline: res.deadline,
        category: res.category,
        id: res.id,
        workers: res.workers,
        projectworkers: this.projectworkers
      }

      this.simpleModalService.addModal(TaskModalComponent, {taskData: taskData, projectid: this.project, projectworkers: this.projectworkers}).pipe(takeUntil(this.destroy$)).subscribe(() => {
        this.emittedFunction.emit();
      });
    })
  }

}