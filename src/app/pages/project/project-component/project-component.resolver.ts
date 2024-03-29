import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Project } from "src/app/core/interfaces/project-interface";
import { ProjectService } from "src/app/core/services/project.service";

@Injectable({ providedIn: 'root' })
export class ProjectComponentResolver implements Resolve<Project> {
  constructor(
    private projectService: ProjectService,
    ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Project> {
      let id = route.params['id'];
      return this.projectService.getProject(id)

  }
  
}