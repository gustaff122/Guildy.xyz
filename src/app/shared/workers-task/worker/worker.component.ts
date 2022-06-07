import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { User } from 'src/app/core/interfaces/user-interface';

@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkerComponent implements OnInit{

  @Input()
  worker!: User

  @Input() selected: boolean = true

  @Output() useremailEmit = new EventEmitter<Object>();

  ngOnInit(): void {
    if (this.selected == true) {
      this.emit()
    }
  }

  emit() {
    let obj = {
      selected: this.selected,
      worker: this.worker.useremail,
      uid: this.worker.uid
    }
    this.useremailEmit.emit(obj);
  }

}
