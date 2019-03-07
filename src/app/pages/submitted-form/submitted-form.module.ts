import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SubmittedFormPage } from './submitted-form.page';

const routes: Routes = [
  {
    path: '',
    component: SubmittedFormPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SubmittedFormPage]
})
export class SubmittedFormPageModule {}
