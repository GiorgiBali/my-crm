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
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAnalytics,getAnalytics,ScreenTrackingService,UserTrackingService } from '@angular/fire/analytics';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';

@NgModule({
  declarations: [ AppComponent, ContactsComponent, RegistrationComponent, ScheduleComponent, FooterComponent, LoginComponent,
    AccountPageComponent, SignUpComponent ],
  imports: [ BrowserModule, AppRoutingModule, FormsModule, BrowserAnimationsModule, MaterialModule, HeaderModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)), provideAnalytics(() => getAnalytics()),
    provideAuth(() => getAuth()), provideDatabase(() => getDatabase()), provideFirestore(() => getFirestore()) ],
  providers: [ ScreenTrackingService,UserTrackingService ],
  bootstrap: [AppComponent]
})
export class AppModule {}