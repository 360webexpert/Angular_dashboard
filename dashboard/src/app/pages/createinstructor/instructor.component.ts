import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/_services/api.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',

})
export class InstructorComponent implements OnInit {
  instructorForm: FormGroup;

  constructor(private apiService: ApiService, private formBuilder: FormBuilder, private router: Router) {
    this.instructorForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
    });
  }

  ngOnInit() {}

  onSubmit() {
    this.instructorForm.markAllAsTouched();

    if (this.instructorForm.valid) {
      this.apiService.createInstructor(this.instructorForm.value).subscribe(
        (response) => {
          console.log('Instructor created successfully.', response);

          Swal.fire({
            icon: 'success',
            title: 'Instructor Created',
            text: 'The Instructor has been created successfully.',
          });
          this.router.navigate(['/allInstructorComponent']);
          // Redirect or perform any other action after successful creation
        },
        (error) => {
          console.error('Failed to create Instructor.', error);

          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: `${error.error.message}`,
          });
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }
}
