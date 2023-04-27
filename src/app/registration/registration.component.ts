import { Component, OnInit } from '@angular/core';
import { User } from '../User';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  firstName!: string;
  lastName!: string;
  email!: string;
  phone!: string;

  onSubmit(){
    User.users.push(new User(this.firstName, this.lastName, this.email, this.phone));
    this.firstName = ""; this.lastName = ""; this.email = ""; this.phone = "";
  }
}