import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';


import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';

import { CourseComponent } from 'src/app/pages/course/course.component';
import { allcourseComponent } from 'src/app/pages/allcourse/allcourse.component';
import { EditCourseComponent } from 'src/app/pages/editcourse/editcourse.component';
import { AlltransationComponent } from 'src/app/pages/alltransation/alltransation.component';
import { allUsersComponent } from 'src/app/pages/users/allusers.component';
import { UserProfileEditComponent } from 'src/app/pages/users/edituser.component';
import { UserdetailsComponent } from 'src/app/pages/userdetails/userdetails.component';
import { InstructorComponent } from 'src/app/pages/createinstructor/instructor.component';
// import {allInstructorComponent} from ""
import { allInstructorComponent } from 'src/app/pages/getallinstructor/getallinstructor.component';
import { AssigncoursesComponent } from 'src/app/pages/Instructor/assignedcourse.component';


export const AdminLayoutRoutes: Routes = [
    
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'instructor',         component: InstructorComponent },
    { path: 'create-course',         component: CourseComponent },
    { path: 'allcourse',         component: allcourseComponent },
    { path: 'allusers',         component: allUsersComponent },
    { path: 'editcourse/:id',         component: EditCourseComponent },
    { path: 'edituser/:id',         component: UserProfileEditComponent },
    { path: 'userdetails/:id',         component: UserdetailsComponent },
    { path: 'alltransations',         component: AlltransationComponent },
    { path: 'allInstructorComponent',         component: allInstructorComponent },
    { path: 'assigncoursesComponent',         component: AssigncoursesComponent },


    // AssigncoursesComponent
    
];
