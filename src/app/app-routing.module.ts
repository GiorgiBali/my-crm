import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { ProfilesComponent } from './profiles/profiles.component';

const routes: Routes = [
  { path: 'registration', component: RegistrationComponent },
  { path: 'profiles', component: ProfilesComponent },
  { path: '', component: ProfilesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
