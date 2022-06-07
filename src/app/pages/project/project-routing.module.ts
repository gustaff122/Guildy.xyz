import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectAccessGuardGuard } from 'src/app/core/guards/project-access-guard.guard';
import { ProjectComponentComponent } from './project-component/project-component.component';
import { ProjectComponentResolver } from './project-component/project-component.resolver';
import { ProjectComponent } from './project.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome'},
  { path: '', component: ProjectComponent, children: [
    { path: ':id', resolve: [ProjectComponentResolver], canActivate: [ProjectAccessGuardGuard], component: ProjectComponentComponent},
  ],
}
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [ProjectAccessGuardGuard],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
