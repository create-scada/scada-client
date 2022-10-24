import { environment as env } from '../../../../../environments/environment';

import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators' 

import { Alarm, Device } from "../../../../model";
import { GlobalData } from '../../../../app.config';


@Injectable({
  providedIn: 'root'
})
export class AlarmService {


  constructor(
    private http: HttpClient,
    private G: GlobalData
  ) { }

getAlarms(deviceId, locationId): Observable<Alarm[]> {
  return this.http.get<Alarm[]>(
      `${env.apiEndpoint}/locations/${locationId}/devices/${deviceId}/alarms`,
      { headers: this.G.getHeaders() })
        .pipe(
          catchError(this.handleError<Alarm[]>())
        )
}

createAlarm(alarm: Alarm, device, locationId): Observable<Alarm> {
return this.http.post<Alarm>(
  `${env.apiEndpoint}/locations/${locationId}/devices/${device.id}/alarms`,
  alarm,
  { headers: this.G.getHeaders() })
    .pipe(
      catchError(this.handleError<Alarm>())
    )
}

resetAlarm(alarmId: number, locationId, deviceId): Observable<Alarm> {
  return this.http.put<Alarm>(
    `${env.apiEndpoint}/locations/${locationId}/devices/${deviceId}/alarms/${alarmId}`,
    {},
    { headers: this.G.getHeaders() }
  )
  .pipe(
    catchError(this.handleError<Alarm>())
  )
}

private handleError<T>(result?: T) {
  return(error: any): Observable<T> => {
    console.log("Error is " + error)
    console.error(error);
    return of (result as T)
  }
}

}
