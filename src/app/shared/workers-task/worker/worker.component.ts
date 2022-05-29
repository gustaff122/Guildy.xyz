import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { User } from 'src/app/core/interfaces/user-interface';

@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkerComponent {

  @Input()
  worker!: User;

  @Input() selected: boolean = true

  check() {
    this.selected = !this.selected
  }
  
}
