import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainPagesRoutingModule } from './main-pages-routing.module';
import { MainPagesComponent } from './main-pages.component';


@NgModule({
  declarations: [
    MainPagesComponent
  ],
  imports: [
    CommonModule,
    MainPagesRoutingModule
  ]
})
export class MainPagesModule { }
