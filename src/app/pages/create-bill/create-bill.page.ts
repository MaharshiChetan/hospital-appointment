import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PatientAdmissionService } from 'src/app/services/patient-admission.service';
import { BillService } from 'src/app/services/bill.service';
import { NavController } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-create-bill',
  templateUrl: './create-bill.page.html',
  styleUrls: ['./create-bill.page.scss'],
})
export class CreateBillPage implements OnInit {
  admissionFormId: string;
  billForm: FormGroup;
  admissionDetails: any;
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private patientAdmissionService: PatientAdmissionService,
    private billService: BillService,
    private navCtrl: NavController,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.buildForm();
    this.admissionFormId = this.route.snapshot.paramMap.get('id');
    this.getPatientAdmissionDetails();
  }

  buildForm(): any {
    if (this.admissionDetails) {
      this.billForm = this.formBuilder.group({
        patientName: [this.admissionDetails.patientName, [Validators.required]],
        doctorName: ['', [Validators.required]],
        admissionDate: [this.admissionDetails.admissionDate, [Validators.required]],
        dischargeDate: ['', [Validators.required]],
        age: [this.admissionDetails.age, [Validators.required]],
        gender: [this.admissionDetails.gender, [Validators.required]],
        medicineCharge: ['', [Validators.required]],
        testsCharge: ['', [Validators.required]],
        totalCharge: ['', [Validators.required]],
      });
      return;
    }
    this.billForm = this.formBuilder.group({
      patientName: ['', [Validators.required]],
      doctorName: ['', [Validators.required]],
      admissionDate: ['', [Validators.required]],
      dischargeDate: ['', [Validators.required]],
      age: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      medicineCharge: ['', [Validators.required]],
      testsCharge: ['', [Validators.required]],
      totalCharge: ['', [Validators.required]],
    });
  }

  getPatientAdmissionDetails() {
    const subscription = this.patientAdmissionService
      .getAdmissionById(this.admissionFormId)
      .subscribe(data => {
        console.log(data);
        this.admissionDetails = data;
        this.buildForm();
        subscription.unsubscribe();
      });
  }

   createBill() {
    const billDetails = this.billForm.value;
    this.billService
      .createBill(billDetails, this.admissionFormId)
      .then(async () => {
        console.log('success');
        await this.toastService.showToast('Bill generated successfully!');
        this.navCtrl.back();
      })
      .catch(e => {
        console.log(e);
      });
  }
}
