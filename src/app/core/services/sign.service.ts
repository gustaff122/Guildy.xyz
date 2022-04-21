import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Store } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import { UserMin } from '../interfaces/user-min-interface';

import { switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SignService {

  private API_URL = environment.apiURL;

  constructor(
    private fireAuth: AngularFireAuth,
    private httpClient: HttpClient,
    private store: Store,
  ) {
  }
  
  getSelf() {
    return this.fireAuth.authState.pipe(take(1), switchMap(res => {
      return this.httpClient.post<any>(`${this.API_URL}/users/self/`, {"UID": res!.uid}) //temp ANY
    }));
  }
}
