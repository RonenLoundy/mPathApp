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
  // On load check authorized if so display details if not send home
  ngOnInit(): void {
    this.checkAuthorization(); // Check authorization when the component initializes

    if (this.isAuthorized) {
      this.route.params.subscribe(params => {
        this.patientId = +params['id'];
        if (this.patientId !== undefined) {
          this.fetchPatientDetails();
        } else {
          this.errorMessage = 'Invalid patient ID';
        }
      });
    } else {
      // Redirect to home if not authorized
      this.router.navigate(['/']);
    }
  }
  // Check if authorized to view patient details
  checkAuthorization(): void {
    const userRole = this.authService.getUserRole();
    this.isAuthorized = userRole === 'Provider';
    if (!this.isAuthorized) {
      if (typeof window !== 'undefined') {
        alert("Access Denied: Only HealthCare Professionals can view this page.");
      }
      this.router.navigate(['/']);
    }
  }
  // Get specified Patient
  fetchPatientDetails(): void {
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
  // Return to previously visited page - consider sending back to patients page
  goBack(): void {
    window.history.back();
  }
  // Send info to backend through patients service to mark recommendation as completed
  markRecommendationComplete(recommendation: any): void {
    if (this.patientId !== undefined) {
      this.patientsService.markRecommendationAsComplete(this.patientId, recommendation.recommendation)
        .subscribe({
          next: (response) => {
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
