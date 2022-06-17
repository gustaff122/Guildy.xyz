import { DatePipe } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SimpleModalComponent } from 'ngx-simple-modal';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/core/interfaces/user-interface';
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
@Input() projectworkers: Array<User> = []

  public form: FormGroup
  public patchedWorkers: Array<string> = []

  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private toastr: ToastrService,
    private datePipe: DatePipe,
  ) {
    super()
    this.form = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(48)]],
      description: ['', [Validators.maxLength(1024)]],
      deadline: ['', Validators.required],
      workers: [],
      category: []
    })
   }

   ngOnInit(): void {
    let cat = '';
    let defaultDate = new Date()

    defaultDate.setDate(defaultDate.getDate() + 7);

    if (this.header == "Next Up") {
      cat = "todos"
    }

    if (this.header == "In Progress") {
      cat = "wips"
    }

    if (this.header == "Completed") {
      cat = "completed"
    }

    let date = this.datePipe.transform(defaultDate, 'yyyy-MM-dd');

    this.form.patchValue({
      category: cat,
      deadline: date
    })
   }

   addTask() {
    this.form.patchValue({
      workers: this.patchedWorkers
    })

    if (this.form.valid) {
      this.projectService.createTask(this.form.value, this.id).subscribe(() => {
        this.close()
      })
    } else {
      this.toastr.error("Title is required (max 48 characters). Description should not have more than 1024 characters.")
    }
    
   }

   getWorkers(list: Array<string>) {
    this.patchedWorkers = list;
  }

   closeModal() {
     this.close()
   }
}
