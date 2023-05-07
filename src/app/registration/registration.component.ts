import { Component } from '@angular/core';
import { Contact } from '../shared/contact';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  firstName: string = ""; lastName: string = ""; email: string = ""; phone: string = ""; status: string = ""; date: string = "";
  repeatedEmail: boolean = false; repeatedPhone: boolean = false; isStatus: boolean = false; isDate: boolean = false;

  onRegistrationSubmit(registrationForm: NgForm){
    this.repeatedEmail = Contact.contacts.some((contact: Contact) => { return contact.email === this.email; });
    this.repeatedPhone = Contact.contacts.some((contact: Contact) => { return contact.phone === this.phone; });
    this.isStatus = this.status !== ""; this.isDate = this.date !== "";
    if (registrationForm.valid && !this.repeatedEmail && !this.repeatedPhone && this.isStatus && this.isDate){
      Contact.contacts.push(new Contact(false, this.firstName, this.lastName, this.email, this.phone, this.status, this.date));
      registrationForm.reset(); this.firstName = ""; this.lastName = ""; this.email = ""; this.phone = ""; this.status = ""; this.date = ""; 
    }
  }
}