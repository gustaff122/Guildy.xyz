import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable, switchMap, take } from 'rxjs';
import { ProjectService } from 'src/app/core/services/project.service';
import { SignService } from 'src/app/core/services/sign.service';
import { UserState } from 'src/app/shared/store/user.state';

@Component({
  selector: 'app-main-pages',
  templateUrl: './main-pages.component.html',
  styleUrls: ['./main-pages.component.scss']
})
export class MainPagesComponent {

  @Select(UserState.user) user$: Observable<any> | undefined;

  public projects = this.activatedRoute.snapshot.data[0]

  constructor(
    private activatedRoute: ActivatedRoute,
  ) { }


}
