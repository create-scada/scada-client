import { environment as env } from '../../../../../environments/environment';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { GlobalData } from 'src/app/app.config';
import { Device, SensorReading } from 'src/app/model';


@Injectable({
  providedIn: 'root'
})
export class HistorianService {

  constructor(
    private http: HttpClient,
    private G: GlobalData
  ) { }

  getExport(url) {
    return this.http.get(
      url,
      {
        headers: this.G.getHeaders(),
        responseType: "blob"
      }
    )  
    .pipe(
      catchError(this.handleError())
    )
  }

  getReading(device: Device): Observable<SensorReading[]> {
    return this.http.get<SensorReading[]>(
      `${env.apiEndpoint}/historian/rtu-address/${device.rtu_address}/device-address/${device.device_address}`,
      { headers: this.G.getHeaders() }
    )
    .pipe(
      catchError(this.handleError<SensorReading[]>())
    )
  }

  getPlot(url) {
    return this.http.get(
      url,
      {
        headers: this.G.getHeaders(),
        responseType: "blob"
      })
      .pipe(
        catchError(this.handleError())
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





