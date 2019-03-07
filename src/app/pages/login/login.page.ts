import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NavController, LoadingController } from '@ionic/angular';
import { ToastService } from '../../services/toast.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  formErrors = {
    email: '',
    password: '',
  };

  validationMessages = {
    email: {
      required: 'Email is required.',
      email: 'Email must be a valid email',
    },
    password: {
      required: 'Password is required.',
      pattern: 'Password must be include at one letter and one number.',
      minlength: 'Password must be at least 6 characters long.',
      maxlength: 'Password cannot be more than 40 characters long.',
    },
  };

  constructor(
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private toastService: ToastService,
    private _firebaseAuth: AngularFireAuth
  ) {}

  ngOnInit() {
    this._firebaseAuth.authState.subscribe(state => {
      if (state) {
        this.navCtrl.navigateRoot(['home']);
      }
    });
    this.buildForm();
  }

  buildForm(): any {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
          Validators.minLength(6),
          Validators.maxLength(25),
        ],
      ],
    });

    this.loginForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // reset validation messages
  }

  onValueChanged(data?: any) {
    if (!this.loginForm) {
      return;
    }
    const form = this.loginForm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  pushRegisterPage() {
    this.navCtrl.navigateForward(['register']);
  }

  async login() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();

    const loginCredentials = this.loginForm.value;
    this.authService
      .login(loginCredentials)
      .then(() => {
        this.loginForm.reset();
        loading.dismiss();
        this.toastService.showToast('Successfully logged In!');
        this.navCtrl.navigateRoot(['home']);
      })
      .catch(error => {
        loading.dismiss();
        this.toastService.showToast(error.message);
      });
  }
}
