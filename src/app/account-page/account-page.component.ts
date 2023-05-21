import { Component, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css']
})
export class AccountPageComponent {
  firstName = ""; lastName = ""; email = ""; password = "";
  repeatedEmail = false; successfulUpdate = false;
  @ViewChild('passwordRef', {read: ElementRef}) passwordInput!: ElementRef<HTMLInputElement>;

  constructor(public authService: AuthService){}

  togglePassword() {
    if (this.passwordInput.nativeElement.type === "password") { this.passwordInput.nativeElement.type = "text"; }
    else { this.passwordInput.nativeElement.type = "password"; }
  }

  restoreCurrentValues(){
    this.firstName = this.authService.currentFirstName;
    this.lastName = this.authService.currentLastName;
    this.email = this.authService.currentEmail;
  }

  onAccountFormSubmit(accountForm: NgForm){
    this.authService.setUserName(this.authService.user, this.firstName, this.lastName);
    this.authService.setUserEmail(this.authService.user, this.email);
    this.authService.setUserPassword(this.authService.user, this.password);
  }

  onUpdatePasswordFormSubmit(updatePasswordForm: NgForm){

  }
}