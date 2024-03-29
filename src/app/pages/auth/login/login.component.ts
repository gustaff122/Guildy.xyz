import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SignService } from 'src/app/core/services/sign.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public form: FormGroup;
  public toggle = 'password';

  constructor(
    private formBuilder: FormBuilder,
    private signService: SignService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.form = this.formBuilder.group({
      useremail: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      let email = (this.form.value.useremail).replace(/\s/g, '');
      this.form.patchValue({
        useremail: email
      })

      this.signService.signIn(this.form.value).then(() => {
        this.router.navigate(['project'])
      })
    } else {
      this.toastr.error('Fields are required')
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
