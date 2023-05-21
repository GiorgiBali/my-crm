import { Component, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { RoutingService } from '../shared/routing.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  firstName = ""; lastName = ""; email = ""; password = "";
  @ViewChild('passwordRef', {read: ElementRef}) passwordInput!: ElementRef<HTMLInputElement>;

  constructor(private router: Router, public authService: AuthService, private routingService: RoutingService){}

  togglePassword() {
    if (this.passwordInput.nativeElement.type === "password") { this.passwordInput.nativeElement.type = "text"; }
    else { this.passwordInput.nativeElement.type = "password"; }
  }

  onsignupFormSubmit(signupForm: NgForm){
      this.authService.createUser(this.firstName, this.lastName, this.email, this.password, this.router, signupForm);
      this.routingService.headerNeeded = true;
  }
}