import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPagesComponent } from './main-pages.component';

const routes: Routes = [{ path: '', component: MainPagesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainPagesRoutingModule { }
