import { Component } from '@angular/core';
import { FirestoreService } from './shared/firestore.service';
import { AuthService } from './shared/auth.service';
import { RoutingService } from './shared/routing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router: Router, private firestoreService: FirestoreService, private authService: AuthService, public routingService: RoutingService){}

  ngOnInit(): void {
    this.firestoreService.getAllContactsFromFS();
    this.firestoreService.getAllTasksFromFS();
    this.authService.userUpdate();
  }

  ngDoCheck(){
    if (this.router.url === '/login' || this.router.url === '/signup'){ this.routingService.headerNeeded = false; }
    else { this.routingService.headerNeeded = true; }
  }
}