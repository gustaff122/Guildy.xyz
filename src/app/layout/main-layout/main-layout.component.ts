import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import { UserState } from 'src/app/shared/store/user.state';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {

  @Select(UserState.user) user$: Observable<any> | undefined;


  constructor(
    private userService: UserService,
    private router: Router
  ) {

  }


  logOut() {
    this.userService.SignOut()
  }


}
