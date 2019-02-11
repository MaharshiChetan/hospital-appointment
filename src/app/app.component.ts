import { Component } from '@angular/core';

import { Platform, AlertController, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastService } from './services/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home',
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list',
    },
  ];
  authenticated: any = false;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private _firebaseAuth: AngularFireAuth,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private toastService: ToastService
  ) {
    this.initializeApp();
    this._firebaseAuth.authState.subscribe(state => {
      if (state) {
        this.authenticated = state;
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
