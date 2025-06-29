import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rhum, RhumResponse } from '../models/rhum.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RhumService {
  private apiUrl = `${environment.apiUrl}/rhums`;

  constructor(private http: HttpClient) { }

  getAllRhums(page: number = 1, limit: number = 10): Observable<RhumResponse> {
    return this.http.get<RhumResponse>(`${this.apiUrl}?page=${page}&limit=${limit}`);
  }

  getRhumById(id: string): Observable<Rhum> {
    return this.http.get<Rhum>(`${this.apiUrl}/${id}`);
  }

  createRhum(rhumData: Partial<Rhum>): Observable<Rhum> {
    return this.http.post<Rhum>(this.apiUrl, rhumData);
  }

  updateRhum(id: string, rhumData: Partial<Rhum>): Observable<Rhum> {
    return this.http.put<Rhum>(`${this.apiUrl}/${id}`, rhumData);
  }

  deleteRhum(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // New method to get random rhums
  getRandomRhums(count: number = 3): Observable<RhumResponse> {
    return this.http.get<RhumResponse>(`${this.apiUrl}/random?count=${count}`);
  }
}