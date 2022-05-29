import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { User } from 'src/app/core/interfaces/user-interface';
import { SignService } from 'src/app/core/services/sign.service';
import { FetchUser, Login, Logout } from './user.actions';

export interface IUserStateModel {
  isLogged: boolean | null;
  user: User | null;
}

@State<IUserStateModel>({
  name: 'user',
  defaults: {
    isLogged: null,
    user: null
  },
})
@Injectable()
export class UserState {
  @Selector()
  static user(state: IUserStateModel): User | null {
    return state.user;
  }

  @Selector()
  static isLogged(state: IUserStateModel): boolean | null {
    return state.isLogged;
  }

  constructor(
    private router: Router,
    private signService: SignService,
    private ngZone: NgZone
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
    this.ngZone.run(() => this.router.navigateByUrl('/auth/login'));
    return null;
  }




}
