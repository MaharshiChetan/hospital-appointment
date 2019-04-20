import { Component, OnInit } from '@angular/core';
import { PatientAdmissionService } from 'src/app/services/patient-admission.service';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController, ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-submitted-form',
  templateUrl: './submitted-form.page.html',
  styleUrls: ['./submitted-form.page.scss'],
})
export class SubmittedFormPage implements OnInit {
  submittedForms: any;
  role: string;
  constructor(
    private patientAdmissionService: PatientAdmissionService,
    private authService: AuthService,
    private alertCtrl: AlertController,
    private actionSheetCtrl: ActionSheetController
  ) {}

  ngOnInit() {
    this.role = this.authService.role;
    console.log(this.role);

    if (this.authService.role === 'admin') {
      this.getSubmittedForm();
    } else if (this.authService.role === 'patient') {
      this.getMySubmittedForm();
    }
  }

  getSubmittedForm(event?: any): any {
    this.patientAdmissionService.getAllAdmissions().subscribe(submittedForms => {
      console.log(submittedForms);
      this.submittedForms = submittedForms.reverse();
      if (event) {
        event.detail.complete();
      }
    });
  }

  getMySubmittedForm(event?: any) {
    this.patientAdmissionService.getAllAdmissions().subscribe(submittedForms => {
      this.submittedForms = submittedForms.filter((form: any) => {
        return form.uid === this.authService.currentUserId;
      });
      this.submittedForms = this.submittedForms.reverse();
      if (event) {
        event.detail.complete();
      }
    });
  }

  async takeActionOnForm(action: boolean, form: any) {
    const alert = await this.alertCtrl.create({
      header: 'Confirm!',
      message: `Are you sure for ${action ? 'accepting' : 'rejecting'} the admission form of ${
        form.patientName
      }?`,
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
          text: action ? 'Yes, Accept' : 'Yes, Reject',
          handler: () => {
            if (action) {
              form.formStatus = 'accepted';
              this.patientAdmissionService
                .updateAdmission(form.key, form)
                .then(() => {
                  console.log('updated');
                })
                .catch(error => {
                  console.log(error);
                });
            } else {
              form.formStatus = 'rejected';
              this.patientAdmissionService
                .updateAdmission(form.key, form)
                .then(() => {
                  console.log('updated');
                })
                .catch(error => {
                  console.log(error);
                });
            }
          },
        },
      ],
    });

    await alert.present();
  }

  async showActionSheet(form: any) {
    const actionSheetCtrl = await this.actionSheetCtrl.create({
      header: 'Select option',
      buttons: [
        {
          text: 'Available',
          icon: 'checkmark',
          handler: () => {
            this.showConfirmAlert(true, form);
          }
        },
        {
          text: 'Not available',
          icon: 'close',
          handler: () => {
            this.showConfirmAlert(false, form);
          }
        }
      ]
    });

    await actionSheetCtrl.present();
  }

  async showConfirmAlert(sendAmbulance: boolean, form: any) {
    if(sendAmbulance) {
      const alertCtrl = await this.alertCtrl.create({
        header: "Provide Details?",
        subHeader: "Provide name of driver and his number.",
        inputs: [
          { 
            name: 'driverDetails',
            type: 'radio',
            label: 'Ramesh (9867656563)',
            value: 'Ramesh (9867656563)',
            checked: true
          },
          {
            name: 'driverDetails',
            type: 'radio',
            label: 'Sunil (9878567689)',
            value: 'Sunil (9878567689)',
          },
          {
            name: 'driverDetails',
            type: 'radio',
            label: 'Suresh (9854785674)',
            value: 'Suresh (9854785674)',
          },
          {
            name: 'driverDetails',
            type: 'radio',
            label: 'Rohit (9645874855)',
            value: 'Rohit (9645874855)',
          },
          {
            name: 'driverDetails',
            type: 'radio',
            label: 'Amit (9748536476)',
            value: 'Amit (9748536476)',
          },
          {
            name: 'driverDetails',
            type: 'radio',
            label: 'Abhishek (9853784987)',
            value: 'Abhishek (9853784987)',
          },
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel'
          },
          {
            text: 'Send Ambulance',
            handler: data => {  
              form.ambulanceStatus = 'Ambulance sent';
              form.driverDetails = data;
              this.patientAdmissionService
                .updateAdmission(form.key, form)
                .then(() => {
                  console.log('updated');
                })
                .catch(error => {
                  console.log(error);
                });
            }
          },
        ]
      });
      await alertCtrl.present();
    } else {
      const alertCtrl = await this.alertCtrl.create({
        header: "Are you sure?",
        subHeader: "Ambulance is not available?",
        buttons: [
          {
            text: 'Ambulance unavailable',
            handler: () => {  
              form.driverDetails = null;
              form.ambulanceStatus = 'Ambulance unavailable';
              this.patientAdmissionService
                .updateAdmission(form.key, form)
                .then(() => {
                  console.log('updated');
                })
                .catch(error => {
                  console.log(error);
                });
            }
          },
          {
            text: 'Cancel',
            role: 'cancel'
          },
        ]
      });
      await alertCtrl.present();      
    }
  }
}
