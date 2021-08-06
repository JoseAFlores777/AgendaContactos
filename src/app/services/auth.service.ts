import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../shared/user.interface';
import * as firebase from 'firebase/app';
import { AngularFirestore,AngularFirestoreDocument } from "@angular/fire/firestore";
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user$: Observable<User>;
  public currentUserId: string;

  constructor(public afAuth: AngularFireAuth, private afs: AngularFirestore,
               public alertController: AlertController) {
   
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          this.currentUserId = user.uid;
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        }
        return of(null);
      })
    );
  }


  

  
  async resetPassword(email:string): Promise<void>{
    try {

      return this.afAuth.sendPasswordResetEmail(email);
      
    } catch (error) {
      console.log('Error ->', error);
      this.presentAlert(error.message)
    }
  }
  

  
  async loginGoogle(): Promise<User>{
    try {

      const { user } = await this.afAuth.signInWithPopup(new firebase.default.auth.GoogleAuthProvider());
      this.updateUserData(user);
      return user;
      
    } catch (error) {
      console.log('Error ->', error);
      this.presentAlert(error.message)
    }
   }
  

  
  async register(email:string,password:string): Promise<User>{
    try {
      
      const { user } = await this.afAuth.createUserWithEmailAndPassword(email, password);
      return user;

    } catch (error) {
      console.log('Error ->', error);
      this.presentAlert(error.message)
    }
   }
  
  
  async login(email:string,password:string): Promise<User>{
    try {

      const { user } = await this.afAuth.signInWithEmailAndPassword(email, password);
      this.updateUserData(user);
      //await this.sendVerificationEmail();
      return user;
      
    } catch (error) {
      console.log('Error ->', error);
      this.presentAlert(error.message)
      
      
      
    }
  }

  async presentAlert(msj:string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      message: msj,
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async sendVerificationEmail(): Promise<void>{
    try {

      return (await this.afAuth.currentUser).sendEmailVerification();
      
    } catch (error) {
      console.log('Error ->', error);
      this.presentAlert(error.message)
    }
  }

   isEmailVerified(user:User):boolean {
     return user.emailVerified === true ? true : false;
  }





  
  async logout(): Promise<void>{
    try {

      await this.afAuth.signOut();
      
    } catch (error) {
      console.log('Error ->', error);
      this.presentAlert(error.message)
    }
  }


  private updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: user.displayName,
    }
    return userRef.set(data,{merge:true})
  }



}


