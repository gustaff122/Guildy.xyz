import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private UserService: UserService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      UserEmail: [],
      password: []
    });
  }

  onSubmit() {
    this.UserService.SignIn(this.form.value).then(() => {
      this.router.navigate(['project'])
    })
  }

}
