import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Form, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { User } from 'src/app/core/interfaces/user-interface';

@Component({
  selector: 'app-workers-task',
  templateUrl: './workers-task.component.html',
  styleUrls: ['./workers-task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkersTaskComponent implements OnInit {
  @Input() workers: Array<User> = []
  @Input() allWorkers: Array<User> = []
  @Output() emittedFunction  = new EventEmitter<Array<string>>();

  public unusedWorkers: Array<User> = []

  public workersList: Array<any> = []

  addToList(newItem: any) {
    this.workersList.push(newItem)

    for (let el of this.workersList) {
      if (el.selected == false) {
        this.workersList = this.workersList.filter(person => person.worker != el.worker)
        this.workersList = this.workersList.filter(person => person.selected != false)
      }
    }
    
    this.workersList = this.workersList.filter((value, index, self) =>
      index === self.findIndex((t) => (
        t.selected === value.selected && t.worker === value.worker
      ))
    )

    let list = []
    for (let el of this.workersList) {
      list.push(el.uid)
    }
   
    this.emittedFunction.emit(list);
  }

  
 

  ngOnInit(): void {
    const workersMap = this.workers.map(({ uid }) => uid);
    this.unusedWorkers = this.allWorkers.filter(({ uid }) => !workersMap.includes(uid));
  }


}
