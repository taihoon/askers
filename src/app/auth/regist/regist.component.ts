import { Router, ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { identicalToValidator } from '../../shared/identical-to-validator.directive';

@Component({
  selector: 'app-regist',
  templateUrl: './regist.component.html',
  styleUrls: ['./regist.component.css']
})
export class RegistComponent {
  registForm: FormGroup;
  submitted = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthService) {
    /**
      custom validator called 3 times.
      see also https://github.com/angular/angular/issues/14542
    */
    this.registForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      passwordConfirm: ['', [Validators.required, identicalToValidator('password')]]
    });
  }

  get email() {
    return this.registForm.get('email');
  }

  get password() {
    return this.registForm.get('password');
  }

  get passwordConfirm() {
    return this.registForm.get('passwordConfirm');
  }

  onSubmit(e) {
    e.preventDefault();
    if (!this.submitted) {
      this.submitted = true;
      this.authService.createUser(
        this.email.value,
        this.password.value
      ).subscribe(
        user => {
          const redirect = this.route.snapshot.queryParams['redirect'] || '/';
          this.router.navigateByUrl(redirect);
        },
        err => {
          // How to focus it?
          // see also https://github.com/angular/angular/issues/12463
          if (err.code === 'auth/email-already-in-use') {
            this.email.setErrors({ alreadyInUse: true });
          } else if (err.code === 'auth/weak-password') {
            this.password.setErrors({ weekPassword: true });
          }
          this.submitted = false;
        }
      );
    }
  }

}
