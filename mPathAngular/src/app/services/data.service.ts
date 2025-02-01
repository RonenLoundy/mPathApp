// src/app/services/data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class DataService {
    private apiUrl = 'http://localhost:5000/api/YourEntity';

    constructor(private http: HttpClient) { }

    getEntities(): Observable<any> {
        return this.http.get<any>(this.apiUrl);
    }
}
