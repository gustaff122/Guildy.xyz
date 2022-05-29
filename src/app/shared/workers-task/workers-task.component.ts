import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
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

  public unusedWorkers: Array<User> = []

  constructor() { }

  ngOnInit(): void {
    const workersMap = this.workers.map(({ uid }) => uid);
    this.unusedWorkers = this.allWorkers.filter(({ uid }) => !workersMap.includes(uid));
  }

}
