import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../services/alertify.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  loggedinUser: string;
  constructor(private alertify: AlertifyService) { }

  ngOnInit() {
  }

  loggedin() {
    this.loggedinUser = JSON.parse(localStorage.getItem('token'));
    return localStorage.getItem('token');
  }

  onLogout() {
    this.alertify.success('Successfully logged out')
    localStorage.removeItem('token');
  }
}
