import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Store } from '@ngxs/store';
import { environment } from 'src/environments/environment';

import { switchMap, take } from 'rxjs/operators';
import { User } from '../interfaces/user-interface';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_URL = environment.apiURL;

  constructor(
    private fireAuth: AngularFireAuth,
    private httpClient: HttpClient,
  ) {}
  
  getSelf() {
    return this.fireAuth.authState.pipe(take(1), switchMap(res => {
      if (res) {
      return this.httpClient.post<User>(`${this.API_URL}/users/self/`, {"uid": res!.uid})
      } else {
        return of()
      }
    }));
  }
}
