import { environment as env } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { GlobalData } from 'src/app/app.config';
import { Connection, SimulatorRun } from 'src/app/model';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private http: HttpClient,
    private G: GlobalData
  ) { }

  getSchema():Observable<string> {
    return this.http.get<string>(
      `${env.apiEndpoint}/schema`,
      { headers: this.G.getHeaders() })
        .pipe(
          catchError(this.handleError<string>())
        )
  } 

  getConnection(): Observable<Connection> {
    return this.http.get<Connection>(
      `${env.apiEndpoint}/connection`,
      { headers: this.G.getHeaders() }
    )
    .pipe(
      catchError(this.handleError<Connection>())
    )

  }

  getLabs() {
    return this.http.get(
      `${env.apiEndpoint}/simulator-labs`,
     { headers: this.G.getHeaders() }
     )
     .pipe(
      catchError(this.handleError())
    )
  }

  createSimRun(simulatorRun): Observable<SimulatorRun>{
    return this.http.post<SimulatorRun>(
    `${env.apiEndpoint}/simulator-labs`,
    simulatorRun,
    { headers: this.G.getHeaders() }
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
