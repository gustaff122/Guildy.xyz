import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SimpleModalService } from 'ngx-simple-modal';
import { Subject, takeUntil } from 'rxjs';
import { TitleEditModalComponent } from './components/modals/title-edit-modal/title-edit-modal.component';

@Component({
  templateUrl: './project-component.component.html',
  styleUrls: ['./project-component.component.scss']
})
export class ProjectComponentComponent {

  public selectedWorker: any;
  
  private destroy$: Subject<void> = new Subject<void>();

  public project = this.activatedRoute.snapshot.data[0]
  public id = this.activatedRoute.snapshot.params['id']

  constructor(
    private activatedRoute: ActivatedRoute,
    private simpleModalService: SimpleModalService
  ) {
  }

  public workers = [
      { id: 1, name: 'Błażej Kłopotek' },
      { id: 2, name: 'Maciej Megier' },
      { id: 3, name: 'Szymon Bartoszewski' },
      { id: 4, name: 'Adrian Żyła' },
  ];

  openTitleEditModal() {
    this.simpleModalService.addModal(TitleEditModalComponent, {title: this.project.title, id: this.id}).pipe(takeUntil(this.destroy$)).subscribe();
  }

  lol() {
    console.log(this.project.todos)
  }

}
