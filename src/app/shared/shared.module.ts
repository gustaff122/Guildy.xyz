import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkersComponent } from './workers/workers.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { InitialsPipe } from '../core/pipes/initials.pipe';
import { WorkersModalComponent } from './workers/workers-modal/workers-modal.component';



@NgModule({
  declarations: [
    WorkersComponent,
    InitialsPipe,
    WorkersModalComponent
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    WorkersComponent,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    InitialsPipe,
    WorkersModalComponent
  ]
})
export class SharedModule { }
