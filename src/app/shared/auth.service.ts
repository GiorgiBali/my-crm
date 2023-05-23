import { Injectable } from '@angular/core';
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, updateEmail, updatePassword, signOut, deleteUser } from "firebase/auth";
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FirestoreService } from './firestore.service';
import { RoutingService } from './routing.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  firstName = ""; lastName = ""; email = "";
  auth = getAuth(); user: any = this.getUser(); signup = false;
  signInUserNotFound = false; signInWrongPassword = false; signUpEmailExists = false;
  successfulUserDetailsUpdate = false; failedUserDetailsUpdate = false; successfulPswUpdate = false; failedPswUpdate = false;

  constructor(private firestoreService: FirestoreService, private router: Router, private routingService: RoutingService){}

  getUser(){
    let user: any = null;
    onAuthStateChanged(this.auth, (loggedUser) => {
      if (loggedUser) {
        user = loggedUser;
        if (!this.signup){
          this.firstName = user.displayName.split(" ")[0]; this.lastName = user.displayName.split(" ")[1]; this.email = user.email;
        }
      }
    });
    return user;
  }

  createUser(firstName: string, lastName: string, email: string, password: string, signUpForm: NgForm){
    this.signup = true;
    createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        this.user = userCredential.user;
        this.setUserName(this.user, firstName, lastName); this.email = email;
        signUpForm.reset(); this.routingService.headerNeeded = true; this.router.navigate(['/contacts']);
      })
      .catch((error) => {
        const errorCode = error.code; const errorMessage = error.message;
        if (errorCode === "auth/email-already-in-use"){ this.signUpEmailExists = true; }
        else { console.log(errorCode); console.log(errorMessage); }
      });
  }

  signInUser(email: string, password: string, loginForm: NgForm){
    this.signInUserNotFound = false; this.signInWrongPassword = false;
    signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        this.user = userCredential.user;
        this.firstName = this.user.displayName.split(" ")[0]; this.lastName = this.user.displayName.split(" ")[1]; this.email = email;
        loginForm.reset(); this.routingService.headerNeeded = true; this.router.navigate(['/contacts']);
      })
      .catch((error) => {
        const errorCode = error.code; const errorMessage = error.message;
        if (errorCode === "auth/user-not-found") { this.signInUserNotFound = true; }
        else if (errorCode === "auth/wrong-password") { this.signInWrongPassword = true; }
        else { console.log(errorCode); console.log(errorMessage); }
      });
  }

  setUserName(user: any, firstName: string, lastName: string){
    updateProfile(user, { displayName: `${firstName} ${lastName}` })
      .then(() => { this.successfulUserDetailsUpdate = true; this.firstName = firstName; this.lastName = lastName; })
      .catch((error) => { this.failedUserDetailsUpdate = true; });
  }

  setUserEmail(user: any, email: string){
    updateEmail(user, email)
      .then(() => { this.successfulUserDetailsUpdate = true; this.email = email; })
      .catch((error) => { this.failedUserDetailsUpdate = true; });
  }

  setUserPassword(user: any, password: string){
    updatePassword(user, password)
      .then(() => { this.successfulPswUpdate = true; }).catch((error) => { this.failedPswUpdate = true; });
  }

  logOut(){
    signOut(this.auth).then(() => { console.log("Sign Out Success"); }).catch((error) => { console.log("Sign Out Error"); });
    this.firestoreService.allContacts = []; this.firestoreService.allTasks = [];
    this.firestoreService.contactsPulled = false; this.firestoreService.tasksPulled = false;
    this.firstName = ""; this.lastName = ""; this.email = "";
    this.successfulUserDetailsUpdate = false; this.failedUserDetailsUpdate = false;
    this.successfulPswUpdate = false; this.failedPswUpdate = false;
  }

  deleteAccount(){
    deleteUser(this.user)
      .then(() => { console.log("User Deleted"); }).catch((error) => { console.log(error.message); });
    this.firestoreService.allContacts = []; this.firestoreService.allTasks = [];
    this.firestoreService.contactsPulled = false; this.firestoreService.tasksPulled = false;
    this.firstName = ""; this.lastName = ""; this.email = "";
    this.successfulUserDetailsUpdate = false; this.failedUserDetailsUpdate = false;
    this.successfulPswUpdate = false; this.failedPswUpdate = false;
  }
}