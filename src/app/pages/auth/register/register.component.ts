import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SignService } from 'src/app/core/services/sign.service';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  public form: FormGroup
  public toggle = 'password'

  constructor(
    private formBuilder: FormBuilder,
    private signService: SignService,
    private router: Router,
    private toastr: ToastrService
  ) { 

    this.form = this.formBuilder.group({
      useremail: ['', Validators.required],
      username: ['', [Validators.required, Validators.maxLength(42)]],
      password: ['', [Validators.required, Validators.maxLength(42)]]
    })
  }

  onSubmit() {
    if(this.form.valid) {
      let email = (this.form.value.useremail).replace(/\s/g, '');
      this.form.patchValue({
        useremail: email
      })
      this.signService.SignUp(this.form.value).then(() => {
        this.router.navigate(['/project'])
      })
    } else {
      this.toastr.error('Fields are necessary')
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
