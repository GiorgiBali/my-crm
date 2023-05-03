import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  query!: string;

  constructor() { }

  ngOnInit(): void {
  }

  find(user: User){
    return user.firstName === User.query || user.lastName === User.query || user.email === User.query || user.phone === User.query;
  }

  onSearchSubmit(){
    User.query = this.query;
    User.searchedUsers = User.users.filter(this.find);
  }

  resetQuery(searchForm: NgForm){
    User.searchedUsers = []; User.query = ""; searchForm.reset();
  }
}
