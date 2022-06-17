
import { Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { filter, map, Observable, of } from 'rxjs';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],

})
export class ProjectComponent implements OnInit {

  loading$: Observable<boolean> = of(false);

  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    ) {}

  ngOnInit(): void {
    this.spinner.show()

    this.loading$ = this.router.events.pipe(
      filter(
        (e) =>
          e instanceof NavigationStart ||
          e instanceof NavigationEnd ||
          e instanceof NavigationCancel ||
          e instanceof NavigationError
      ),
      map((e) => e instanceof NavigationStart)
    );
  }

  
 
}
