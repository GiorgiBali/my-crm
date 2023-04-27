import { Component } from '@angular/core';
import { User } from '../User';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent {
  profiles: User[] = [];

  constructor() { }

  ngDoCheck(): void {
    this.profiles = User.users;
  }

}
