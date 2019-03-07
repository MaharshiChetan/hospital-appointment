import { Component } from '@angular/core';

import { Platform, AlertController, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastService } from './services/toast.service';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  adminPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home',
    },
    {
      title: 'Submitted Form',
      url: '/submitted-form',
      icon: 'checkbox-outline',
    },
  ];
  patientPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home',
    },
    {
      title: 'Admission Form',
      url: '/admission-form',
      icon: 'medkit',
    },
    {
      title: 'Submitted Form',
      url: '/submitted-form',
      icon: 'checkbox-outline',
    },
  ];
  authenticated: any = false;
  role: string;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private _firebaseAuth: AngularFireAuth,
    private _firebaseDatabase: AngularFireDatabase,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private toastService: ToastService
  ) {
    this.initializeApp();
    this._firebaseAuth.authState.subscribe(auth => {
      if (auth) {
        this.authenticated = auth;
        const subscription = this._firebaseDatabase
          .object(`users/${auth.uid}`)
          .valueChanges()
          .subscribe((user: any) => {
            this.role = user.admin ? 'admin' : 'patient';
            subscription.unsubscribe();
          });
      }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  async logout() {
    const alert = await this.alertCtrl.create({
      header: 'Confirm!',
      message: 'Are you sure for signing out from the application?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: blah => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'Logout',
          handler: () => {
            this.authService
              .signOut()
              .then(() => {
                this.toastService.showToast('Successfully logged out!');
                this.navCtrl.navigateRoot(['login']);
              })
              .catch(error => {
                console.log(error);
                this.toastService.showToast(error.message);
              });
          },
        },
      ],
    });

    await alert.present();
  }
}
