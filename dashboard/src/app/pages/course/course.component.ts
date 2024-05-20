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
    const apiUrl = 'http://localhost:8080/api/file/'; // API URL
    if (files && files.length > 0) {
      const file = files[0];
      // Check if the file is of an allowed type
      if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/jpg') {
        // Display an error message if the file type is incorrect
        Swal.fire({
          icon: 'error',
          title: 'Invalid File Type',
          text: 'Please upload an image in JPG or PNG format only.',
          confirmButtonText: 'OK'
        });
        return; // Exit the function to prevent further execution
      }
      // If the file is valid, proceed with the file upload
      this.apiService.uploadFile(file).subscribe(
        (response) => {
          console.log('File uploaded successfully:', response);
          this.uploadSuccessMessage = response.message;
          this.uploadErrorMessage = null;
          this.uploadedFilePath = apiUrl + response.fileUrl; // Concatenate API URL with file path
        },
        (error) => {
          console.error('Failed to upload file:', error);
          this.uploadErrorMessage = error.message;
          this.uploadSuccessMessage = null;
        }
      );
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
