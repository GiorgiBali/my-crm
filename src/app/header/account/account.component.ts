import { Component } from '@angular/core';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  firstName = ""; lastName = "";
  constructor(public authService: AuthService){}

  accountIconClick(){
    this.firstName = this.authService.firstName;
    this.lastName = this.authService.lastName;
  }
}
