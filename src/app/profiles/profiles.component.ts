import { Component } from '@angular/core';
import { User } from '../User';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent {
  profiles: User[] = [];
  newFirstName!: string; newLastName!: string; newEmail!: string; newPhone!: string;
  currentIndex!: number;
  invalidForm: boolean = false; successfulUpdate: boolean = false;

  constructor() { }

  ngDoCheck(): void {
    if (User.query != "") { this.profiles = User.searchedUsers; }
    else { this.profiles = User.users; }
  }

  deleteProfile(i: number) {
    User.users.splice(i, 1);
  }

  updateProfile(profile: User, i: number) {
    this.currentIndex = i; this.successfulUpdate = false;
    this.newFirstName = profile.firstName; this.newLastName = profile.lastName; this.newEmail = profile.email; this.newPhone = profile.phone;
  }

  onUpdateSubmit(updateUserForm: NgForm){
    if(updateUserForm.form.invalid) { this.invalidForm = true; }
    else {
      this.invalidForm = false; this.successfulUpdate = true;
      User.users[this.currentIndex].firstName = this.newFirstName; User.users[this.currentIndex].lastName = this.newLastName;
      User.users[this.currentIndex].email = this.newEmail; User.users[this.currentIndex].phone = this.newPhone;
    }
  }
}
