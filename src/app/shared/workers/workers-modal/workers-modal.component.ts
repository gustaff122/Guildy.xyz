import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-workers-modal',
  templateUrl: './workers-modal.component.html',
  styleUrls: ['./workers-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkersModalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
