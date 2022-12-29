import { environment as env } from '../../../../../environments/environment';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { GlobalData } from 'src/app/app.config';
import { Device, Reading } from 'src/app/model';


@Injectable({
  providedIn: 'root'
})
export class HistorianService {

  constructor(
    private http: HttpClient,
    private G: GlobalData
  ) { }

  getReading(device: Device, startDate: string, endDate: string): Observable<Reading[]> {
    let url = `${env.apiEndpoint}/readings?rtuAddress=${device.rtuAddress}&deviceAddress=${device.deviceAddress}`;
    if (startDate.length > 0) {
      url += `&startDate=${startDate}`;
    }
    if (endDate.length > 0) {
      url += `&endDate=${endDate}`;
    }
    return this.http.get<Reading[]>(
      url,
      { headers: this.G.getHeaders() }
    )
      .pipe(
        catchError(this.handleError<Reading[]>())
      )
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      console.log("Error is " + error)
      console.error(error);
      return of(result as T)
    }
  }


}





