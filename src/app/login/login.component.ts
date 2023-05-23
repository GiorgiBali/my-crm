import { Component, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { RoutingService } from '../shared/routing.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = ""; password = "";
  @ViewChild('passwordRef', {read: ElementRef}) passwordInput!: ElementRef<HTMLInputElement>;

  constructor(public authService: AuthService, private routingService: RoutingService){}

  ngOnInit(){
    this.routingService.headerNeeded = false;
  }

  togglePassword() {
    if (this.passwordInput.nativeElement.type === "password") { this.passwordInput.nativeElement.type = "text"; }
    else { this.passwordInput.nativeElement.type = "password"; }
  }

  onLoginFormSubmit(loginForm: NgForm) {
    this.authService.signInUser(this.email, this.password, loginForm);
  }
}