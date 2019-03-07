import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';
import { LoadingController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientAdmissionService } from 'src/app/services/patient-admission.service';

@Component({
  selector: 'app-admission-form',
  templateUrl: './admission-form.page.html',
  styleUrls: ['./admission-form.page.scss'],
})
export class AdmissionFormPage implements OnInit {
  admissionForm: FormGroup;
  constructor(
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private toastService: ToastService,
    private patientAdmissionService: PatientAdmissionService
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm(): any {
    this.admissionForm = this.formBuilder.group({
      patientName: ['', [Validators.required]],
      fatherName: ['', [Validators.required]],
      healthIssue: ['', [Validators.required, Validators.maxLength(120)]],
      religion: ['', [Validators.required]],
      address: ['', [Validators.required, Validators.minLength(6)]],
      state: ['', [Validators.required]],
      city: ['', [Validators.required]],
      mobile: ['', [Validators.required, Validators.maxLength(12)]],
      age: ['', [Validators.required, Validators.maxLength(3)]],
      admissionDate: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      hospitalName: ['', [Validators.required]],
      martialStatus: ['', [Validators.required]],
    });
  }

  async submitAdmissionForm() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
    console.log(this.admissionForm.value);
    const admissionDetails = this.admissionForm.value;
    this.patientAdmissionService
      .createAdmission(admissionDetails)
      .then(() => {
        console.log('cerated');
        loading.dismiss();
        this.admissionForm.reset();
      })
      .catch(error => {
        console.log(error);
        loading.dismiss();
      });
  }
}
