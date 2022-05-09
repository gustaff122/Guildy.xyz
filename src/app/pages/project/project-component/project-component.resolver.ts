import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { delay, Observable, switchMap } from "rxjs";
import { Project } from "src/app/core/interfaces/project-interface";
import { ProjectService } from "src/app/core/services/project.service";
import { take } from "rxjs";
import { SignService } from "src/app/core/services/sign.service";
import { AngularFireAuth } from "@angular/fire/compat/auth";

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