import { Component, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
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

  constructor(public authService: AuthService, private routingService: RoutingService){}

  ngOnInit(){
    this.routingService.headerNeeded = false;
  }

  togglePassword() {
    if (this.passwordInput.nativeElement.type === "password") { this.passwordInput.nativeElement.type = "text"; }
    else { this.passwordInput.nativeElement.type = "password"; }
  }

  onsignupFormSubmit(signupForm: NgForm){
      this.authService.createUser(this.firstName, this.lastName, this.email, this.password, signupForm);
  }
}