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

  onSubmit(userForm: NgForm){
    User.users.push(new User(userForm.value.fullName.firstname, userForm.value.fullName.lastname,
      userForm.value.EmailAndPhone.email, userForm.value.EmailAndPhone.phone));
    userForm.reset();
  }
}