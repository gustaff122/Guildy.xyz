import { Component, OnInit, ChangeDetectionStrategy, Input, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { SimpleModalService } from 'ngx-simple-modal';
import { Subject, takeUntil } from 'rxjs';
import { TaskInterface } from 'src/app/core/interfaces/task-interface';
import { TaskAddModalComponent } from '../modals/task-add-modal/task-add-modal.component';

import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';   
import { ProjectService } from 'src/app/core/services/project.service';
import { User } from 'src/app/core/interfaces/user-interface';
import { OrderPipe } from 'ngx-order-pipe';
import { TaskService } from 'src/app/core/services/task.service';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent {

  @ViewChild('dropListContainer') dropListContainer?: ElementRef;

  @Output() emittedFunction  = new EventEmitter<any>();
  @Output() changeCategory = new EventEmitter<any>();

  dropListReceiverElement?: HTMLElement;
  dragDropInfo?: {
    dragIndex: number;
    dropIndex: number;
  };

  @Input() tasks: Array<TaskInterface> = []
  @Input() header: string = ''
  @Input() projectid: string = ''
  @Input() projectworkers: Array<User> = []

  private destroy$: Subject<void> = new Subject<void>();


  constructor(
    private simpleModalService: SimpleModalService,
    private taskService: TaskService
  ) {
    
  }


  drop(event: CdkDragDrop<any>) {
    let container = parseInt((event.container.id).slice(-1)) + 1;
    let task = event.previousContainer.data[event.previousIndex];
    
    if (event.previousContainer === event.container) {

      for (let el of event.container.data) {
        if (el.position <= event.currentIndex + 1 && el.position > event.previousIndex + 1 && el != task) {
          task.position = event.currentIndex + 1
          el.position = el.position - 1
        }
        if (el.position >= event.currentIndex + 1 && el.position < event.previousIndex + 1 && el != task) {
          task.position = event.currentIndex + 1
          el.position = el.position + 1
        }
      }

      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      if (container % 3 == 1) {
        this.taskService.moveTask(task, this.projectid, "todos").subscribe()
      }
      if (container % 3 == 2) {
        this.taskService.moveTask(task, this.projectid, "wips").subscribe()
      }
      if (container % 3 == 0) {
        this.taskService.moveTask(task, this.projectid, "completed").subscribe()
      }
      
    } else {

      for (let el of event.previousContainer.data) {
        if (el.position > event.previousIndex + 1) {
          el.position = el.position - 1
        }
      }

      for (let el of event.container.data) {
        if (el.position >= event.currentIndex + 1) {
          el.position = el.position + 1
        }
      }

      task.position = event.currentIndex + 1

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      if (container % 3 == 1) {
        task.category = "todos"
        this.taskService.moveTask(task, this.projectid, "todos").subscribe()
        
      }
      if (container % 3 == 2) {
        task.category = "wips"
        this.taskService.moveTask(task, this.projectid, "wips").subscribe()
      }
      if (container % 3 == 0) {
        task.category = "completed"
        this.taskService.moveTask(task, this.projectid, "completed").subscribe()
      }
    }
  }

  emit() {
    this.emittedFunction.emit();
  }

  openModal() {
    this.simpleModalService.addModal(TaskAddModalComponent, {header: this.header, id: this.projectid, projectworkers: this.projectworkers }).pipe(takeUntil(this.destroy$)).subscribe(() => {
     this.emittedFunction.emit();
    });
  }

}