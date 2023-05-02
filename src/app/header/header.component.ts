import { Component, OnInit } from '@angular/core';
import { User } from '../User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  clearAll(){
    User.users = [];
  }
}
