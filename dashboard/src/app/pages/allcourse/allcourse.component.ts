// allcourse.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/_services/api.service';
import { DomSanitizer } from '@angular/platform-browser';


import Swal from 'sweetalert2';

@Component({
  templateUrl: './allcourse.component.html',
})
export class allcourseComponent implements OnInit {

  courses: any[] = [];
  

  constructor(private apiService: ApiService,private sanitizer: DomSanitizer) { }

 
  ngOnInit() {
    this.loadCourses();
  }

  loadCourses() {
    this.apiService.getAllCourses().subscribe(
      (allCourses) => {
        // console.log("allCourses", allCourses[0].courseImage);
  
        // Update the courseImage URLs directly
        this.courses = allCourses;
        
      },
      (error) => {
        console.error("Error fetching courses:", error);
      }
    );
  }
  

  
  deleteCourse(courseId: number) {
    // Show SweetAlert confirmation
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete the course!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        // Call your API service to delete the course
        this.apiService.deleteCourse(courseId).subscribe(
          (response) => {
            console.log('Course deleted successfully', response);
  
            // Show success SweetAlert without a title
            Swal.fire({
              text: 'Course deleted successfully.',
              icon: 'success',
              confirmButtonText: 'OK'
            }).then(() => {
              // Reload courses after deletion
              this.loadCourses();
            });
          },
          (error) => {
            console.error('Error deleting course', error);
  
            // Show error SweetAlert without a title
            Swal.fire({
              text: 'Failed to delete the course. Please try again.',
              icon: 'error',
              confirmButtonText: 'OK'
            });
          }
        );
      }
    });
  }
  
}
