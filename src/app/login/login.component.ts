import { Component, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = "giobali1998@gmail.com"; password = "1234567";
  @ViewChild('passwordRef', {read: ElementRef}) passwordInput!: ElementRef<HTMLInputElement>;

  constructor(private router: Router, public authService: AuthService){}

  onLoginFormSubmit(loginForm: NgForm) {
    this.authService.signInUser(this.email, this.password, this.router, loginForm);
  }

  togglePassword() {
    if (this.passwordInput.nativeElement.type === "password") { this.passwordInput.nativeElement.type = "text"; }
    else { this.passwordInput.nativeElement.type = "password"; }
  }
}