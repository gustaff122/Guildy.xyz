import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SimpleModalComponent } from 'ngx-simple-modal';
import { TaskInterface } from 'src/app/core/interfaces/task-interface';
import { User } from 'src/app/core/interfaces/user-interface';
import { ProjectService } from 'src/app/core/services/project.service';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskModalComponent extends SimpleModalComponent<any, string> implements OnInit {

@Input() task!: TaskInterface
@Input() projectid!: string;
@Input() projectworkers: Array<User> = []

public form: FormGroup

  constructor(
    private projectService: ProjectService,
    private formBuilder: FormBuilder
  ) {
    super()
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      deadline: ['', Validators.required],
      category: [],
      id: [],
      workers: []
    })
  }
  
  ngOnInit(): void {
    let workers: Array<string> = []
    for (let worker of this.task.workers) {
      workers.push(worker.uid!)
    }

    this.form.patchValue({
      title: this.task.title,
      description: this.task.description,
      deadline: this.task.deadline,
      category: this.task.category,
      id: this.task.id,
      workers: workers
    })

    this.projectService.getTaskCategory(this.projectid, this.task.id).subscribe(res => {
      this.form.patchValue({
        category: res,
      })
    })

    
  }

  patchTask() {
    this.projectService.patchTask(this.form.value, this.projectid).subscribe()
    this.close()
  }

  closeModal() {
    this.close()
  }
}
