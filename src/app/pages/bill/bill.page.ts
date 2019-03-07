import { Component, OnInit } from '@angular/core';
import { BillService } from 'src/app/services/bill.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.page.html',
  styleUrls: ['./bill.page.scss'],
})
export class BillPage implements OnInit {
  generatedBillForms: any;
  role: string;
  billId: string;
  constructor(
    private billService: BillService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.role = this.authService.role;
    this.billId = this.route.snapshot.paramMap.get('id');
    this.billService.getBill(this.billId).subscribe(data => {
      console.log(data);
      this.generatedBillForms = data;
    });
  }

  pay() {
    this.generatedBillForms.payment = true;
    this.billService
      .payBill(this.generatedBillForms, this.billId)
      .then(() => {
        console.log('success');
      })
      .catch(e => {
        console.log(e);
      });
  }
}
