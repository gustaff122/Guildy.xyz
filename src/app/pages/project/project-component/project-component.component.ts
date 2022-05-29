import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { SimpleModalService } from 'ngx-simple-modal';
import { Subject, takeUntil } from 'rxjs';
import { ProjectService } from 'src/app/core/services/project.service';
import { TitleEditModalComponent } from './components/modals/title-edit-modal/title-edit-modal.component';

@Component({
  templateUrl: './project-component.component.html',
  styleUrls: ['./project-component.component.scss']
})
export class ProjectComponentComponent implements OnInit {

  public selectedWorker: any;
  
  private destroy$: Subject<void> = new Subject<void>();

  public project = this.activatedRoute.snapshot.data[0]
  public id = this.activatedRoute.snapshot.params['id']

  constructor(
    private activatedRoute: ActivatedRoute,
    private simpleModalService: SimpleModalService,
    private projectService: ProjectService,
  ) {
  }



  setRoute() {
    this.activatedRoute.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.projectService.getProject(params['id']).subscribe(res => {
        this.project = res
      })
    })
  }

  ngOnInit(): void {
    this.setRoute()
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public workers = this.project.workers

  openTitleEditModal() {
    this.simpleModalService.addModal(TitleEditModalComponent, {title: this.project.title, id: this.id}).pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.setRoute()
    });
  }

}
