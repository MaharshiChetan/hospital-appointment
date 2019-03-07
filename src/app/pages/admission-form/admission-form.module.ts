import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AdmissionFormPage } from './admission-form.page';

const routes: Routes = [
  {
    path: '',
    component: AdmissionFormPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [AdmissionFormPage],
})
export class AdmissionFormPageModule {}
