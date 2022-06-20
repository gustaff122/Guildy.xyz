import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { SimpleModalService } from 'ngx-simple-modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Project } from 'src/app/core/interfaces/project-interface';
import { MainLayoutService } from 'src/app/core/services/main-layout.service';
import { SignService } from 'src/app/core/services/sign.service';
import { UserState } from 'src/app/shared/store/user.state';
import { CreateProjectModalComponent } from './create-project-modal/create-project-modal.component';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent  {

  @Select(UserState.user) user$: Observable<any> | undefined;

  public userProjects = this.activatedRoute.snapshot.data[0]

  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private signService: SignService,
    private simpleModalService: SimpleModalService,
    private activatedRoute: ActivatedRoute,
    private mainLayoutService: MainLayoutService,
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


  ngAfterViewInit() {
    this.mainLayoutService.subject.subscribe((data) => {
      this.userProjects = data
    })
  }

  createProject() {
    this.simpleModalService.addModal(CreateProjectModalComponent, ).pipe(takeUntil(this.destroy$)).subscribe()
  }

  logOut() {
    this.signService.signOut()
  }

}
