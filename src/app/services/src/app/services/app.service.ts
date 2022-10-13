import { environment as env } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GlobalData } from 'src/app/app.config';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

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

  private handleError<T>(result?: T) {
    return(error: any): Observable<T> => {
      console.log("Error is " + error)
      console.error(error);
      return of (result as T)
  
    }
  }
  

}
