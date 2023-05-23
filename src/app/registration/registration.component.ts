import { Component, Inject, LOCALE_ID, ViewChild, ElementRef } from '@angular/core';
import { formatDate } from '@angular/common';
import { Contact } from '../shared/contact';
import { NgForm } from '@angular/forms';
import { FirestoreService } from '../shared/firestore.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  firstName = ""; lastName = ""; email = ""; phone = ""; status = "New"; date: string = formatDate(new Date(), 'yyyy-MM-dd', this.locale);;
  @ViewChild('statusRef', {read: ElementRef}) statusInput!: ElementRef<HTMLSelectElement>;
  repeatedEmail = false; repeatedPhone = false;

  constructor(@Inject(LOCALE_ID) public locale: string, private firestoreService: FirestoreService){}

  onRegistrationSubmit(registrationForm: NgForm){
    this.repeatedEmail = this.firestoreService.allContacts.some((contact: Contact) => { return contact.email === this.email; });
    this.repeatedPhone = this.firestoreService.allContacts.some((contact: Contact) => { return contact.phone === this.phone; });
    if (!this.repeatedEmail && !this.repeatedPhone){
      this.firestoreService.allContacts.push(new Contact(this.firstName, this.lastName, this.email, this.phone, this.status, this.date));
      this.firestoreService.addContactToFS(this.firestoreService.allContacts[this.firestoreService.allContacts.length - 1]);
      registrationForm.reset(); this.statusInput.nativeElement.value = "New";
    }
  }
}