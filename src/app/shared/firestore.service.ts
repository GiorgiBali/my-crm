import { Injectable } from '@angular/core';
import { Firestore, collection, doc, setDoc, addDoc, deleteDoc, query, where, getDocs, getDoc, updateDoc } from '@angular/fire/firestore';
import { Contact } from './contact';
import { Task } from './task';

@Injectable({ providedIn: 'root' })
export class FirestoreService {
  contactsCollection = collection(this.firestore, 'contacts'); allContacts: Contact[] = []; searchedContacts: Contact[] = []; contactsPulled = false; totalPages = 1;
	tasksCollection = collection(this.firestore, 'tasks'); allTasks: Task[] = []; tasksPulled = false;

	constructor(private firestore: Firestore) {}

	async getAllContactsFromFS(){
		const querySnapshot = await getDocs(query(this.contactsCollection));
		querySnapshot.forEach((doc: any) => { this.allContacts.push(doc.data() as Contact); });
		this.calcTotalPages(this.allContacts.length);
	}

	calcTotalPages(contactCount: number){
		if (contactCount === 0){ this.totalPages = 1; }
    else { this.totalPages = Math.ceil(contactCount/10); }
	}

  addContactToFS(contact: Contact){
		setDoc(doc(this.firestore, 'contacts', contact.phone), {firstName: contact.firstName, lastName: contact.lastName, email: contact.email, phone: contact.phone, status: contact.status, date: contact.date})
		  .then(() => { console.log("Contact Created"); }).catch((error) => { console.log(error);	});
	}

	updateContactInFS(contact: Contact){
		setDoc(doc(this.firestore, 'contacts', contact.phone), {firstName: contact.firstName, lastName: contact.lastName, email: contact.email, phone: contact.phone, status: contact.status, date: contact.date})
		  .then(() => { console.log("Contact Updated"); }).catch((error) => { console.log(error);	});
	}

	deleteContactFromFS(phone: string){
		deleteDoc(doc(this.firestore, 'contacts', phone))
			.then(() => { console.log("Contact Deleted"); }).catch((error) => { console.log(error);	});
	}

	async getAllTasksFromFS(){
		const querySnapshot = await getDocs(query(this.tasksCollection));
		querySnapshot.forEach((doc: any) => { this.allTasks.push(doc.data() as Task); });
	}

	async addTaskToFS(task: Task){
		const docRef =  await addDoc(this.tasksCollection, {date: task.date, task: task.task, contact: task.contact, time: task.time, FSid: ""});
		task.FSid = docRef.id; await updateDoc(docRef, {FSid: docRef.id});
	}

	async updateTaskInFS(FSid: string, inputTask: string, inputDate: string, inputTime: string){
		const docRef = doc(this.firestore, 'tasks', FSid);
		await updateDoc(docRef, { task: inputTask, date: inputDate, time: inputTime });
	}

	deleteTaskFromFS(FSid: string){
		deleteDoc(doc(this.firestore, 'tasks', FSid))
			.then(() => { console.log("Task Deleted"); }).catch((error) => { console.log(error); });
	}
}