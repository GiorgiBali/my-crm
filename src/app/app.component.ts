import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from './shared/firestore.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  url = '/login';

  constructor(private router: Router, private firestoreService: FirestoreService){
  }

  ngOnInit(): void {
    this.firestoreService.getAllContactsFromFS();
    this.firestoreService.getAllTasksFromFS();
  }

  ngDoCheck(): void {
    this.url = this.router.url;
  }
}