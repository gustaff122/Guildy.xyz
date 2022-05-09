import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
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
    private projectService: ProjectService
  ) {
    super()
  }

  patchProjectName() {
    this.projectService.patchProjetName(this.title, this.id)
  }

  closeModal() {
    this.close()
  }
}
