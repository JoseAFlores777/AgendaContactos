import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authSvc: AuthService, private router: Router
  ,public alertController: AlertController) { }

  ngOnInit() {
  }

 async onLogin(email, password) {
   try {
      
     const user = await this.authSvc.login(email.value, password.value);

     if (user) {
       //todo:CheckEmail
       const isVerified = this.authSvc.isEmailVerified(user);
       this.redirectUser(isVerified);
       console.log('user->', user);
       console.log('verified->', isVerified);
     }
      
    } catch (error) {
     console.log('Error->', error)
     
    }
 }
  
  async onLoginGoogle() {
    try {
      
      const user = await this.authSvc.loginGoogle();
      if (user) {
        //todo:CheckEmail
        const isVerified = this.authSvc.isEmailVerified(user);
        this.redirectUser(isVerified);
        console.log('verified->', isVerified);
      }

    } catch (error) {
      console.log('Error->',error)
    }
  }


  private redirectUser(isVerified: boolean):void {
    
    if (isVerified) {
      this.router.navigate(['admin']);
    } else {
       this.router.navigate(['verify-email']);
      
    }
    
  }




}
