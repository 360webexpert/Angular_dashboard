// allcourse.component.ts

import { Component, OnInit } from '@angular/core';


import { ApiService } from 'src/app/_services/api.service';
import { DomSanitizer } from '@angular/platform-browser';




@Component({
  templateUrl: './assignedcourse.component.html',
})
export class AssigncoursesComponent implements OnInit {

    assigncourse: any[] = [];
  

  constructor(private apiService: ApiService,private sanitizer: DomSanitizer) { }

 
  ngOnInit() {
    this.loadassigncourse();
  }

  loadassigncourse() {
    this.apiService.getAssignCourses().subscribe(
      (getAssignCourses) => {
        
        this.assigncourse = getAssignCourses.courses;
        console.log( this.assigncourse ,"kkkkkkk")
        
      },
      (error) => {
        console.error("Error fetching courses:", error);
      }
    );
  }
  

 
}
