// app-routing.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard], // Add AuthGuard here
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule),
      },
    ],
  },
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [AuthGuard], // Add AuthGuard here
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/layouts/auth-layout/auth-layout.module').then(m => m.AuthLayoutModule),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: false,
    }),
  ],
  exports: [
    RouterModule,
  ],
  providers: [AuthGuard], // Add AuthGuard here
})
export class AppRoutingModule {}