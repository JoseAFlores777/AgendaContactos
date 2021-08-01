import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ContactsService } from '../services/contacts.service';
import { Contact } from '../shared/contact.inteface';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  contacts: Contact[];
  textoBuscar: string = '';

  constructor(private authSvc: AuthService, private contacSvc: ContactsService, private router: Router) {
    
  }

  ngOnInit() {
    this.contacSvc.getContacts().subscribe((contacts) => {
      console.log(contacts);
      this.contacts = contacts;
    })
  }



  logout() {
    this.authSvc.logout();
    this.contacts=[]
    this.router.navigate(['/login']);
  }

  onSearchChange(evt) {
    this.textoBuscar = evt.detail.value;

  }
}
