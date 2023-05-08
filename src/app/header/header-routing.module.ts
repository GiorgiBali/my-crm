import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from '../registration/registration.component';
import { ContactsComponent } from '../contacts/contacts.component';
import { ScheduleComponent } from '../schedule/schedule.component';

const routes: Routes = [
  { path: 'createContact', component: RegistrationComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'schedule', component: ScheduleComponent },
  { path: '', component: ContactsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeaderRoutingModule { }
