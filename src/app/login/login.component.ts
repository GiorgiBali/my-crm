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
  email = "giobali1998@gmail.com"; password = "123456";
  @ViewChild('passwordRef', {read: ElementRef}) passwordInput!: ElementRef<HTMLInputElement>;
  failure = false;

  constructor(private router: Router){}

  onLoginFormSubmit(loginForm: NgForm) {
    if (User.users.some((user: User) => { return user.email === this.email && user.password === this.password })){
      this.router.navigate(['/contacts']); loginForm.reset();
    }
    else { this.failure = true; }
  }

  togglePassword() {
    if (this.passwordInput.nativeElement.type === "password") { this.passwordInput.nativeElement.type = "text"; }
    else { this.passwordInput.nativeElement.type = "password"; }
  }
}