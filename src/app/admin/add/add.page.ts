import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { ContactsService } from 'src/app/services/contacts.service';
import { Contact } from 'src/app/shared/contact.inteface';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  contact: Contact = {
    firstName: '',
    lastName: '',
    phone:''
  }

  contactId = null;
  


  constructor(private route: ActivatedRoute, private nav: NavController,
    private contactSvc: ContactsService, private loadingController: LoadingController) {
    
    
    }

  ngOnInit() {
  
  }


 async saveContact() {
   const loading = await this.loadingController.create({
     message: 'Saving...'
   });
   await loading.present();

     this.contactSvc.addContact(this.contact).then(() => {
       loading.dismiss();
       this.nav.navigateForward('/');
     });

  }

}
