import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Contact } from '../shared/contact.inteface';
import { Observable } from 'rxjs';

import { User } from '../shared/user.interface';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  public contactsCollection: AngularFirestoreCollection<Contact>;
  public contacts: Observable<Contact[]>;
  private currentUser: Observable<User>;
  public currentUserId: String;
  

  constructor(public afAuth: AuthService, private db: AngularFirestore) {

    this.loadContacts();
  }

  loadContacts() {
    this.currentUserId = this.afAuth.currentUserId;

    console.log("id",this.currentUserId);

    
    this.contactsCollection = this.db.collection<Contact>(`users/${this.currentUserId}/contacts`);
    this.contacts = this.contactsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      })
    );
  }
  
  getContacts() {
    this.loadContacts()
    return this.contacts;
  }
  
  getContact(id:string) {
    return this.contactsCollection.doc<Contact>(id).valueChanges();
  }

  updateContact(contact: Contact, id: string) {
    return this.contactsCollection.doc(id).update(contact);
  }

  addContact(contact: Contact) {
    return this.contactsCollection.add(contact);
  }

  removeContact(id: string) {
    return this.contactsCollection.doc(id).delete();
  }
  
}
