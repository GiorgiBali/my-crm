import { Component, ViewChild, ElementRef } from '@angular/core';
import { Contact } from '../shared/contact';
import { Task } from '../shared/task';
import { NgForm } from '@angular/forms';
import { FirestoreService } from '../shared/firestore.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent {
  displayedContacts: Contact[] = this.firestoreService.allContacts; page = 1;
  mainCheckboxChecked = false; subCheckboxesChecked = false; checkedContactsIndices: number[] = [];
  updatedFirstName = ""; updatedLastName = ""; updatedEmail = ""; updatedPhone = ""; updatedStatus = ""; updatedDate = "";
  taskContactIndex = -1; task = ""; time = ""; date = "";
  @ViewChild('searchRef', {read: ElementRef}) searchInput!: ElementRef<HTMLInputElement>; searchMode = false; searchProperty = "Name"; searchQuery = "";

  constructor(public firestoreService: FirestoreService){}

  onSearchSubmit(){
    this.searchMode = true;
    if (this.searchProperty === "Name"){
      this.firestoreService.searchedContacts = this.firestoreService.allContacts.filter((contact: Contact) => { return `${contact.firstName} ${contact.lastName}` === this.searchQuery; }, this);
    }
    else if (this.searchProperty === "Email"){
      this.firestoreService.searchedContacts = this.firestoreService.allContacts.filter((contact: Contact) => { return contact.email === this.searchQuery; }, this);
    }
    else if (this.searchProperty === "Phone"){
      this.firestoreService.searchedContacts = this.firestoreService.allContacts.filter((contact: Contact) => { return contact.phone === this.searchQuery; }, this);
    }
    else if (this.searchProperty === "Status"){
      this.firestoreService.searchedContacts = this.firestoreService.allContacts.filter((contact: Contact) => { return contact.status === this.searchQuery; }, this);
    }
    else if (this.searchProperty === "Date"){
      this.firestoreService.searchedContacts = this.firestoreService.allContacts.filter((contact: Contact) => { return contact.date === this.searchQuery; }, this);
    }
    this.displayedContacts = this.firestoreService.searchedContacts;
  }

  resetSearch(searchForm: NgForm){
    this.searchMode = false; this.displayedContacts = this.firestoreService.allContacts;
    this.firestoreService.searchedContacts = []; this.searchInput.nativeElement.value = "";
  }

  prevPage(){ this.page--; }
  nextPage(){ this.page++; }

  deleteContact(contact: Contact, i: number) {
    this.firestoreService.deleteContactFromFS(contact.phone);
    if (!this.searchMode){ this.firestoreService.allContacts.splice(i, 1); }
    else {
      this.firestoreService.allContacts = this.firestoreService.allContacts.filter((cont: Contact) => { return cont.phone !== contact.phone; });
      this.firestoreService.searchedContacts.splice(i, 1);
    }
  }

  addTask(contact: Contact, i: number) {
    this.taskContactIndex = i; this.task = "Call";
  }

  onTaskSubmit(taskForm: NgForm) {
    this.firestoreService.allTasks.push(new Task(this.date, this.task, this.displayedContacts[this.taskContactIndex].email, this.time, ""));
    this.firestoreService.addTaskToFS(this.firestoreService.allTasks[this.firestoreService.allTasks.length - 1]);
  }

  updateContact(contact: Contact) {
    this.updatedFirstName = contact.firstName; this.updatedLastName = contact.lastName; this.updatedEmail = contact.email;
    this.updatedPhone = contact.phone; this.updatedStatus = contact.status; this.updatedDate = contact.date;
  }

  onUpdateSubmit(updateUserForm: NgForm){
    let i = 0;
    while (i < this.firestoreService.allContacts.length){
      if (this.firestoreService.allContacts[i].phone === updateUserForm.value.EmailAndPhone.phone){
        this.firestoreService.allContacts[i].firstName = this.updatedFirstName; this.firestoreService.allContacts[i].lastName = this.updatedLastName;
        this.firestoreService.allContacts[i].email = this.updatedEmail; this.firestoreService.allContacts[i].phone = this.updatedPhone;
        this.firestoreService.allContacts[i].status = this.updatedStatus; this.firestoreService.allContacts[i].date = this.updatedDate;
        break;
      }
      i++;
    }
    this.firestoreService.updateContactInFS(this.firestoreService.allContacts[i]);
    if (this.searchMode){
      i = 0;
      while (i < this.firestoreService.searchedContacts.length){
        if (this.firestoreService.searchedContacts[i].phone === updateUserForm.value.EmailAndPhone.phone){
          this.firestoreService.searchedContacts[i].firstName = this.updatedFirstName; this.firestoreService.searchedContacts[i].lastName = this.updatedLastName;
          this.firestoreService.searchedContacts[i].email = this.updatedEmail; this.firestoreService.searchedContacts[i].phone = this.updatedPhone;
          this.firestoreService.searchedContacts[i].status = this.updatedStatus; this.firestoreService.searchedContacts[i].date = this.updatedDate;
          break;
        }
        i++;
      }
    }
  }

  mainCheckbox(event: any){
    if (event.target.checked){
      this.mainCheckboxChecked = true; this.subCheckboxesChecked = true;
      for (let i = 0; i < this.displayedContacts.length; i++){ this.checkedContactsIndices.push(i); }
    }
    else { this.mainCheckboxChecked = false; this.subCheckboxesChecked = false; this.checkedContactsIndices = []; }
  }

  subCheckbox(event: any) {
    if (event.target.checked){ this.checkedContactsIndices.push(Number(event.target.value)-1); }
    else {
      const i = this.checkedContactsIndices.indexOf(Number(event.target.value)-1);
      this.checkedContactsIndices.splice(i, 1);
      if (this.checkedContactsIndices.length === 0) { this.mainCheckboxChecked = false; }
    }
  }

  deleteContacts(){
    const checkedContactsPhones: string[] = [];
    this.checkedContactsIndices.forEach((i: number) => {
      this.firestoreService.deleteContactFromFS(this.displayedContacts[i].phone);
      checkedContactsPhones.push(this.displayedContacts[i].phone);
    });
    this.firestoreService.allContacts = this.firestoreService.allContacts.filter((contact: Contact) => {
      if (checkedContactsPhones.includes(contact.phone)) { return false; }
      return true;
    });
    this.displayedContacts = this.firestoreService.allContacts;
    if (this.searchMode){
      this.firestoreService.searchedContacts = this.firestoreService.searchedContacts.filter((contact: Contact) => {
        if (checkedContactsPhones.includes(contact.phone)) { return false; }
        return true;        
      });
      this.displayedContacts = this.firestoreService.searchedContacts;
    }
    this.mainCheckboxChecked = false; this.subCheckboxesChecked = false; this.checkedContactsIndices = [];
  }
}