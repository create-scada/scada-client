import { environment as env } from "../../../environments/environment";

import { Component, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { CreateDeviceComponent } from "../create-device/create-device.component";

import { MatDialog, MatDialogConfig } from "@angular/material/dialog";

import { Device, Location, Reading } from "src/app/model";
import { GlobalData } from "src/app/app.config";
import { ViewDeviceComponent } from "../view-device/view-device.component";
import { DeviceService } from "src/app/services/src/app/services/device.service";
import { LocationService } from "src/app/services/src/app/services/location.service";

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
    private deviceService: DeviceService,
    private locationService: LocationService,
    private G: GlobalData,
    private dialog: MatDialog
  ) { }

  initCanvas() {

    this.deviceService.getDevices(this.id)
      .subscribe(
        response => {
          for (let device of response) {
            device.pointData = JSON.parse(device.pointData + '');
          }
          this.devices = response;
          setInterval(() => this.refreshSensorData(), 3000);
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
    dialogConfig.data = this.clickedDevice.pointData;

    const dialogRef = this.dialog.open(ViewDeviceComponent, dialogConfig);

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

    this.deviceService.getDevices(this.id)
      .subscribe(
        response => {
          for (let device of response) {
            device.pointData = JSON.parse(device.pointData + '');
          }
          this.devices = response;
        }
      );
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");

    this.locationService.getLocation(this.id)
      .subscribe(
        response => {
          this.location = response;
          this.initCanvas();
        }
      );
  }
}
