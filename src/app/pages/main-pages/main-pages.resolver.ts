import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable, switchMap, take } from "rxjs";
import { Project } from "src/app/core/interfaces/project-interface";
import { ProjectService } from "src/app/core/services/project.service";
import { SignService } from "src/app/core/services/sign.service"
import { AngularFireAuth } from "@angular/fire/compat/auth";

@Injectable({ providedIn: 'root' })
export class MainPagesResolver implements Resolve<Project> {
  constructor(
    private projectService: ProjectService,
    private signService: SignService,
    private fireAuth: AngularFireAuth
    ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Project> {
    return this.fireAuth.authState.pipe(take(1), switchMap(res => {
        return this.projectService.getAllProjects(res!.uid)
      }))
      

  }
  
}