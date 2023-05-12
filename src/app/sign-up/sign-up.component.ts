import { Component, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../shared/user';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  firstName: string = ""; lastName: string = ""; email: string = ""; phone: string = ""; password: string = ""; confirmPassword: string = "";
  repeatedEmail: boolean = false; repeatedPhone: boolean = false;
  @ViewChild('passwordRef', {read: ElementRef}) passwordInput!: ElementRef<HTMLInputElement>;
  @ViewChild('confirmPasswordRef', {read: ElementRef}) confirmPasswordInput!: ElementRef<HTMLInputElement>;

  constructor(private router: Router){}

  togglePassword() {
    if (this.passwordInput.nativeElement.type === "password") { this.passwordInput.nativeElement.type = "text"; }
    else { this.passwordInput.nativeElement.type = "password"; }
  }

  toggleConfirmPassword() {
    if (this.confirmPasswordInput.nativeElement.type === "password") { this.confirmPasswordInput.nativeElement.type = "text"; }
    else { this.confirmPasswordInput.nativeElement.type = "password"; }
  }

  onsignupFormSubmit(signupForm: NgForm){
    this.repeatedEmail = User.users.some((user: User) => { return user.email === this.email; });
    this.repeatedPhone = User.users.some((user: User) => { return user.phone === this.phone; });
    if (!this.repeatedEmail && !this.repeatedPhone){
      User.users.push(new User(this.firstName, this.lastName, this.email, this.phone, this.password));
      this.router.navigate(['/contacts']); signupForm.reset();
    }
  }
}