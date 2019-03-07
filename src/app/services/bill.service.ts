import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class BillService {
  uid: string;
  constructor(private _firebaseDatabase: AngularFireDatabase, private authService: AuthService) {
    this.uid = this.authService.currentUserId;
  }

  async createBill(billDetails: any, id: string) {
    billDetails.uid = this.uid;
    return this._firebaseDatabase.list(`bill`).set(id, billDetails);
  }

  getBill(id: string) {
    return this._firebaseDatabase.object(`bill/${id}`).valueChanges();
  }

  payBill(billDetails: any, id: string) {
    return this._firebaseDatabase.list(`bill`).update(id, billDetails);
  }
}
