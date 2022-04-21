import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { FetchUser, Logout } from 'src/app/shared/store/user.actions';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user-interface';
import { UserMin } from '../interfaces/user-min-interface';
import { SignService } from './sign.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_URL = environment.apiURL;

  constructor(
    private FireAuth: AngularFireAuth,
    private httpClient: HttpClient,
    private store: Store,
    private signService: SignService
  ) {}


  completeRegister(data: UserMin) {
    return this.httpClient.post<UserMin>(`${this.API_URL}/users/register/`, data).subscribe()
  }

  SignIn(data: User) {
    return this.FireAuth.signInWithEmailAndPassword(data.UserEmail, data.password).then(() => {
      this.store.dispatch(new FetchUser())
    })
  }

  SignUp(data: User) {
    return this.FireAuth.createUserWithEmailAndPassword(data.UserEmail, data.password).then((user) => {
      let userData = {
        "UID": user!.user!.uid,
        "UserEmail": data.UserEmail,
        "UserName": data.UserName,
        
      }
        this.completeRegister(userData)
    }).then(() => {
      this.store.dispatch(new FetchUser())
    })
  }

  SignOut() {
    this.store.dispatch(new Logout());
    return this.FireAuth.signOut()
  }

  
}
