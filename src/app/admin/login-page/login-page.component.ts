import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User } from 'src/app/shared/interfaces';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  form: FormGroup
  message: string
  
  constructor(
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['loginAgain']){
        this.message = 'please, login to see dashboard and create task'
      }
    })

    this.form = new FormGroup({
      email:new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ])
    })
  }


  submit() {
    if (this.form.invalid){
      return
    }
    const user : User = {
      email : this.form.value.email,
      password : this.form.value.password,
      returnSecureToken: false
    }
    this.form.disable()
    this.auth.login(user).subscribe(() => {
      this.form.reset()
      this.router.navigate(['/admin','dashboard'])
    }, () => {
      this.form.enable()
    })
  }
}
