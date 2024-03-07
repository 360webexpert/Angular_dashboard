import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/_services/api.service';
import Swal from 'sweetalert2';

@Component({
  templateUrl: './editcourse.component.html',
})
export class EditCourseComponent implements OnInit {
  courseId: number;
  courseForm: FormGroup;
  image: File | null = null;
  uploadedFilePath: string | null = null;
  uploadSuccessMessage: string | null = null;
  uploadErrorMessage: string | null = null;
  courseimage: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit() {
    this.courseForm = this.formBuilder.group({
      courseImage: [''],
      courseTitle: ['', Validators.required],
      coursePrice: ['', Validators.required],
      courseDescription: ['', Validators.required],
    });

    this.route.params.subscribe(params => {
      this.courseId = +params['id'];
      if (this.courseId) {
        this.apiService.getCourseById(this.courseId).subscribe(
          (courseDetails) => {
            console.log('courseDetails', courseDetails)
            this.courseimage = courseDetails.courseImage
            this.courseForm.patchValue({
              // courseImage: courseDetails.courseImage,
              courseTitle: courseDetails.courseTitle,
              coursePrice: courseDetails.coursePrice,
              courseDescription: courseDetails.courseDescription,
            });
          },
          (error) => {
            console.error('Error fetching course details:', error);
          }
        );
      }
    });
  }

  onFileChange(event: any) {
    const files = event.target.files;
    const apiUrl = 'http://localhost:8080/api/file/';
    // const apiUrl = 'https://360coder.com/node/file'
    if (files && files.length > 0) {
      this.image = files[0];
      
      if (this.image) {
        this.apiService.uploadFile(this.image).subscribe(
          (response) => {
            console.log('File uploaded successfully:', response);
            this.uploadSuccessMessage = response.message;
            this.uploadErrorMessage = null;
            this.uploadedFilePath = apiUrl + response.fileUrl;
            this.courseForm.patchValue({
              courseImage: apiUrl + response.fileUrl,
            });
  
          
           
          },
          (error) => {
            console.error('Failed to upload file:', error);
            this.uploadErrorMessage = error.message;
            this.uploadSuccessMessage = null;
          }
        );
      }
    }
  }
  

  updateCourse() {
  if (this.courseForm.valid) {
    const updatedCourseData = this.courseForm.value;

    // Show SweetAlert confirmation with custom styling and width
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to update the course!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update it!',
      customClass: {
        confirmButton: 'btn btn-primary', // Set background color and font size
        cancelButton: 'btn btn-secondary'
        // Set background color and font size for cancel button if needed
      },
      width: '30%' // Set the width of the SweetAlert dialog

    }).then((result) => {
      if (result.isConfirmed) {
        // Call your API service to update the course
        this.apiService.updateCourse(this.courseId, updatedCourseData).subscribe(
          (response) => {
            console.log('Course updated successfully', response);

            // Show success SweetAlert with custom styling and width
            Swal.fire({
              title: 'Success!',
              text: 'Course updated successfully.',
              icon: 'success',
              confirmButtonText: 'OK',
              customClass: {
                confirmButton: 'btn btn-primary' // Set background color and font size
              },
              width: '30%' // Set the width of the SweetAlert dialog
            }).then(() => {
              // Redirect to allcourse page
              this.router.navigate(['/allcourse']);
            });
          },
          (error) => {
            console.error('Error updating course', error);

            // Show error SweetAlert with custom styling and width
            Swal.fire({
              title: 'Error!',
              text: 'Failed to update the course. Please try again.',
              icon: 'error',
              confirmButtonText: 'OK',
              customClass: {
                confirmButton: 'btn btn-primary' // Set background color and font size
              },
              width: '30%' // Set the width of the SweetAlert dialog
            });
          }
        );
      }
    });
  }
}

}
