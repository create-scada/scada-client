import { environment as env } from "../../../environments/environment";

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalData } from 'src/app/app.config';

@Component({
  selector: 'app-list-locations',
  templateUrl: './list-locations.component.html',
  styleUrls: ['./list-locations.component.css']
})
export class ListLocationsComponent implements OnInit {

  public locations: Location[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder,
    private G: GlobalData,
    public dialogRef: MatDialogRef<ListLocationsComponent>
  ) { }

  ngOnInit(): void {
    this.http
      .get<Location[]>(
        `${env.apiEndpoint}/locations`,
        { headers: this.G.getHeaders() }
      )
      .subscribe(
        response => {
          this.locations = response;
        },
        (error: HttpErrorResponse) => {
          console.log("Error is " + error);
        }
      );
  }

}
