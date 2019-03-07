import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: './pages/login/login.module#LoginPageModule',
    canActivate: [LoginGuard],
  },
  {
    path: 'home',
    loadChildren: './pages/home/home.module#HomePageModule',
    canActivate: [AuthGuard],
  },
  {
    path: 'register',
    loadChildren: './pages/register/register.module#RegisterPageModule',
    canActivate: [LoginGuard],
  },
  {
    path: 'admission-form',
    loadChildren: './pages/admission-form/admission-form.module#AdmissionFormPageModule',
  },
  {
    path: 'submitted-form',
    loadChildren: './pages/submitted-form/submitted-form.module#SubmittedFormPageModule',
  },
  {
    path: 'create-bill/:id',
    loadChildren: './pages/create-bill/create-bill.module#CreateBillPageModule',
  },
  { path: 'bill/:id', loadChildren: './pages/bill/bill.module#BillPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
