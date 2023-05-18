import { Component } from '@angular/core';
import { Contact } from '../shared/contact';
import { NgForm } from '@angular/forms';
import { FirestoreService } from '../shared/firestore.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  constructor(private firestoreService: FirestoreService){}

  firstName: string = ""; lastName: string = ""; email: string = ""; phone: string = ""; status: string = ""; date: string = "";
  repeatedEmail: boolean = false; repeatedPhone: boolean = false; isStatus: boolean = false; isDate: boolean = false;

  onRegistrationSubmit(registrationForm: NgForm){
    this.repeatedEmail = this.firestoreService.allContacts.some((contact: Contact) => { return contact.email === this.email; });
    this.repeatedPhone = this.firestoreService.allContacts.some((contact: Contact) => { return contact.phone === this.phone; });
    this.isStatus = this.status !== ""; this.isDate = this.date !== "";
    if (registrationForm.valid && !this.repeatedEmail && !this.repeatedPhone && this.isStatus && this.isDate){
      this.firestoreService.allContacts.push(new Contact(this.firstName, this.lastName, this.email, this.phone, this.status, this.date));
      this.firestoreService.addContactToFS(this.firestoreService.allContacts[this.firestoreService.allContacts.length - 1]);
      registrationForm.reset(); this.firstName = ""; this.lastName = ""; this.email = ""; this.phone = ""; this.status = ""; this.date = ""; 
    }
  }
}