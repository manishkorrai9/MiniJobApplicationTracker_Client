import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private baseUrl = 'http://localhost:5000/api/jobs';

  constructor(private http: HttpClient) {}

  //  Get all jobs
  getJobs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/get`);
  }

  //  Create a new job
  createJob(jobData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/create`, jobData);
  }

  //  Delete job by ID
  deleteJob(jobId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${jobId}`);
  }

  //  Update job 
  updateJob(jobId: string, jobData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${jobId}`, jobData);
  }
}
