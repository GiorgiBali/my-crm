import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { LogoComponent } from './logo/logo.component';
import { FormsModule } from '@angular/forms';
import { NavbarItemsComponent } from './navbar-items/navbar-items.component';
import { SearchComponent } from './search/search.component';
import { AccountComponent } from './account/account.component';
import { HeaderRoutingModule } from './header-routing.module';

@NgModule({
  declarations: [HeaderComponent, LogoComponent, NavbarItemsComponent, SearchComponent, AccountComponent],
  imports: [CommonModule, FormsModule, HeaderRoutingModule],
  exports: [HeaderComponent]
})
export class HeaderModule { }
