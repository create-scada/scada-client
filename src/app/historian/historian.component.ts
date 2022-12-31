import { environment as env } from "../../environments/environment";

import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import * as FileSaver from 'file-saver';

import {
  Validators,
  FormBuilder,
} from "@angular/forms";

import { MatDialog } from "@angular/material/dialog";

import { Device } from "../model";
import { GlobalData } from "src/app/app.config";

import { saveAs } from 'file-saver';
import { HistorianService } from "../services/src/app/services/historian.service";
import { DeviceService } from "../services/src/app/services/device.service";

@Component({
  selector: "app-historian",
  templateUrl: "./historian.component.html",
  styleUrls: ["./historian.component.css"]
})
export class HistorianComponent implements OnInit {
  public deviceId: string;
  public locationId: string;
  public device: Device = null;

  searchForm = this.fb.group({
    startDate: [""],
    endDate: [""],
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private historianService: HistorianService,
    private deviceService: DeviceService,
    private G: GlobalData,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.deviceId = this.route.snapshot.paramMap.get("deviceId");
    this.locationId = this.route.snapshot.paramMap.get("locationId");

    this.deviceService.getDevice(this.deviceId)
      .subscribe(device => {
        this.device = device;
      });
  }

  onSubmit() {
    let startDate = this.searchForm.get("startDate").value;
    let endDate = this.searchForm.get("endDate").value;
    this.historianService.getReading(this.device, startDate, endDate)
      .subscribe(data => {

        let init = false;
        let s = "";

        for (let reading of data) {
          //reading.pointData = JSON.parse(reading.pointData + '');

          if (!init) {
            init = true;
            s += `rtuAddress,deviceAddress,date,`;
            for (let key of Object.keys(reading.pointData)) {
              s += `${key},`;
            }
            s += `\r\n`;
          }

          s += `${reading.rtuAddress},${reading.deviceAddress},${reading.date},`;
          for (let key of Object.keys(reading.pointData)) {
            s += `${reading.pointData[key]},`;
          }

          s += `\r\n`;
        }

        let blob = new Blob([s], { type: 'text/csv' });
        FileSaver.saveAs(blob, "scada.csv");
      },
      );
  }

}
