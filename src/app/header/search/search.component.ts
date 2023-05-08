import { Component } from '@angular/core';
import { Contact } from '../../shared/contact';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
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
