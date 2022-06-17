import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SimpleModalComponent } from 'ngx-simple-modal';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from 'src/app/core/services/project.service';

@Component({
  templateUrl: './create-project-modal.component.html',
  styleUrls: ['./create-project-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateProjectModalComponent extends SimpleModalComponent<any, string> {

  public form: FormGroup
  public disableAction = false

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
    super();
    this.form = this.formBuilder.group({
      name: ['Your Project', [Validators.required, Validators.minLength(2), Validators.maxLength(64)]],
    });
  }

  createProject() {
    if (this.form.valid) {
      this.disableAction = true
      this.projectService.createProject(this.form.value.name).subscribe(uid => {
          this.router.navigateByUrl(`/project/${uid}`);
          this.close()
      })
    }  else {
      this.toastr.error('Title should have at least 2 characters and less than 65.')
    }
    
  }

  closeModal() {
    this.close()
  }
}


