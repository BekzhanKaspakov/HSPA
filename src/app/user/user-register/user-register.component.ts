import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserServiceService } from 'src/app/services/user-service.service';
import { User } from 'src/app/model/user';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  registrationForm: FormGroup;
  user: User;
  userSubmitted : boolean;
  constructor(private fb: FormBuilder, private userService: UserServiceService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.createRegistrationForm();
  }

  createRegistrationForm() {
    this.registrationForm = this.fb.group({
      userName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, [Validators.required]],
      mobile: [null, [Validators.required, Validators.maxLength(10)]]
    }, {validators: this.passwordMatchingValidator});
  }

  passwordMatchingValidator(fg: FormGroup) : Validators {
    return fg.get('password').value === fg.get('confirmPassword').value ? null : {notmatched : true}
  }

  onSubmit() {
    this.userSubmitted = true;
    if (this.registrationForm.valid) {
      this.userService.addUser(this.userData());
      this.registrationForm.reset();
      this.alertify.success('Successfuly registered');
    } else {
      this.alertify.error('Kindly provide the required fields');
    }

  }

  userData(): User {
    return this.user = {
      userName: this.registrationForm.get('userName').value,
      email: this.registrationForm.get('email').value,
      password: this.registrationForm.get('password').value,
      mobile: this.registrationForm.get('mobile').value,
    }
  }

}
