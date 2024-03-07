// CourseComponent

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/_services/api.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  templateUrl: './course.component.html',
})
export class CourseComponent implements OnInit {
  courseForm: FormGroup;
  instructors: any[] = [];
  image: File | null = null;
  uploadedFilePath: string | null = null;
  uploadSuccessMessage: string | null = null;
  uploadErrorMessage: string | null = null;
  

  constructor(private apiService: ApiService, private formBuilder: FormBuilder, private router: Router) {
    this.courseForm = this.formBuilder.group({
      courseTitle: ['', Validators.required],
      coursePrice: ['', Validators.required],
      courseDescription: ['',Validators.required], 
      courseImage: ['', { validators: [Validators.required] }],
      assignInstructor:['',Validators.required],
// Set initial validators and updateOn
    });
  }

  ngOnInit() {
    this.apiService.getallinstructors().subscribe(
      (instructors) => {
        
        this.instructors = instructors.instructors;
        console.log("AllhuucretyujjkkltttInstructors", this.instructors);
      },
      (error) => {
        console.error("Error fetching instructors:", error);
      }
    );
  }

  onFileChange(event: any) {
    const files = event.target.files;
//  const apiUrl = 'https://360coder.com/node/file'

   const apiUrl = 'http://localhost:8080/api/file/'
    if (files && files.length > 0) {
      this.image = files[0];

      if (this.image) {
        this.apiService.uploadFile(this.image).subscribe(
          (response) => {
          
            console.log('File uploaded successfully:', response);
            this.uploadSuccessMessage = response.message;
            // this.uploadedFilePath = response.fileUrl
            this.uploadErrorMessage = null;
            this.uploadedFilePath = apiUrl+response.fileUrl;

            // Call the API `to get the file URL
          // this.apiService.getFileUrl(response.fileUrl).subscribe(
          //   (fileResponse) => {
          //     console.log('File URL retrieved successfully:', fileResponse);
          //     this.uploadedFilePath = apiUrl+fileResponse.filePath;
          //   },
          //   (error) => {
          //     console.error('Failed to retrieve file URL:', error);
          //     this.uploadErrorMessage = error.message;
          //   }
          // );
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
  
 
    
 

  onSubmit() {
    // Mark the entire form as submitted to trigger validation
    this.courseForm.markAllAsTouched();
  
    if (this.courseForm.valid && this.uploadedFilePath) {
      const formData = new FormData();
      formData.append('courseTitle', this.courseForm.get('courseTitle').value);
      formData.append('coursePrice', this.courseForm.get('coursePrice').value);
      formData.append('courseDescription', this.courseForm.get('courseDescription').value);
      formData.append('assignInstructor', this.courseForm.get('assignInstructor').value);
  
      // Use the uploadedFilePath directly, as the file is already uploaded

  
      formData.append('courseImage', this.uploadedFilePath);
  
      console.log('formData', formData);
  
      this.apiService.createCourse(formData).subscribe(
        (response) => {
          console.log('Course created successfully.', response);
  
          Swal.fire({
            icon: 'success',
            title: 'Course Created',
            text: 'The course has been created successfully.',
          });
  
          this.router.navigate(['/allcourse']);
        },
        (error) => {
          console.error('Failed to create course.', error);
  
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: `${error.error.message}`,
          });
        }
      );
    } else {
      console.error('Form is invalid or file not uploaded. Please check the fields.');
    }
  }



  
  
}
