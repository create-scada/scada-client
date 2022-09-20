import { environment as env } from "../../environments/environment";

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalData } from '../app.config';
import { Connection } from '../model';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private http: HttpClient,
    private G: GlobalData,
    private snackBar: MatSnackBar
  ) { }


  ngOnInit() {
  }

  startLabSession() {

    this.http
      .get<Connection>(`${env.apiEndpoint}/connection`,
        { headers: this.G.getHeaders() })
      .subscribe(
        response => {
          this.G.setConnId(response.connId);
          this.snackBar.open(`New Lab Session Created`, "Dismiss", {
            duration: 5000,
          });
        },
        (error: HttpErrorResponse) => {
          console.log("Error is " + error.message);
        }
      );
  }

}
