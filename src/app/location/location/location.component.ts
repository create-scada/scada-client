import { environment as env } from "../../../environments/environment";

import { Component, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import {
  HttpClient,
  HttpErrorResponse
} from "@angular/common/http";
import { CreateDeviceComponent } from "../create-device/create-device.component";

import { MatDialog, MatDialogConfig } from "@angular/material/dialog";

import { CreateAlarmComponent } from "src/app/alarm/create-alarm/create-alarm.component";

import { Device, Location, Alarm, SensorReading } from "../../model";
import { GlobalData } from "src/app/app.config";
import { ListAlarmsComponent } from "src/app/alarm/list-alarms/list-alarms.component";
import { ViewDeviceComponent } from "../view-device/view-device.component";

@Component({
  selector: "app-location",
  templateUrl: "./location.component.html",
  styleUrls: ["./location.component.css"]
})
export class LocationComponent implements OnInit {

  id: string;
  location: Location;
  devices: Device[];
  clickedDevice: Device;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private G: GlobalData,
    private dialog: MatDialog
  ) { }

  initCanvas() {

    this.http
      .get<Device[]>(
        `${env.apiEndpoint}/locations/${this.id}/devices`,
        { headers: this.G.getHeaders() }
      )
      .subscribe(
        response => {
          this.devices = response;
          setInterval(() => this.refreshSensorData(), 3000);
        },
        (error: HttpErrorResponse) => {
          console.log("Error is " + error);
        }
      );
  }

  viewHistorian() {
    this.router.navigate([
      "historian",
      "location",
      this.location.id,
      "device",
      this.clickedDevice.id
    ]);
  }

  viewDetails() {
    //href="/location/create"
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.clickedDevice.point_data;

    const dialogRef = this.dialog.open(ViewDeviceComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result == null) return;
      //window.location.reload();
    });
  }

  listAlarms() {
    //href="/location/create"
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      locationId: this.id,
      deviceId: this.clickedDevice.id,
      alarms: this.clickedDevice.alarms
    };

    const dialogRef = this.dialog.open(ListAlarmsComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result == null) return;
      // handle response
    });
  }

  createAlarm() {
    //href="/location/create"
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      locationId: this.id,
      device: this.clickedDevice
    };

    const dialogRef = this.dialog.open(CreateAlarmComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result == null) return;
      //window.location.reload();
    });
  }

  createDevice() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { locationId: this.id };

    const dialogRef = this.dialog.open(CreateDeviceComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result: Device) => {
      if (result == null) return;
      this.devices.push(result);
    });
  }

  showDeviceMenu(device: Device) {
    this.clickedDevice = device;
  }

  refreshSensorData() {

    if (this.G.getPauseRefresh()) {
      return;
    }

    this.http
      .get<Device[]>(
        `${env.apiEndpoint}/locations/${this.id}/devices`,
        { headers: this.G.getHeaders() }
      )
      .subscribe(
        response => {
          this.devices = response;
        },
        (error: HttpErrorResponse) => {
          console.log("Error is " + error);
        }
      );
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");

    this.http
      .get<Location>(`${env.apiEndpoint}/locations/${this.id}`,
        { headers: this.G.getHeaders() }
      )
      .subscribe(
        response => {
          this.location = response;
          this.initCanvas();
        },
        (error: HttpErrorResponse) => {
          console.log("Error is " + error);
        }
      );
  }
}
