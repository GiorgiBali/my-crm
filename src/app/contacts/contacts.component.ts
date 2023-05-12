import { Component } from '@angular/core';
import { Contact } from '../shared/contact';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent {
  displayedContacts: Contact[] = []; globalContact!: Contact; page: number = 1;
  mainCheckboxChecked: boolean = false; subCheckboxesChecked: boolean = false;
  updatedFirstName!: string; updatedLastName!: string; updatedEmail!: string; updatedPhone!: string; updatedStatus!: string; updatedDate!: string;
  task = ""; contactId = 0; time = ""; date = "";

  ngDoCheck(): void {
    if (Contact.searchMode) { this.displayedContacts = Contact.searchedContacts; }
    else { this.displayedContacts = Contact.contacts; }
  }

  prevPage(){ this.page--; }
  nextPage(){ this.page++; }

  deleteContact(contact: Contact, i: number) {
    if (!Contact.searchMode){ Contact.contacts.splice(i, 1); }
    else {
      Contact.contacts = Contact.contacts.filter((obj: Contact) => { return obj.email !== contact.email; });
      Contact.searchedContacts.splice(i, 1);
    }
  }

  addTask(contact: Contact, i: number) {
    this.contactId = Number(i) + 1;
    this.task = "Call";
  }

  onTaskSubmit(taskForm: NgForm) {
    Contact.taskProperties = [this.task, String(this.contactId), this.time, this.date];
  }

  updateContact(contact: Contact) {
    this.updatedFirstName = contact.firstName; this.updatedLastName = contact.lastName; this.updatedEmail = contact.email;
    this.updatedPhone = contact.phone; this.updatedStatus = contact.status; this.updatedDate = contact.date;
  }

  onUpdateSubmit(updateUserForm: NgForm){
    this.globalContact = this.findContactByEmail(updateUserForm.value.EmailAndPhone.email);
    let i = Contact.contacts.findIndex(this.findGlobalContact, this);
    Contact.contacts[i].firstName = this.updatedFirstName; Contact.contacts[i].lastName = this.updatedLastName;
    Contact.contacts[i].email = this.updatedEmail; Contact.contacts[i].phone = this.updatedPhone;
    Contact.contacts[i].status = this.updatedStatus; Contact.contacts[i].date = this.updatedDate;
    if (Contact.searchMode){
      i = Contact.searchedContacts.findIndex(this.findGlobalContact, this);
      Contact.searchedContacts[i].firstName = this.updatedFirstName; Contact.searchedContacts[i].lastName = this.updatedLastName;
      Contact.searchedContacts[i].email = this.updatedEmail; Contact.searchedContacts[i].phone = this.updatedPhone;
      Contact.searchedContacts[i].status = this.updatedStatus; Contact.searchedContacts[i].date = this.updatedDate;
    }
  }

  mainCheckbox(event: any){
    if (event.target.checked){
      this.mainCheckboxChecked = true; this.subCheckboxesChecked = true;
      Contact.contacts.forEach((contact: Contact) => {
        let found = this.displayedContacts.some((displayedContact: Contact) => { return displayedContact.email === contact.email; });
        if (found){ contact.checked = true; }
      });
      if (Contact.searchMode){
        Contact.searchedContacts.forEach((contact: Contact) => {
          let found = this.displayedContacts.some((displayedContact: Contact) => { return displayedContact.email === contact.email; });
          if (found){ contact.checked = true; }
        });
      }
    }
    else {
      this.mainCheckboxChecked = false; this.subCheckboxesChecked = false;
      Contact.contacts.forEach((contact: Contact) => { contact.checked = false; });
      if (Contact.searchMode){
        Contact.searchedContacts.forEach((contact: Contact) => { contact.checked = false; });
      }
    }
  }

  subCheckbox(event: any) {
    let email = this.displayedContacts[Number(event.target.value)-1].email;
    if (event.target.checked){
      Contact.contacts.forEach((contact: Contact) => {
        if (contact.email === email) { contact.checked = true; }
      });
      if (Contact.searchMode){
        Contact.searchedContacts.forEach((contact: Contact) => {
          if (contact.email === email) { contact.checked = true; }
        });
      }
    }
    else {
      Contact.contacts.forEach((contact: Contact) => {
        if (contact.email === email) { contact.checked = false; }
      });
      if (Contact.searchMode){
        Contact.searchedContacts.forEach((contact: Contact) => {
          if (contact.email === email) { contact.checked = false; }
        });
      }
    }
  }

  deleteContacts(){
    Contact.contacts = Contact.contacts.filter((contact: Contact) => {
      if (contact.checked) { return false; }
      return true;
    });
    if (Contact.searchMode){
      Contact.searchedContacts = Contact.searchedContacts.filter((contact: Contact) => {
        if (contact.checked) { return false; }
        return true;        
      });
    }
    this.mainCheckboxChecked = false; this.subCheckboxesChecked = false;
  }

  // --- Helper Functions ---

  findGlobalContact(contact: Contact) {
    return contact.email === this.globalContact.email;
  }

  findContactByEmail(email: string){
    let i: number;
    for (i = 0; i <= Contact.contacts.length-1; i++){
      if (Contact.contacts[i].email === email) { break; }
    }
    return Contact.contacts[i];
  }
}