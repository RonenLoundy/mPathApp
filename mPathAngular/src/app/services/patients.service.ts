import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {
  private apiUrl = 'http://localhost:5249/api/patients'; // Adjust API URL

  constructor(private http: HttpClient, private authService: AuthService) { }
  getPatientById(patientId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${patientId}`);
  }

  markRecommendationAsComplete(patientId: number, recommendation: string): Observable<any> {
    const url = `${this.apiUrl}/patients/${patientId}/recommendations`; // Ensure the correct baseUrl
    return this.http.put(url, { Recommendation: recommendation, Status: 'Completed' });
  }


  getPatients(searchQuery: string, page: number, pageSize: number) {
    const token = this.authService.getToken();  // Assuming you have a method to get the JWT
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