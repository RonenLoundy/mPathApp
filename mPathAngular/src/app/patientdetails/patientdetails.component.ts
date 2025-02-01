import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientsService } from '../services/patients.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule],
  selector: 'app-patientdetails',
  templateUrl: './patientdetails.component.html',
  styleUrls: ['./patientdetails.component.css']
})
export class PatientdetailsComponent implements OnInit {
  patientId: number | undefined;
  patient: any = null;
  recommendations: any[] = [];
  errorMessage: string = '';
  isAuthorized: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private patientsService: PatientsService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.checkAuthorization(); // Check authorization when the component initializes

    if (this.isAuthorized) {
      // Retrieve the patient ID from the route parameters
      this.route.params.subscribe(params => {
        this.patientId = +params['id']; // '+' converts string to number
        if (this.patientId !== undefined) {
          this.fetchPatientDetails();
        } else {
          this.errorMessage = 'Invalid patient ID';
        }
      });
    } else {
      this.router.navigate(['/']); // Redirect to home if not authorized
    }
  }

  checkAuthorization(): void {
    const userRole = this.authService.getUserRole(); // Assuming this returns the user role
    this.isAuthorized = userRole === 'Provider'; // Check if the role is 'Provider'
    if (typeof window !== 'undefined') {
      alert("Access Denied: Only HealthCare Professionals can view this page.");
    }
    this.router.navigate(['/']); // Redirect to home if not authorized
  }

  fetchPatientDetails(): void {
    // Check if patientId is valid before making the API call
    if (this.patientId !== undefined) {
      this.patientsService.getPatientById(this.patientId).subscribe({
        next: (response) => {
          console.log('Backend Response:', response); // Log the response to check its structure
          this.patient = response;
          this.recommendations = response.recommendations;
        },
        error: (error) => {
          this.errorMessage = 'Error fetching patient details';
          console.error(error);
        }
      });
    }
  }

  goBack(): void {
    window.history.back(); // Goes back to the previous page
  }

  markRecommendationComplete(recommendation: any): void {
    if (this.patientId !== undefined) {  // Check if patientId is not undefined
      this.patientsService.markRecommendationAsComplete(this.patientId, recommendation.recommendation)
        .subscribe({
          next: (response) => {
            // Update the recommendation status locally to reflect the change
            recommendation.recommendationStatus = 'Completed';
          },
          error: (error) => {
            this.errorMessage = 'Error updating recommendation status';
            console.error(error);
          }
        });
    } else {
      console.error('Patient ID is undefined');
    }
  }
}
