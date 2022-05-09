import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  public form: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private UserService: UserService,
    private router: Router
  ) { 

    this.form = this.formBuilder.group({
      useremail: [],
      username: [],
      password: []
    })
  }

  onSubmit() {
    this.UserService.SignUp(this.form.value).then(() => {
      this.router.navigate(['project'])
    })
  }

}
