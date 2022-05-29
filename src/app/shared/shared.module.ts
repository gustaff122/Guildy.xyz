import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkersComponent } from './workers/workers.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { InitialsPipe } from '../core/pipes/initials.pipe';
import { WorkersModalComponent } from './workers/workers-modal/workers-modal.component';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { WorkersTaskComponent } from './workers-task/workers-task.component';
import { WorkerComponent } from './workers-task/worker/worker.component';



@NgModule({
  declarations: [
    WorkersComponent,
    InitialsPipe,
    WorkersModalComponent,
    WorkersTaskComponent,
    WorkerComponent,

  ],
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule
  ],
  exports: [
    WorkersComponent,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    InitialsPipe,
    WorkersModalComponent,
    DragDropModule,
    WorkersTaskComponent,

  ]
})
export class SharedModule { }
