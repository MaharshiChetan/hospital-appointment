import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PatientAdmissionService {
  uid: string;
  constructor(private _firebaseDatabase: AngularFireDatabase, private authService: AuthService) {
    this.uid = this.authService.currentUserId;
  }

  async createAdmission(admissionDetails: any) {
    admissionDetails.uid = this.uid;
    return await this._firebaseDatabase.list(`admissionForm`).push(admissionDetails);
  }

  removeAdmission(admissionKey: string) {
    return this._firebaseDatabase.list(`admissionForm/${admissionKey}`).remove();
  }

  updateAdmission(admissionKey: string, admissionDetails: any) {
    return this._firebaseDatabase.object(`admissionForm/${admissionKey}`).update(admissionDetails);
  }

  getAllAdmissions() {
    return this._firebaseDatabase
      .list('admissionForm')
      .snapshotChanges()
      .pipe(map(actions => actions.map(a => ({ key: a.key, ...a.payload.val() }))));
  }

  getAdmissionById(id: string) {
    return this._firebaseDatabase.object(`admissionForm/${id}`).valueChanges();
  }
}
