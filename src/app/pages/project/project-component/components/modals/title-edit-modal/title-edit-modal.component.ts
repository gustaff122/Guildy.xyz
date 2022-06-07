import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SimpleModalComponent } from 'ngx-simple-modal';
import { TaskInterface } from 'src/app/core/interfaces/task-interface';
import { ProjectService } from 'src/app/core/services/project.service';

@Component({
  selector: 'app-task-modal',
  templateUrl: './title-edit-modal.component.html',
  styleUrls: ['./title-edit-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitleEditModalComponent extends SimpleModalComponent<any, string> {

  @Input() title!: string
  @Input() id!: string

  constructor(
    private projectService: ProjectService,
    private router: Router
  ) {
    super()
  }


  patchProjectName() {
    let projectPatchName = {
      title: this.title,
      id: this.id
    }
    
    this.projectService.patchProjetName(projectPatchName).subscribe(() => {
      this.close()
    })
  }

  removeProject() {
    this.projectService.deleteProject(this.id).subscribe(() => {
      this.router.navigate(['/welcome'])
    })
  }

  closeModal() {
    this.close()
  }
}
