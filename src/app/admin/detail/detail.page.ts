import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { Contact } from '../../shared/contact.inteface';
import { ContactsService } from '../../services/contacts.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  contact: Contact = {
    id: '',
    firstName: '',
    lastName: '',
    phone:''
  }

  contactId = null;

  

  constructor(private route: ActivatedRoute, private nav: NavController,
    private contactSvc: ContactsService, private loadingController: LoadingController) {
    
    
    }

  ngOnInit() {
    this.contactId = this.route.snapshot.params['id'];
    if (this.contactId){
      this.loadContact();
    }
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

}
