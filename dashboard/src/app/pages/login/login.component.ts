import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/authentication.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  focus: boolean;
  focus1: boolean; // Added this line
  loginForm: FormGroup;
  loading: boolean;


  constructor(
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    // Initialize the login form with validation rules
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    
    // Initialize focus1
    this.focus1 = false;
  }

  ngOnInit() {
    // Initialization logic can go here
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
this.loading =  true
      this.authService.loginUser({ email, password })
        .subscribe({
          next: (res) => {
            if (res?.data?.role === 'admin') {
              this.authService.setToken(res.token);
              this.router.navigate(['/dashboard'], { relativeTo: this.route });
              sessionStorage.setItem('userRole', 'admin');
            } 
            else 
            if (res?.data?.role === 'instructor') {
              console.log(res?.data?.role,"jjjjj")
              this.authService.setToken(res.token);

              this.router.navigate(['/assigncoursesComponent'], { relativeTo: this.route });
              sessionStorage.setItem('userRole', 'instructor');
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Login failed',
                text: 'Login with admin credentials!',
              });
              this.loading =  false
            }
          },
          error: (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Login failed',
              text: `${error?.error?.message || 'An error occurred during login.'}`,
            });
            this.loading =  false
          },
        });
    } else {
      this.markAllFieldsAsTouched(this.loginForm);
    }
  }

  private markAllFieldsAsTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      if (control instanceof FormGroup) {
        this.markAllFieldsAsTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  }
}
