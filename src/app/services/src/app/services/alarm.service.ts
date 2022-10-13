import { environment as env } from '../../../../../environments/environment';

import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators' 

import { Alarm } from "../../../../model";
import { GlobalData } from '../../../../app.config';


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
    { headers: this.G.getHeaders() })
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