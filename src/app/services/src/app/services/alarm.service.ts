import { environment as env } from '../../../../../environments/environment';

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

import { Alarm, Device } from "../../../../model";
import { GlobalData } from '../../../../app.config';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AlarmService {


  constructor(
    private http: HttpClient,
    private G: GlobalData
  ) { }

createAlarm(alarm: Alarm, device, locationId): Observable<Alarm> {
  
  return this.http.post<Alarm>(
    `${env.apiEndpoint}/locations/${locationId}/devices/${device.id}/alarms`,
    alarm,
    { headers: this.G.getHeaders() }
  );

}

}
