// allcourse.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/_services/api.service';
import { DomSanitizer } from '@angular/platform-browser';


import Swal from 'sweetalert2';

@Component({
  templateUrl: './allusers.component.html',
})
export class allUsersComponent implements OnInit {

  users: any[] = [];

  constructor(private apiService: ApiService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.apiService.getAllUsers().subscribe(
      (allUsers) => {
        console.log("allUsers", allUsers);
        this.users = allUsers;
      },
      (error) => {
        console.error("Error fetching users:", error);
      }
    );
  }

  confirmDelete(userId: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete the user!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteUser(userId);
      }
    });
  }

  deleteUser(id: number) {
    this.apiService.deleteUser(id).subscribe(
      (response) => {
        console.log('User deleted successfully', response);
        Swal.fire({
          text: 'User deleted successfully.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          this.loadUsers();
        });
      },
      (error) => {
        console.error('Error deleting user', error);
        Swal.fire({
          text: 'Failed to delete the user. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    );
  }
}
