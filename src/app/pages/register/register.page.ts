import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  formErrors = {
    fullName: '',
    email: '',
    password: '',
  };

  validationMessages = {
    fullName: {
      required: 'Name is required',
    },
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
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm(): any {
    this.registerForm = this.formBuilder.group({
      fullName: ['', [Validators.required]],
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

    this.registerForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // reset validation messages
  }

  onValueChanged(data?: any) {
    if (!this.registerForm) {
      return;
    }
    const form = this.registerForm;
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

  async register() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();

    const signupCredentials = this.registerForm.value;
    this.authService
      .singup(signupCredentials)
      .then(() => {
        loading.dismiss();
        this.registerForm.reset();
        this.toastService.showToast('Account is registered Successfully!');
        this.navCtrl.navigateRoot(['home']);
      })
      .catch(error => {
        loading.dismiss();
        this.toastService.showToast(error.message);
      });
  }

  pushLoginPage() {
    this.navCtrl.pop();
  }
}
