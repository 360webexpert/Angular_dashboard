import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { ApiService } from './_services/api.service';
import { CourseComponent } from './pages/course/course.component';
import { allcourseComponent } from './pages/allcourse/allcourse.component';
import { LoginComponent } from './pages/login/login.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { EditCourseComponent } from './pages/editcourse/editcourse.component';
import { AlltransationComponent } from './pages/alltransation/alltransation.component';
import { AuthenticationService } from './authentication.service';
import { AuthGuard } from './auth.guard';
import { allUsersComponent } from './pages/users/allusers.component';
import { UserProfileEditComponent } from './pages/users/edituser.component';
 
import {UserdetailsComponent} from "./pages/userdetails/userdetails.component"
import {InstructorComponent} from "./pages/createinstructor/instructor.component"
import {allInstructorComponent} from "./pages/getallinstructor/getallinstructor.component"

import { AssigncoursesComponent } from './pages/Instructor/assignedcourse.component';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,
    
    

  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    CourseComponent,
    allcourseComponent,
    LoginComponent,
    UserProfileComponent,
    EditCourseComponent,
    AlltransationComponent,
    allUsersComponent,
    UserProfileEditComponent,
    UserdetailsComponent,
    InstructorComponent,
    allInstructorComponent,
    AssigncoursesComponent
   
  ],
  providers: [ApiService,AuthenticationService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
