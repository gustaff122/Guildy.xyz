import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SimpleModalComponent } from 'ngx-simple-modal';
import { ToastrService } from 'ngx-toastr';
import { TaskInterface } from 'src/app/core/interfaces/task-interface';
import { User } from 'src/app/core/interfaces/user-interface';
import { ProjectService } from 'src/app/core/services/project.service';
import { TaskService } from 'src/app/core/services/task.service';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.scss'],
})
export class TaskModalComponent extends SimpleModalComponent<any, string> implements OnInit {

@Input() taskData!: TaskInterface;
@Input() projectid!: string;
@Input() projectworkers: Array<User> = []

public patchedWorkers: Array<string> = []

public task!: TaskInterface
public form: FormGroup

  constructor(
    private taskService: TaskService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
    super()
    this.form = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(48)]],
      description: ['', [Validators.maxLength(1024)]],
      deadline: ['', Validators.required],
      category: [],
      id: [],
      workers: [],
      position: []
    })
  }
  
  ngOnInit(): void {
      this.form.patchValue({
        title: this.taskData.title,
        description: this.taskData.description,
        deadline: this.taskData.deadline,
        category: this.taskData.category,
        id: this.taskData.id,
        workers: this.taskData.workers,
        position: this.taskData.position
      })

    
  }

  getWorkers(list: Array<string>) {
    this.patchedWorkers = list;
  }

  patchTask() {
    this.form.patchValue({
      workers: this.patchedWorkers
    })

    if (this.form.valid) {
      this.taskService.patchTask(this.form.value, this.projectid).subscribe(() => {
        this.close()
      })
    } else {
      this.toastr.error("Title is required (max 48 characters). Description should not have more than 1024 characters.")
    }
  }

  removeTask() {
    this.taskService.removeTask(this.projectid, this.taskData.id).subscribe(() => {
      this.close()
    })
  }

  closeModal() {
    this.close()
  }
}
