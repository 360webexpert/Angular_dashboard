import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.services';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // private apiUrl = environment.apiUrl;



  private apiUrl = 'http://localhost:8080/api'; // Replace with your API URL

  //  private apiUrl = 'https://360coder.com/node/api'; // Replace with your API URL

  constructor(private http: HttpClient, private authService: AuthService) { }

  registerUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/createuser`, userData);
  }

  loginUser(userData: any): Observable<any> {


    return this.http.post(`${this.apiUrl}/login`, userData);
  }

  getUserByToken(): Observable<any> {

    const url = `${this.apiUrl}/user`;

    // Get the authentication token from your authentication service
    const authToken = this.authService.getToken();

    // Set up headers with the authentication token
    const headers = new HttpHeaders().set('Authorization', `${authToken}`);

    // Make the GET request with headers
    return this.http.get<any>(url, { headers });
  }
  getAllUsers(): Observable<any> {

    const url = `${this.apiUrl}/allusers`;

    // Get the authentication token from your authentication service
    const authToken = this.authService.getToken();

    // Set up headers with the authentication token
    const headers = new HttpHeaders().set('Authorization', `${authToken}`);

    // Make the GET request with headers
    return this.http.get<any>(url, { headers });
  }
  updateUser(userId: number, userData: any): Observable<any> {
    const url = `${this.apiUrl}/updateuser/${userId}`;

    // Get the authentication token from your authentication service
    const authToken = this.authService.getToken();

    // Set up headers with the authentication token
    const headers = new HttpHeaders().set('Authorization', `${authToken}`);

    // Make the PUT request with headers
    return this.http.post(url, userData, { headers });
  }
  getUserById(userId: number): Observable<any> {
    const url = `${this.apiUrl}/user/${userId}`;


    const authToken = this.authService.getToken();


    const headers = new HttpHeaders().set('Authorization', `${authToken}`);

    // Make the PUT request with headers
    return this.http.get<any>(url, { headers });
  }


  forgotpwd(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/forget-password`, userData);
  }
  // File upload method
  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    // Define headers with "Content-Type: multipart/form-data"
    // const headers = new HttpHeaders({
    //   'Content-Type': 'multipart/form-data'
    // });

    // Pass headers as options to the post request
    return this.http.post(`${this.apiUrl}/upload`, formData);
  }

  getFileUrl(filename: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/file/${filename}`);
  }
  createCourse(formData: FormData): Observable<any> {
    console.log('formData', formData)
    return this.http.post(`${this.apiUrl}/createcourse`, formData);
  }

  // get all courses
  getAllCourses(): Observable<any> {
    const url = `${this.apiUrl}/getallcourses`;

    return this.http.get<any>(url);
  }


  deleteCourse(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }




  getCourseById(courseId: number): Observable<any> {
    const url = `${this.apiUrl}/getcoursedetails/${courseId}`;

    // Make the GET request without headers
    return this.http.get<any>(url);
  }



  gettransactionsid(id: number): Observable<any> {
    const url = `${this.apiUrl}/get-transactions/${id}`;
    const authToken = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `${authToken}`);
    // Make the GET request with headers
    return this.http.get<any>(url, { headers });
  }
  updateCourse(id: number, updatedCourseData: any): Observable<any> {
    const url = `${this.apiUrl}/updatecourses/${id}`;
    return this.http.put<any>(url, updatedCourseData);
  }

  getalltransaction(): Observable<any> {
    const url = `${this.apiUrl}/getTransactions`;
    const authToken = this.authService.getToken();

    // Set up headers with the authentication token
    const headers = new HttpHeaders().set('Authorization', `${authToken}`);
    // Make the GET request with headers
    return this.http.get<any>(url, { headers });
  }
  getalluniversities(): Observable<any> {

    return this.http.get(`${this.apiUrl}/getalluniversities`);
  }


  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }

  // instructor
  createInstructor(Instructor: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/createinstructor`, Instructor);
  }


  getallinstructors(): Observable<any> {
    const url = `${this.apiUrl}/getallinstructors`;

    return this.http.get<any>(url);
  }


  deleteinstructors(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteinstructors/${id}`);
  }

  updateinstructors(id: number, updatedCourseData: any): Observable<any> {
    const url = `${this.apiUrl}/updateinstructors/${id}`;
    return this.http.put<any>(url, updatedCourseData);
  }

  getsingleinstructors(instructorid: number): Observable<any> {
    const url = `${this.apiUrl}/getsingleinstructors/${instructorid}`;

    // Make the GET request without headers
    return this.http.get<any>(url);
  }




  getAssignCourses(): Observable<any> {
    const url = `${this.apiUrl}/assignCourse`;
    const authToken = this.authService.getToken();

    // Set up headers with the authentication token
    const headers = new HttpHeaders().set('Authorization', `${authToken}`);
    // Make the GET request with headers
    return this.http.get<any>(url, { headers });
  }

}









