import { Component, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../shared/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = "Gojo@gmail.com"; password = "123456";
  @ViewChild('passwordRef', {read: ElementRef}) passwordInput!: ElementRef<HTMLInputElement>;
  failure = false;

  constructor(private router: Router){}

  onLoginFormSubmit(loginForm: NgForm) {
    let found = false;
    for (let i = 0; i < User.users.length; i++){
      if (User.users[i].email === this.email && User.users[i].password === this.password){
        User.loggedUser = User.users[i]; this.router.navigate(['/contacts']);
        loginForm.reset(); found = true; break;
      }
    }
    if (!found) { this.failure = true; }
  }

  togglePassword() {
    if (this.passwordInput.nativeElement.type === "password") { this.passwordInput.nativeElement.type = "text"; }
    else { this.passwordInput.nativeElement.type = "password"; }
  }
}