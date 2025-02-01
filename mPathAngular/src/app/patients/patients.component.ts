import { Component, OnInit } from '@angular/core';
import { PatientsService } from '../services/patients.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms';

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.css'
})
export class PatientsComponent implements OnInit {
  patients: any[] = [];
  searchQuery: string = '';
  page: number = 1;
  pageSize: number = 10;
  totalPatients: number = 0;
  isAuthorized: boolean = false;

  constructor(private patientsService: PatientsService, private authService: AuthService, private router: Router) { }
  // On initial load check if authorized if you are get patients
  ngOnInit(): void {
    this.checkAuthorization();
    if (this.isAuthorized) {
      this.fetchPatients();
    }
  }
  // Check Authorization
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
  // Get Patients from Database
  fetchPatients(): void {
    this.patientsService.getPatients(this.searchQuery, this.page, this.pageSize).subscribe(response => {
      this.patients = response.patients;
      this.totalPatients = response.totalCount;
    });
  }
  // Search the Database for specific patients
  onSearch(): void {
    this.page = 1;
    this.fetchPatients();
  }
  // Send to specific patient detail page
  goToDetails(patientId: string): void {
    this.router.navigate(['/patients', patientId]);
  }
  // Advance pagination
  changePage(newPage: number): void {
    this.page = newPage;
    this.fetchPatients();
  }
}
