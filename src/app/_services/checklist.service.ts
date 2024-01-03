import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from '../../environments/environment';

const API_URL = env.base_url +  '/clubapi/checklist/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ChecklistService {
  constructor(private http: HttpClient) {}

  getChecklist(_userId: string): Observable<any> {
    return this.http.post(
      API_URL + 'get',
      {
        _userId
      },
      httpOptions
    );
  }

  updateChecklist(_id: string, checklist : any): Observable<any> {
    return this.http.post(
      API_URL + 'update',
      {
        _id,
        checklist
      },
      httpOptions
    );
  }


}
