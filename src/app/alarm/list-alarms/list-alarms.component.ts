import { environment as env } from "../../../environments/environment";

import { Component, OnInit, Inject } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

import { Alarm, Device } from "../../model";
import { GlobalData } from "src/app/app.config";

@Component({
  selector: "app-list-alarms",
  templateUrl: "./list-alarms.component.html",
  styleUrls: ["./list-alarms.component.css"]
})
export class ListAlarmsComponent implements OnInit {
  public locationId: number;
  public deviceId: number;
  public alarms: Alarm[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder,
    private G: GlobalData,
    public dialogRef: MatDialogRef<ListAlarmsComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.deviceId = data.deviceId;
    this.locationId = data.locationId;
    //this.alarms = data.alarms;
  }

  ngOnInit() {
    this.http
      .get<Alarm[]>(
        `${env.apiEndpoint}/locations/${this.locationId}/devices/${this.deviceId}/alarms`,
        { headers: this.G.getHeaders() }
      )
      .subscribe(
        response => {
          this.alarms = response;
        },
        (error: HttpErrorResponse) => {
          console.log("Error is " + error);
        }
      );
  }

  reset(alarmId: number) {
    this.http
      .put(
        `${env.apiEndpoint}/locations/${this.locationId}/devices/${this.deviceId}/alarms/${alarmId}`,
        {},
        { headers: this.G.getHeaders() }
      )
      .subscribe(
        response => { },
        (error: HttpErrorResponse) => {
          console.log("Error is " + error);
        }
      );
  }
}
