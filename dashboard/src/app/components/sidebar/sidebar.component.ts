import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/_services/api.service';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  
  { path: '/dashboard', title: 'Dashboard', icon: 'ni-tv-2 text-black', class: '' },
  { path: '/create-course', title: 'Add New Course', icon: 'ni-fat-add text-black', class: '' },
  { path: '/allcourse', title: 'All Courses', icon: 'ni-book-bookmark text-black', class: '' },
  { path: '/allusers', title: 'All Users', icon: 'ni-single-02 text-black', class: '' },
  { path: '/instructor', title: 'Add New Instructor', icon: 'ni-single-02 text-black', class: '' },
  { path: '/alltransations', title: 'All Transactions', icon: 'ni-money-coins text-black', class: '' },
  { path: '/allInstructorComponent', title: 'All Instructor', icon: 'ni-money-coins text-black', class: '' },
  { path: '/assigncoursesComponent', title: 'Assigned Course', icon: 'ni-money-coins text-black', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: RouteInfo[];
  public isCollapsed = true;
  userId: string;
  userRole: string;

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getusertoken();
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
  }
  
  getusertoken() {
    this.apiService.getUserByToken().subscribe(
      (userData) => {
        console.log('userdata', userData);
        this.userId = userData.id;
        this.userRole = userData.role;
        console.log(this.userId, "jjjjkjkjkjkjkkj");
        this.updateSidebarMenu(this.userRole);
      },
      (error) => {
        console.error('Error fetching user data:', error);
        this.router.navigate(['/login']);
      }
    );
  }
  
  updateSidebarMenu(userRole: string = 'default') {
    if (userRole === 'instructor') {
      this.menuItems = ROUTES.filter(menuItem => menuItem.path === '/assigncoursesComponent');
    } else {
      this.menuItems = ROUTES.filter(menuItem => menuItem.path !== '/assigncoursesComponent');
    }
  }
}
