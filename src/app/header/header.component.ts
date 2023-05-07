import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Contact } from '../shared/contact';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  query: string = "";

  onSearchSubmit(){
    Contact.searchMode = true;
    Contact.searchedContacts = Contact.contacts.filter(this.searchFilter, this);
  }

  resetSearch(searchForm: NgForm){
    Contact.searchedContacts = []; Contact.searchMode = false; searchForm.reset();
  }

  // --- Helper Functions ---

  searchFilter(contact: Contact){
    return [contact.firstName, contact.lastName, contact.email, contact.phone, contact.status, contact.date].includes(this.query);
  }
}