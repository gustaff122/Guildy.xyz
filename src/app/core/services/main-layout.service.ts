import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Subject } from 'rxjs';
import { Project } from '../interfaces/project-interface';
import { ProjectService } from './project.service';

@Injectable({
  providedIn: 'root'
})
export class MainLayoutService {
  public subject = new Subject();

  constructor(
    private projectService: ProjectService,
    private fireAuth: AngularFireAuth,
  ) { }

  patchList() {
    this.fireAuth.authState.subscribe(res => {
      this.projectService.getAllProjects(res!.uid).subscribe((data) => {
        this.subject.next(data)
      })
    })
  }
}
