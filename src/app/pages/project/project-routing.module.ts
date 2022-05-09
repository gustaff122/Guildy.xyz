import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectComponentComponent } from './project-component/project-component.component';
import { ProjectComponentResolver } from './project-component/project-component.resolver';
import { ProjectComponent } from './project.component';

const routes: Routes = [
  { path: '', component: ProjectComponent, children: [
    { path: ':id', resolve: [ProjectComponentResolver], component: ProjectComponentComponent},
  ],
}
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
