import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  login() {
    console.log(this.loginForm.value);

    const { username, password } = this.loginForm.value;

    if (username && password)
      this.authService.login(username, password).subscribe((resp: any) => {
        console.log(resp, resp.token);
        if (resp.message) {
          localStorage.setItem('token', resp.token);
          this.toastr.success('Logged In Successfully');
        }
      });
  }
}
