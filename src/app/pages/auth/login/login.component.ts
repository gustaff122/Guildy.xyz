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
  public toggle = 'password'

  constructor(
    private formBuilder: FormBuilder,
    private UserService: UserService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      useremail: [],
      password: []
    });
  }

  onSubmit() {
    this.UserService.SignIn(this.form.value).then(() => {
      this.router.navigate(['project'])
    })
  }

  onToggle() {
    if (this.toggle == 'password') {
      this.toggle = 'text'
    } else {
      this.toggle = 'password'
    }
  }

}
