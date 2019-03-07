import { Component, OnInit } from '@angular/core';
import { PatientAdmissionService } from 'src/app/services/patient-admission.service';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController } from '@ionic/angular';

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
    private alertCtrl: AlertController
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
}
