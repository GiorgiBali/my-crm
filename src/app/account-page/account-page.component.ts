import { Component, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css']
})
export class AccountPageComponent {
  password = ""; @ViewChild('passwordRef', {read: ElementRef}) passwordInput!: ElementRef<HTMLInputElement>;

  constructor(public authService: AuthService){}

  ngOnInit(){
    this.authService.successfulUserDetailsUpdate = false; this.authService.failedUserDetailsUpdate = false; this.authService.repeatedEmail = false;
    this.authService.successfulPswUpdate = false; this.authService.failedPswUpdate = false;
  }

  togglePassword() {
    if (this.passwordInput.nativeElement.type === "password") { this.passwordInput.nativeElement.type = "text"; }
    else { this.passwordInput.nativeElement.type = "password"; }
  }

  onUserDetailsFormSubmit(accountForm: NgForm){
    this.authService.setUserName(this.authService.user, this.authService.firstName, this.authService.lastName);
    this.authService.setUserEmail(this.authService.user, this.authService.email);
  }

  onUpdatePasswordFormSubmit(updatePasswordForm: NgForm){
    this.authService.setUserPassword(this.authService.user, this.password);
    updatePasswordForm.reset();
  }
}