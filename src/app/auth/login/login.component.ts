import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  service = inject(AuthService);
  route = inject(Router);

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const payload = this.loginForm.value;
      console.log('Login Payload:', payload);
      this.service.login(payload).subscribe({
        next: (response :any) => {
          let role = response.Result.user.role;
          sessionStorage.setItem('UserToken', response.Result.token);
          sessionStorage.setItem('UserDetails', JSON.stringify(response.Result.user));
          sessionStorage.setItem('UserRole', role);
          if( role == 'BIDDER' ) {
            this.route.navigate(['/bidder-dashboard']);
          }
          if (role == 'ADMIN' || role == 'SUPER_ADMIN' || role == 'APPROVER') {
            this.route.navigate(['/view-dashboard']);
          }
        },
        error: (error) => {}
      });
    } else {
      this.loginForm.markAllAsTouched(); // show errors
    }
  }
}
