import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegisterService } from './register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  service = inject(RegisterService);
  route = inject(Router);


  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      role: ['BIDDER', [Validators.required]],
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      reason: ['', Validators.required],
      address: ['', [Validators.required]],
      company: [''],
    }, { validator: this.passwordMatchValidator });
  }
  ngOnInit() {

  }

  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return password === confirm ? null : { mismatch: true };
  }

  onSubmit() {
    console.log(this.registerForm.value.role, "role");
    
    if (this.registerForm.valid) {
      const payload = {
        fullName: this.registerForm.value.fullName,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        phone: this.registerForm.value.phone,
        address: this.registerForm.value.address,
        role: this.registerForm.value.role,
        approvalStatus: 'PENDING',
        registrationDate: new Date().toISOString(),
        reasonForRegistration: this.registerForm.value.reason,
      };
      // Call service to submit payload
      console.log(payload);
      this.service.create(payload).subscribe({
        next: (response) => {
          console.log('User registered successfully', response);
          alert('User registered successfully');
          this.route.navigate(['/auth/login']);
        },
        error: (error) => {
          console.error('Error registering user', error);
        }
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
