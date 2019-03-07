import { Component } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast.service';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  role: string;
  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private toastService: ToastService,
    private authService: AuthService,
    private _firebaseAuth: AngularFireAuth,
    private _firebaseDatabase: AngularFireDatabase
  ) {}

  ngOnInit() {
    const subscription = this._firebaseAuth.authState.subscribe(auth => {
      if (auth) {
        this._firebaseDatabase
          .object(`users/${auth.uid}`)
          .valueChanges()
          .subscribe((user: any) => {
            this.role = user.admin ? 'admin' : 'patient';
          });
      }
      subscription.unsubscribe();
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
