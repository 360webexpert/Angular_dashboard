import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { first, switchMap } from 'rxjs/operators';

import { Country, State, City, ICountry, IState, ICity } from 'country-state-city';
import Swal from 'sweetalert2';
import { ApiService } from 'src/app/_services/api.service';


interface University {
    country: string;
    university_name: string;
    university_url: string;
  }
@Component({
    
    templateUrl: '/userdetails.component.html',
})
export class UserdetailsComponent implements OnInit {
    focus: boolean = false;
    focus2: boolean = false;
    focus3: boolean = false;
    focus4: boolean = false;
    focus5: boolean = false;
    focus6: boolean = false;
    focus7: boolean = false;
    focus8: boolean = false;
    focus9: boolean = false;
    focus10: boolean = false;
    focus11: boolean = false;
    focus12: boolean = false;
    focus13: boolean = false;
    focus14: boolean = false;
    focus15: boolean = false;
    focus16: boolean = false;
    focus17: boolean = false;
    focus18: boolean = false;
    focus19: boolean = false;
    focus20: boolean = false;
    profileForm: FormGroup;
    countries: ICountry[] = [];
    states: IState[] = [];
    cities: ICity[] = [];
    userId: any;
    loading = false;
    submitted = false;
    universities: University[];

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private apiService: ApiService,
    ) { }

    ngOnInit() {
     
        // Fetch user data from API and set it in the form fields
        this.route.params.subscribe(params => {
            // console.log('params', params['id'])
        this.apiService.getUserById(params['id']).pipe(
            switchMap((userData) => {
                console.log('userdata', userData);
                this.apiService.getalluniversities().subscribe((universities: University[]) => {
                    this.universities = universities;
                    console.log('universities', this.universities);
                  });
                this.userId = userData.id;

                const countryIsoCode = userData.country;
                const stateIsoCode = userData.state;

                // Populate countries, states, and cities
                this.countries = Country.getAllCountries();
                this.states = State.getStatesOfCountry(countryIsoCode);
                this.cities = City.getCitiesOfState(countryIsoCode, stateIsoCode);

                // Initialize the form after populating countries, states, and cities
                this.profileForm = this.formBuilder.group({
                    firstName: [userData.firstName, Validators.required],
                    lastName: [userData.lastName, Validators.required],
                    // Disable the email and password fields
                    email: [{ value: userData.email, disabled: true }, [Validators.required, Validators.email]],
                    password: [{ value: userData.password, disabled: true }, [Validators.required, Validators.minLength(6)]],
                    phoneNumber: [userData.phoneNumber, Validators.required],
                    addressLane1: [userData.addressLane1, Validators.required],
                    addressLane2: [userData.addressLane2],
                    country: [userData.country, Validators.required],
                    state: [userData.state, Validators.required],
                    city: [userData.city, Validators.required],
                    zipCode: [userData.zipCode, Validators.required],
                    interestedInInternship: [userData.interestedInInternship, Validators.required],
                    universityName: [userData.universityName, Validators.required],
                    otherUniversityName: [userData.otherUniversityName],
                    currentProgram: [userData.currentProgram, Validators.required],
                    graduatingYear: [userData.graduatingYear, [Validators.required]],
                    alreadyGraduated: [userData.alreadyGraduated.toString(), Validators.required],
                    schoolEmail: [userData.schoolEmail],
                    userId: [this.userId],
                });
                console.log("firstName value:", this.profileForm.get('firstName').value);
                // Use switchMap to continue the observable chain and fetch additional details if needed
                return this.apiService.getUserById(params['id']); // Replace with your actual method to get additional details
            })
        ).subscribe((details) => {
            // Update the form with additional details if needed
            this.profileForm.patchValue({
                // ... (update form controls with additional details if needed)
            });
        });
    })
    }

    // Event handler for country change
    onCountryChange() {
        const countryIsoCode = this.profileForm.value.country;
        this.states = State.getStatesOfCountry(countryIsoCode);
        this.profileForm.patchValue({ state: '' }); // Reset state and city when country changes
        this.cities = [];
    }

    // Event handler for state change
    onStateChange() {
        const countryIsoCode = this.profileForm.value.country;
        const stateIsoCode = this.profileForm.value.state;
        this.cities = City.getCitiesOfState(countryIsoCode, stateIsoCode);
        this.profileForm.patchValue({ city: '' }); // Reset city when state changes
    }

    onSubmit() {
        debugger
        this.submitted = true;

        if (this.profileForm.invalid) {
            return;
        }
        console.log('this.profileForm.value', this.profileForm.value)
        this.loading = true;

        this.apiService
            .updateUser(this.userId, this.profileForm.value)
            .pipe(first())
            .subscribe({
                next: (res) => {
                    Swal.fire({
                        icon: 'success',
                        title: 'User updated',
                    });
                    this.loading = false;
                    console.log('Profile updated successfully', res);
                },
                error: (error) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'User update failed',
                        text: `${error}`,
                    });
                    this.loading = false;
                },
            });
    }
}

