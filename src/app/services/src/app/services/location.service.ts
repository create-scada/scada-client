import { environment as env } from '../../../../../environments/environment';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { GlobalData } from 'src/app/app.config';
import { Location } from 'src/app/model';


@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(
    private http: HttpClient,
    private G: GlobalData
  ) { }

  createLocation(location: Location): Observable<Location> {
    return this.http.post<Location>(
      `${env.apiEndpoint}/locations`,
      location,
    { headers: this.G.getHeaders() }
    )
    .pipe(
      catchError(this.handleError<Location>())
    )  
  }

  getLocation(id): Observable<Location> {
    return this.http.get<Location>(`${env.apiEndpoint}/locations/${id}`,
    { headers: this.G.getHeaders() }
    )
    .pipe(
      catchError(this.handleError<Location>())
    )  
  }

  getLocations(): Observable<Location[]>{
    return this.http.get<Location[]>(
      `${env.apiEndpoint}/locations`,
      { headers: this.G.getHeaders() }
    )
    .pipe(
      catchError(this.handleError<Location[]>())
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




