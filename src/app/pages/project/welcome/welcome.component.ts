import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ProjectService } from 'src/app/core/services/project.service';
import { UserState } from 'src/app/shared/store/user.state';

@Component({
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {

  @Select(UserState.user) user$: Observable<any> | undefined;

  public projects = this.activatedRoute.snapshot.data[0]

  constructor(
    private projectService: ProjectService,
    private activatedRoute: ActivatedRoute,
  ) { }

  removeFromList(id: string) {
    for (let i = 0; i < this.projects.length; i++) {
      if (this.projects[i].project == id) {
        this.projects.splice(i, 1)
      }
    }
  }


  deleteProject(id: string) {
    this.projectService.deleteProject(id).subscribe(() => {
      this.removeFromList(id)
    })
  }

}
