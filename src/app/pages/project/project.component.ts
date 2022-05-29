import { trigger, transition, group, query, style, animate, keyframes } from '@angular/animations';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  animations: [
    trigger('routeSlide', [
      transition('* <=> *', [
        group([
          query(':enter', [
            style({opacity: 0, position: 'absolute', top: 0, width: '100%'}),
            animate('0.3s 0.4s ease-in-out', style({opacity: 1}))
          ], {optional: true}),
          query(':leave', [
            style({opacity: 1}),
            animate('0.3s ease-in-out', style({opacity: 0}))
          ], {optional: true}),
        ])
      ])
    ])
  ]
})
export class ProjectComponent {
  getState(outletRef: RouterOutlet) {
    return {
      value: outletRef.activatedRoute.snapshot.params['id']
    }
  } 
}
