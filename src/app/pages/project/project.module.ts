import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectComponent } from './project.component';
import { ColumnComponent } from './project-component/components/column/column.component';
import { SimpleModalModule } from 'ngx-simple-modal';
import { TaskModalComponent } from './project-component/components/modals/task-modal/task-modal.component';
import { SharedModule } from '../../shared/shared.module';
import { ProjectComponentComponent } from './project-component/project-component.component';
import { TaskComponent } from './project-component/components/task/task.component';
import { InitialsPipe } from 'src/app/core/pipes/initials.pipe';
import { TaskAddModalComponent } from './project-component/components/modals/task-add-modal/task-add-modal.component';
import { TitleEditModalComponent } from './project-component/components/modals/title-edit-modal/title-edit-modal.component';
import { ProjectAccessGuardGuard } from 'src/app/core/guards/project-access-guard.guard';


@NgModule({
  declarations: [
    ProjectComponent,
    ColumnComponent,
    TaskComponent,
    TaskModalComponent,
    ProjectComponentComponent,
    TaskAddModalComponent,
    TitleEditModalComponent,
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    SimpleModalModule,
    SimpleModalModule.forRoot({container: document.body}),
    SharedModule,
  ]
})
export class ProjectModule { }
