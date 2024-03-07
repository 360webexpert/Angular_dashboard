// allcourse.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/_services/api.service';
import { DomSanitizer } from '@angular/platform-browser';


import Swal from 'sweetalert2';

@Component({
  templateUrl: './getallinstructor.component.html',
})
export class allInstructorComponent implements OnInit {

    instructors: any[] = [];
  
    constructor(private apiService: ApiService, private sanitizer: DomSanitizer) { }
  
    ngOnInit() {
      this.loadInstructors();
    }
  
    loadInstructors() {
      this.apiService.getallinstructors().subscribe(
        (instructors) => {
          
          this.instructors = instructors.instructors;
          console.log("All Instructors", this.instructors);
        },
        (error) => {
          console.error("Error fetching instructors:", error);
        }
      );
    }
  }
