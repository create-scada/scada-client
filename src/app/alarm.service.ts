import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment as env } from "../environments/environment";


import { Observable } from 'rxjs';
import { Alarm } from './model';

@Injectable({
  providedIn: 'root'
})
export class AlarmService {

  

  constructor(
    private http: HttpClient
  ) { }
  
  createAlarm(alarm: Alarm): Observable<Alarm> {
    return this.http.post<Alarm>(
      `${env.apiEndpoint}/locations/${alarm.locationId}/devices/${this.device.id}/alarms`,
      alarm,
      { headers: this.G.getHeaders() }
    )
    
  }
  
}



