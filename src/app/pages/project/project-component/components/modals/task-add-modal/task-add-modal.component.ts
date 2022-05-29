import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SimpleModalComponent } from 'ngx-simple-modal';
import { ProjectService } from 'src/app/core/services/project.service';

@Component({
  selector: 'app-task-add-modal',
  templateUrl: './task-add-modal.component.html',
  styleUrls: ['task-add-modal.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskAddModalComponent extends SimpleModalComponent<any, string> implements OnInit {

@Input() header!: string;
@Input() id!: string;

  public form: FormGroup
  public showError = false

  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjectService
  ) {
    super()
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      deadline: ['', Validators.required],
      category: []
    })
   }

   ngOnInit(): void {
    let header = this.header.toLowerCase()
    this.form.patchValue({
      category: header
    })
   }

   async addTask() {
    if (this.form.valid) {
      this.projectService.createTask(this.form.value, this.id).subscribe(() => {
        this.close()
      })
    } else {
      this.showError = true
    }
    
   }

   closeModal() {
     this.close()
   }
}
