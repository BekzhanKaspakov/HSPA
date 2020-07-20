import { Component, OnInit } from '@angular/core';
import { NgForOf } from '@angular/common';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  constructor(private authService: AuthService,
              private alertify: AlertifyService,
              private router: Router) { }

  ngOnInit() {
  }

  onLogin(loginFrom: NgForm) {
    console.log(loginFrom.value);
    const token = this.authService.authUser(loginFrom.value);
    if (token) {
      localStorage.setItem('token', JSON.stringify(token.userName));
      this.alertify.success('You are successfully logged in');
      this.router.navigate(['/']);
    } else {
      this.alertify.error('No matches for this pair of username and password');
    }
  }

}
