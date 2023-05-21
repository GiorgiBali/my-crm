import { Injectable } from '@angular/core';
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, updateEmail, updatePassword, signOut, deleteUser } from "firebase/auth";
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  auth = getAuth(); user!: any;
  currentFirstName = ""; currentLastName = ""; currentEmail = "";
  signInFailure = false; signUpEmailDuplicate = false;
  
  constructor() {}

  userUpdate(){
    onAuthStateChanged(this.auth, (loggedUser) => {
      if (loggedUser) {
        this.user = loggedUser;
        this.currentFirstName = this.user.displayName.split(" ")[0];
        this.currentLastName = this.user.displayName.split(" ")[1];
        this.currentEmail = this.user.email;
      }
      else {}
    });
  }

  createUser(firstName: string, lastName: string, email: string, password: string, router: Router, signUpForm: NgForm){
    createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        // this.user = userCredential.user;
        this.setUserName(this.user, firstName, lastName);
        signUpForm.reset(); router.navigate(['/contacts']);
      })
      .catch((error) => {
        const errorCode = error.code; const errorMessage = error.message;
        if (errorCode === "auth/email-already-in-use"){ this.signUpEmailDuplicate = true; }
        else { console.log(errorCode); console.log(errorMessage); }
      });
  }

  signInUser(email: string, password: string, router: Router, loginForm: NgForm){
    signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        // this.user = userCredential.user;
        loginForm.reset(); router.navigate(['/contacts']);
      })
      .catch((error) => {
        const errorCode = error.code; const errorMessage = error.message;
        if (errorCode === "auth/user-not-found"){ this.signInFailure = true; }
        else { console.log(errorCode); console.log(errorMessage); }
      });
  }

  setUserName(user: any, firstName: string, lastName: string){
    updateProfile(user, { displayName: `${firstName} ${lastName}` })
      .then(() => { console.log("Succssful Update"); }).catch((error) => { console.log("Update Error"); });
  }

  setUserEmail(user: any, email: string){
    updateEmail(user, email)
      .then(() => { console.log("Successful Email Update"); })
      .catch((error) => { console.log("Email Update Failed"); });
  }

  setUserPassword(user: any, password: string){
    updatePassword(user, password)
      .then(() => { console.log("Successful Password Update"); })
      .catch((error) => { console.log("Password Update Failed"); });
  }

  logOut(){
    signOut(this.auth)
      .then(() => { console.log("Sign Out Success"); }).catch((error) => { console.log("Sign Out Error"); });
  }

  deleteAccount(){
    deleteUser(this.user)
      .then(() => { console.log("User Deleted"); }).catch((error) => { console.log("User Deletion Failed"); });
  }
}