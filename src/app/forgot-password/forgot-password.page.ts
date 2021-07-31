import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  constructor(private authSvc:AuthService,private router:Router) { }

  ngOnInit() {
  }

 async onResetPassword(email) {
    try {
      
     await this.authSvc.resetPassword(email.value);
      this.router.navigate(['/login']);

    } catch (error) {
      console.log('Error->',error)
    }
  }

}
