import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user-interface';
import { UserService } from '../services/user.service'

@Injectable({
  providedIn: 'root'
})
export class ProjectAccessGuardGuard implements CanActivate {

  constructor(
    private userService: UserService,
    private router: Router
  ) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree | any {

      let projects: Array<string> = [];
      return this.userService.getSelf().toPromise().then((res) => {
        projects = res!.Projects!;

        let includes = projects.includes(route.params['id'])

        if (includes == true) {
          return true
        } else {
          this.router.navigate(['/project']);
          return true
        }
      })

      
  }
  
}
