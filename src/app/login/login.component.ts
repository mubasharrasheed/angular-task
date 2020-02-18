import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {patternValidator} from '../helpers/pattern-validator';
import {Router} from '@angular/router';
import {ApiService} from '../services/api.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // Login Form
  loginForm = new FormGroup({
    // tslint:disable-next-line:max-line-length
    email: new FormControl('', [Validators.required, patternValidator(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
    password: new FormControl('', [Validators.required]),
  });
  accessToken;
  constructor(private router: Router, private apiService: ApiService, private toastr: ToastrService) { }

  ngOnInit() {
    this.accessToken = localStorage.getItem('token');
  }

  login() {
    this.apiService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(
      res => {
        console.log(res);
        if ( res.token ) {
          this.router.navigate(['/pages/home']);
        } else if ( res.user ) {
          console.log(res);
          this.toastr.error(res.message, 'Error');
        }
      },
      error => {
        this.toastr.error('An error occurred. Please try again!', 'Error');
      }
    );
  }

}
