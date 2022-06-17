import { Component, ChangeDetectionStrategy, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SimpleModalComponent } from 'ngx-simple-modal';
import { ToastrService } from 'ngx-toastr';
import { MainLayoutService } from 'src/app/core/services/main-layout.service';
import { ProjectService } from 'src/app/core/services/project.service';

@Component({
  selector: 'app-task-modal',
  templateUrl: './title-edit-modal.component.html',
  styleUrls: ['./title-edit-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitleEditModalComponent extends SimpleModalComponent<any, string> implements OnInit {

  public form

  @Input() title!: string
  @Input() id!: string

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private mainLayoutService: MainLayoutService
  ) {
    super();
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(64)]],
    });
  }

  ngOnInit(): void {
    this.form.patchValue({
      name: this.title
    })
  }


  patchProjectName() {
    if (this.form.valid) {
      let projectPatchName = {
        title: this.form.value.name,
        id: this.id
      }
      
      this.projectService.patchProjetName(projectPatchName).subscribe(() => {
        this.mainLayoutService.patchList()
        this.close()
      })
    } else {
      this.toastr.error('Title should have at least 2 characters and less than 65.')
    }
    
  }

  removeProject() {
    this.projectService.deleteProject(this.id).subscribe(() => {
      this.router.navigate(['/project'])
    })
  }

  closeModal() {
    this.close()
  }
}
