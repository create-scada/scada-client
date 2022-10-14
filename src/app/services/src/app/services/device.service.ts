import { environment as env } from '../../../../../environments/environment';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Device } from 'src/app/model';
import { GlobalData } from 'src/app/app.config';


@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(
    private http: HttpClient,
    private G: GlobalData
  ) { }

 createDevice(device: Device, locationId):Observable<Device> {
  return this.http.post<Device>(
    `${env.apiEndpoint}/locations/${locationId}/devices`,
    device,
    { headers: this.G.getHeaders() })
    .pipe(
      catchError(this.handleError<Device>())
    )
 }
 
 getDevice(locationId, deviceId):Observable<Device> {
  return this.http.get<Device>(
    `${env.apiEndpoint}/locations/${locationId}/devices/${deviceId}`,
    { headers: this.G.getHeaders() }
  )
  .pipe(
    catchError(this.handleError<Device>())
  )
 }

 getDevices(id): Observable<Device[]>{
  return this.http.get<Device[]>(
    `${env.apiEndpoint}/locations/${id}/devices`,
    { headers: this.G.getHeaders() }
  )  
    .pipe(
    catchError(this.handleError<Device[]>())
  )

 }

 updateDevice(location, device): Observable<Device>{
  return this.http.put<Device>(
    `${env.apiEndpoint}/locations/${location.id}/devices/${device.id}/canvas-parms`,
    device,
    { headers: this.G.getHeaders() }
  )
  .pipe(
    catchError(this.handleError<Device>())
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
