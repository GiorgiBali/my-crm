import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { RegistrationComponent } from './registration/registration.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { HeaderModule } from './header/header.module';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { AccountPageComponent } from './account-page/account-page.component';
import { SignUpComponent } from './sign-up/sign-up.component';

@NgModule({
  declarations: [ AppComponent, ContactsComponent, RegistrationComponent, ScheduleComponent, FooterComponent,
    LoginComponent,
    AccountPageComponent,
    SignUpComponent ],
  imports: [ BrowserModule, AppRoutingModule, FormsModule, BrowserAnimationsModule, MaterialModule, HeaderModule ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}