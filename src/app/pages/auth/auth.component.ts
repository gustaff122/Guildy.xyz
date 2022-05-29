import { Component, OnInit } from '@angular/core';
import  {trigger, transition, useAnimation}  from  "@angular/animations";
import  {fromLeftEasing, rotateCubeToLeft}  from  "ngx-router-animations";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
}
