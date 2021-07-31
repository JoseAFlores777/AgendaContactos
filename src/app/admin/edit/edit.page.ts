import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { ContactsService } from 'src/app/services/contacts.service';
import { Contact } from '../../shared/contact.inteface';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  contact: Contact = {
    id: '',
    firstName: '',
    lastName: '',
    phone:''
  }

  contactId = null;
  
  cambios = false;

  constructor(private route: ActivatedRoute, private nav: NavController,
    private contactSvc: ContactsService, private loadingController: LoadingController) {
    
    
    }

  ngOnInit() {
    this.contactId = this.route.snapshot.params['id'];
    if (this.contactId){
      this.loadContact();
    }
  }

  onChange() {
    this.cambios = true;
  }


  async loadContact() {
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await loading.present();

    this.contactSvc.getContact(this.contactId).subscribe(contact => {
      loading.dismiss();
      this.contact = contact;
    })
  }

 async saveContact() {
   const loading = await this.loadingController.create({
     message: 'Saving...'
   });
   await loading.present();

     this.contactSvc.updateContact(this.contact, this.contactId).then(() => {
       loading.dismiss();
       this.nav.navigateForward('/');
     });

 }
  
  async removeContact() {
    const loading = await this.loadingController.create({
      message: 'Deleting...'
    });
    await loading.present();
 
    this.contactSvc.removeContact(this.contactId).then(() => {
        loading.dismiss();
        this.nav.navigateForward('/');
      });
    
  }

}
