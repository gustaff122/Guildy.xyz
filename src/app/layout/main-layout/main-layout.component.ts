import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable, switchMap, take } from 'rxjs';
import { Project } from 'src/app/core/interfaces/project-interface';
import { ProjectService } from 'src/app/core/services/project.service';
import { SignService } from 'src/app/core/services/sign.service';
import { UserService } from 'src/app/core/services/user.service';
import { UserState } from 'src/app/shared/store/user.state';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {

  @Select(UserState.user) user$: Observable<any> | undefined;

  public userProjects = this.router.snapshot.data[0]

  constructor(
    private userService: UserService,
    private projectService: ProjectService,
    private router: ActivatedRoute,
    private fireAuth: AngularFireAuth,
  ) {}


  logOut() {
    this.userService.SignOut()
  }

  createProject() {
    this.projectService.createProject()
    this.setRoute()
  }

  setRoute() {
    let uid = ''
    this.fireAuth.authState.pipe(take(1), switchMap(res => {
      return uid = res!.uid;
    }))

    this.projectService.getAllProjects(uid).subscribe((res) => {
      this.userProjects = res
    })
  }
}
