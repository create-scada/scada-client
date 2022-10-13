import { environment as env } from '../../../../../environments/environment';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { GlobalData } from 'src/app/app.config';


@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(
    private http: HttpClient,
    private G: GlobalData
  ) { }
}




private handleError<T>(result?: T) {
  return(error: any): Observable<T> => {
    console.log("Error is " + error)
    console.error(error);
    return of (result as T)
  }
}
