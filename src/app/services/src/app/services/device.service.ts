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

  createDevice(device: Device): Observable<Device> {
    return this.http.post<Device>(
      `${env.apiEndpoint}/devices`,
      device,
      { headers: this.G.getHeaders() })
      .pipe(
        catchError(this.handleError<Device>())
      )
  }

  getDevice(deviceId): Observable<Device> {
    return this.http.get<Device>(
      `${env.apiEndpoint}/devices/${deviceId}`,
      { headers: this.G.getHeaders() }
    )
      .pipe(
        catchError(this.handleError<Device>())
      )
  }

  getDevices(id): Observable<Device[]> {
    return this.http.get<Device[]>(
      `${env.apiEndpoint}/devices?locationId=${id}`,
      { headers: this.G.getHeaders() }
    )
      .pipe(
        catchError(this.handleError<Device[]>())
      )

  }

  updateDeviceCanvasCoord(device): Observable<Device> {
    return this.http.put<Device>(
      `${env.apiEndpoint}/devicecanvascoord/${device.id}`,
      device,
      { headers: this.G.getHeaders() }
    )
      .pipe(
        catchError(this.handleError<Device>())
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
