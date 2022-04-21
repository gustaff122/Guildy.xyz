import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { UserMin } from 'src/app/core/interfaces/user-min-interface';
import { SignService } from 'src/app/core/services/sign.service';
import { UserService } from 'src/app/core/services/user.service';
import { environment } from 'src/environments/environment';
import { FetchUser, Login, Logout } from './user.actions';

export interface IUserStateModel {
  isLogged: boolean | null;
  user: {
      UID: string,
      UserEmail: string,
      UserName: string,
      color: string
  };
}

@State<IUserStateModel>({
  name: 'user',
  defaults: { //TEMP TODO
    isLogged: null,
    user: {
      UID: '',
      UserEmail: '',
      UserName: '',
      color: ''
    }
  },
})
@Injectable()
export class UserState {
  @Selector()
  static user(state: IUserStateModel): UserMin | null {
    return state.user;
  }

  @Selector()
  static isLogged(state: IUserStateModel): boolean | null {
    return state.isLogged;
  }

  constructor(
    private router: Router,
    private signService: SignService
  ) { }

  
  ngxsOnInit(ctx: StateContext<IUserStateModel>) {
    this.signService.getSelf().subscribe(res => {
      if (res) {
        return ctx.dispatch(new FetchUser());
      } else {
        return ctx.patchState({ isLogged: false });
      }
    });
    
  }

  @Action(FetchUser)
  FetchUser(ctx: StateContext<IUserStateModel>, action: FetchUser) {
    return this.signService.getSelf().subscribe(
      data => {
        ctx.patchState({ user: data, isLogged: true });
      }
    );
  }

  @Action(Login)
  Login(ctx: StateContext<IUserStateModel>, action: Login) {
    ctx.patchState({
      isLogged: true,
    });
    ctx.dispatch(new FetchUser());
  }

  @Action(Logout)
  Logout(ctx: StateContext<IUserStateModel>, action: Logout) {
    ctx.patchState({
      isLogged: false,
    });
    this.router.navigateByUrl('/auth/login');
    return null;
  }




}
