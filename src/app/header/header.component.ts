import { Component } from '@angular/core';
import { RoutingService } from '../shared/routing.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(public routingService: RoutingService){}
}