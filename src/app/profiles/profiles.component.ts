import { Component } from '@angular/core';
import { User } from '../User';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent {
  profiles: User[] = [];
  newFirstName!: string; newLastName!: string; newEmail!: string; newPhone!: string;
  usersIndex!: number; searchedUsersIndex!: number;

  constructor() { }

  ngDoCheck(): void {
    if (User.query != "") { User.queryMode = true; this.profiles = User.searchedUsers; }
    else { User.queryMode = false; this.profiles = User.users; }
  }

  findUser(user: User) {
    return user.firstName === User.currentUser.firstName && user.lastName === User.currentUser.lastName && user.email === User.currentUser.email && user.phone === User.currentUser.phone;
  }

  deleteProfile(i: number) {
    if (!User.queryMode){ User.users.splice(i, 1); }
    else{
      User.currentUser = User.searchedUsers[i];
      User.users.splice(User.users.findIndex(this.findUser), 1);
      User.searchedUsers.splice(i, 1);
    }
  }

  updateProfile(profile: User, i: number) {
    this.newFirstName = profile.firstName; this.newLastName = profile.lastName; this.newEmail = profile.email; this.newPhone = profile.phone;
    if (!User.queryMode){
      this.usersIndex = i;
    }
    if (User.queryMode) {
      this.searchedUsersIndex = i;
      User.currentUser = User.searchedUsers[i];
      this.usersIndex = User.users.findIndex(this.findUser);
    }
  }

  onUpdateSubmit(){
    User.users[this.usersIndex].firstName = this.newFirstName; User.users[this.usersIndex].lastName = this.newLastName;
    User.users[this.usersIndex].email = this.newEmail; User.users[this.usersIndex].phone = this.newPhone;
    if (User.queryMode){
      User.searchedUsers[this.searchedUsersIndex].firstName = this.newFirstName; User.searchedUsers[this.searchedUsersIndex].lastName = this.newLastName;
      User.searchedUsers[this.searchedUsersIndex].email = this.newEmail; User.searchedUsers[this.searchedUsersIndex].phone = this.newPhone;
    }
  }
}
