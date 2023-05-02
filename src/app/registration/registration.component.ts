import { Component, OnInit } from '@angular/core';
import { User } from '../User';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  firstName!: string; lastName!: string; email!: string; phone!: string;
  invalidForm: boolean = false;

  onSubmit(userForm: NgForm){
    if(userForm.form.invalid) { this.invalidForm = true; }
    else {
      this.invalidForm = false;
      User.users.push(new User(userForm.value.fullName.firstname, userForm.value.fullName.lastname,
        userForm.value.EmailAndPhone.email, userForm.value.EmailAndPhone.phone));
      userForm.reset();
    }
  }
}