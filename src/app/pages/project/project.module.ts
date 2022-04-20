import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectComponent } from './project.component';
import { ColumnComponent } from './components/column/column.component';
import { TaskComponent } from './components/task/task.component';
import { SimpleModalModule } from 'ngx-simple-modal';
import { TaskModalComponent } from './components/task-modal/task-modal.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    ProjectComponent,
    ColumnComponent,
    TaskComponent,
    TaskModalComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    SimpleModalModule,
    SimpleModalModule.forRoot({container: document.body}),
    SharedModule
  ]
})
export class ProjectModule { }
