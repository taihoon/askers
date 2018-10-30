import { Router, ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  private submitted = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthService) {
      this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
        remember: ['']
      });
    }

  get email(): AbstractControl {
    return this.loginForm.get('email');
  }

  get password(): AbstractControl {
    return this.loginForm.get('password');
  }

  onLoginByProvider(target) {
    this.authService.loginByProvider(target)
      .then(_ => {
        const redirect = this.route.snapshot.queryParams['redirect'] || '/';
        this.router.navigateByUrl(redirect);
      });
  }

  onSubmit(e) {
    e.preventDefault();

    if (!this.submitted) {
      this.submitted = true;
      this.authService
        .login(this.email.value, this.password.value)
        .subscribe(
          _ => {
            const redirect = this.route.snapshot.queryParams['redirect'] || '/';
          this.router.navigateByUrl(redirect);
          },
          err => {
            if (err.code === 'auth/user-not-found') {
              this.email.setErrors({ userNotFound: true });
            }
          }
        );
    }
  }

}
