import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkersComponent } from './workers/workers.component';



@NgModule({
  declarations: [
    WorkersComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    WorkersComponent
  ]
})
export class SharedModule { }
