import { Component, ViewChild, ElementRef } from '@angular/core';
import { User } from '../shared/user';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css']
})
export class AccountPageComponent {
  loggedUser = User.loggedUser;
  loggedUserIndex: number = User.users.findIndex((user: User) => { return user.email = this.loggedUser.email; });
  repeatedEmail: boolean = false; repeatedPhone: boolean = false; successfulUpdate = false;
  @ViewChild('passwordRef', {read: ElementRef}) passwordInput!: ElementRef<HTMLInputElement>;

  togglePassword() {
    if (this.passwordInput.nativeElement.type === "password") { this.passwordInput.nativeElement.type = "text"; }
    else { this.passwordInput.nativeElement.type = "password"; }
  }

  onAccountFormSubmit(accountForm: NgForm){
    for (let i = 0; i < User.users.length; i++){
      if (i === this.loggedUserIndex) { continue; }
      if (User.users[i].email === this.loggedUser.email) { this.repeatedEmail = true; }
      if (User.users[i].phone === this.loggedUser.phone) { this.repeatedPhone = true; }
    }
    if (!this.repeatedEmail && !this.repeatedPhone){ this.successfulUpdate = true; }
  }
}