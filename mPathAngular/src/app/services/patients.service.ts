import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  private apiUrl = environment.apiUrl + 'api/patients';
  constructor(private http: HttpClient, private authService: AuthService) { }
  // Get the Patient
  getPatientById(patientId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${patientId}`);
  }
  // Send info to backend to mark recommendation as completed
  markRecommendationAsComplete(patientId: number, recommendation: string): Observable<any> {
    const url = `${this.apiUrl}/patients/${patientId}/recommendations`; // Ensure the correct baseUrl
    return this.http.put(url, { Recommendation: recommendation, Status: 'Completed' });
  }

  // Search Patients and Return what is found
  getPatients(searchQuery: string, page: number, pageSize: number) {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<any>('http://localhost:5249/api/patients', {
      headers,
      params: {
        search: searchQuery,
        page: page.toString(),
        pageSize: pageSize.toString(),
      },
    });

  }
}