import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';
import { FetchUser, Logout } from 'src/app/shared/store/user.actions';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user-interface';

@Injectable({
  providedIn: 'root'
})
export class SignService {

  private API_URL = environment.apiURL;

  constructor(
    private fireAuth: AngularFireAuth,
    private httpClient: HttpClient,
    private store: Store,
    private toastr: ToastrService,
  ) {}


  completeRegister(data: User) {
    return this.httpClient.post(`${this.API_URL}/users/register/`, data, {responseType: 'text'})
  }

  SignIn(data: User) {
    return this.fireAuth.signInWithEmailAndPassword(data.useremail, data.password!).then(() => {
      this.store.dispatch(new FetchUser())
    }).catch((e) => {
      if (e.code == 'auth/invalid-email') {
        this.toastr.error('Invalid email.')
      }
      if (e.code == 'auth/user-not-found') {
        this.toastr.error('User does not exist.')
      }
    });
  }

  SignUp(data: User) {
    return this.fireAuth.createUserWithEmailAndPassword(data.useremail, data.password!)
    .catch((e) => {
      if (e.code == 'auth/invalid-email') {
        this.toastr.error('Invalid email.')
      }
      if (e.code == 'auth/weak-password') {
        this.toastr.error('Password should be at least 6 characters.')
      }
      if (e.code == 'auth/email-already-in-use') {
        this.toastr.error("Email is already in use.")
      }
    })
    .then((user) => {
      let userData = {
        "uid": user!.user!.uid,
        "useremail": data.useremail,
        "username": data.username,
      }

        this.completeRegister(userData).subscribe()
    }).then(() => {
      this.store.dispatch(new FetchUser())
    })
  }

  SignOut() {
    this.store.dispatch(new Logout());
    return this.fireAuth.signOut()
  }

  
}
