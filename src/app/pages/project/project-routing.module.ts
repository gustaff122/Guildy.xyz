import { NgModule } from '@angular/core';
import { RouteReuseStrategy, RouterModule, Routes } from '@angular/router';
import { ProjectAccessGuardGuard } from 'src/app/core/guards/project-access-guard.guard';
import { ProjectReuseStrategy } from 'src/app/core/strategies/project-reuse-strategy';
import { ProjectComponentComponent } from './project-component/project-component.component';
import { ProjectComponentResolver } from './project-component/project-component.resolver';
import { ProjectComponent } from './project.component';

const routes: Routes = [
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
