import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SimpleModalComponent } from 'ngx-simple-modal';
import { User } from 'src/app/core/interfaces/user-interface';
import { ProjectService } from 'src/app/core/services/project.service';

@Component({
  selector: 'app-workers-modal',
  templateUrl: './workers-modal.component.html',
  styleUrls: ['./workers-modal.component.scss'],
})
export class WorkersModalComponent extends SimpleModalComponent<any, string> {

@Input() workers: Array<User> = []
@Input() project: string = ''

public worker = new FormControl('');

public invalid = ''

  constructor(
    private projectService: ProjectService
  ) {
    super();
  }

  closeModal() {
    this.close()
  }

  addWorker() {
    this.projectService.addProjectWorkers(this.project, this.worker.value).subscribe((res) => {
      if (res == "ok") {
        this.close()
      } else {
        this.invalid = 'This person has no account.'
      }
    })
  }

  removeWorker(uid: string) {
    this.projectService.removeProjectWorkers(this.project, uid).subscribe((res) => {
      if (res == "ok") {
        this.close()
      } else {
        this.invalid = 'Cannot remove owner from project.'
      }
    })
  }

}
