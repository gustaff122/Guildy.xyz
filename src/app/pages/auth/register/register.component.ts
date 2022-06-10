import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  public form: FormGroup
  public toggle = 'password'

  constructor(
    private formBuilder: FormBuilder,
    private UserService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) { 

    this.form = this.formBuilder.group({
      useremail: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmit() {
    if(this.form.valid) {
      let email = (this.form.value.useremail).replace(/\s/g, '');
      this.form.patchValue({
        useremail: email
      })
      this.UserService.SignUp(this.form.value).then(() => {
        this.router.navigate(['/welcome'])
      })
    } else {
      this.toastr.error('Fields: e-mail, name and password are necessary')
    }
    
  }

  onToggle() {
    if (this.toggle == 'password') {
      this.toggle = 'text'
    } else {
      this.toggle = 'password'
    }
  }

}
