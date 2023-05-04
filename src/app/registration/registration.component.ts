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
  repeatedEmail: boolean = false; repeatedPhone: boolean = false; profiles: User[] = User.users;

  checkRepeatedEmail(){
    return this.profiles.some((user: User) => { return user.email === this.email; });
  }

  checkInvalidPhone(){
    return this.profiles.some((user: User) => { return user.phone === this.phone; });
  }

  onSubmit(userForm: NgForm){
    this.repeatedEmail = this.checkRepeatedEmail(); this.repeatedPhone = this.checkInvalidPhone();
    if (userForm.valid && !this.repeatedEmail && !this.repeatedPhone){
      User.users.push(new User(userForm.value.fullName.firstname, userForm.value.fullName.lastname, userForm.value.EmailAndPhone.email, userForm.value.EmailAndPhone.phone));
      userForm.reset();
    }
  }
}