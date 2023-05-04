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
  checkedUsers: number[] = []; checked: boolean = false; mainChecked: boolean = false;
  page: number = 1;

  constructor() { }

  ngOnInit(): void {
    User.users = [
      new User("Gojo", "Satoru", "Gojo@gmail.com", "1111111111"), new User("Itachi", "Uchiha", "Itachi@gmail.com", "22222222222"),
      new User("Levi", "Ackermann", "Levi@gmail.com", "3333333333"), new User("Shisui", "Uchiha", "Shisui@gmail.com", "4444444444"),
      new User("Sasuke", "Uchiha", "Sasuke@gmail.com", "5555555555"), new User("Kakashi", "Hatake", "Kakashi@gmail.com", "66666666666"),
      new User("Minato", "Namikaze", "Minato@gmail.com", "7777777777"), new User("Obito", "Uchiha", "Obito@gmail.com", "88888888888"),
      new User("Madara", "Uchiha", "Madara@gmail.com", "9999999999"), new User("Hashirama", "Senju", "Hashirama@gmail.com", "1111116656"),
      new User("David", "Martinez", "David@gmail.com", "1161111111"), new User("Ragnar", "Lothbrok", "Ragnar@gmail.com", "1111111311"),
    ];
  }

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

  deleteProfiles(){
    if (!User.queryMode){
      User.users = User.users.filter((user: User) => {
        User.currentUser = user;
        return !this.checkedUsers.includes(User.users.findIndex(this.findUser) + 1);
      });
    }
    else {
      let checkedUsersForMain: number[] = [];
      let checkedProfiles: User[] = this.checkedUsers.map((n: number) => { return User.searchedUsers[n-1]; });
      checkedProfiles.forEach((user: User) => {
        User.currentUser = user;
        checkedUsersForMain.push(User.users.findIndex(this.findUser) + 1);
      });
      User.users = User.users.filter((user: User) => {
        User.currentUser = user;
        return !checkedUsersForMain.includes(User.users.findIndex(this.findUser) + 1);
      });
      User.searchedUsers = User.searchedUsers.filter((user: User) => {
        User.currentUser = user;
        return !this.checkedUsers.includes(User.searchedUsers.findIndex(this.findUser) + 1);
      });
    }
    this.mainChecked = false;
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

  checkCheckbox(event: any) {
    if (event.target.checked && event.target.value === '0'){
      this.mainChecked = true; this.checkedUsers = []; this.checked = true;
      for (let i = 1; i <= this.profiles.length; i++){ this.checkedUsers.push(i); }
    }
    else if (event.target.checked && event.target.value !== '0'){ this.checkedUsers.push(Number(event.target.value)); }
    else if (!event.target.checked && event.target.value !== '0'){ this.checkedUsers.splice(this.checkedUsers.indexOf(Number(event.target.value)), 1); }
    else { this.checkedUsers = []; this.checked = false; this.mainChecked = false; }
  }

  prevPage(){ this.page--; }
  nextPage(){ this.page++; }
}
