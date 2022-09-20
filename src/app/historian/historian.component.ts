import { environment as env } from "../../environments/environment";

import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import {
  HttpClient,
  HttpErrorResponse
} from "@angular/common/http";

import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";

import { MatDialog, MatDialogConfig } from "@angular/material/dialog";

import { Device, Location, Alarm, SensorReading } from "../model";
import { GlobalData } from "src/app/app.config";

import { saveAs } from 'file-saver';

@Component({
  selector: "app-historian",
  templateUrl: "./historian.component.html",
  styleUrls: ["./historian.component.css"]
})
export class HistorianComponent implements OnInit {
  @ViewChild('dataPlot') dataPlot: ElementRef;
  public deviceId: string;
  public locationId: string;
  public device: Device = null;
  public sensorReadings: SensorReading[] = null;
  public displaySchema: Object;
  public formAssembled: boolean = false;
  public displayPoints: string[] = new Array<string>();
  public plotPoint: string = "";

  searchForm = this.fb.group({
    gt_date: [""],
    lt_date: [""]
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private G: GlobalData,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) { }

  plotPointClicked(point: string) {
    this.plotPoint = point;
  }

  async ngOnInit() {
    this.deviceId = this.route.snapshot.paramMap.get("deviceId");
    this.locationId = this.route.snapshot.paramMap.get("locationId");

    await this.http
      .get<Device>(
        `${env.apiEndpoint}/locations/${this.locationId}/devices/${this.deviceId}`,
        { headers: this.G.getHeaders() }
      )
      .toPromise()
      .then(device => {
        this.device = device;
        let schema = this.G.getSchema();
        this.displaySchema = schema[this.device.schema];

        for (let pointName in this.displaySchema) {
          let data_type = this.displaySchema[pointName]["data_type"];
          if (data_type == "number") {
            console.log(pointName)
            this.displayPoints.push(pointName);
            this.searchForm.addControl("lt_" + pointName, new FormControl(""));
            this.searchForm.addControl("gt_" + pointName, new FormControl(""));
          } else if (data_type == "discrete") {
            this.searchForm.addControl("eq_" + pointName, new FormControl(""));
          }
        }

        console.log(this.searchForm);

        this.formAssembled = true;
        //this.displayData();
      });
  }

  getQueryString(): string {
    let queryString = "";

    for (let name in this.searchForm.controls) {
      let val: string = this.searchForm.get(name).value;
      queryString += `${name}=${val}&`;
    }
    queryString = queryString.substr(0, queryString.length - 1);

    return queryString;
  }

  // TODO: Dummy onSubmit() for upgrade
  onSubmit() { }

  onSubmitDownload() {
    let queryString = this.getQueryString();
    let url = `${env.apiEndpoint}/historian-export/rtu-address/${this.device.rtu_address}/device-address/${this.device.device_address}?${queryString}`;
    this.http.get(
      url,
      {
        headers: this.G.getHeaders(),
        responseType: "blob"
      }
    ).subscribe(data => {
      saveAs(data, "scada.csv");
    },
      (error: HttpErrorResponse) => {
        console.log("Error is " + error.message);
      }
    );

  }


  onSubmitSearch() {
    let queryString = this.getQueryString();
    let url = `${env.apiEndpoint}/historian/rtu-address/${this.device.rtu_address}/device-address/${this.device.device_address}/point/${this.plotPoint}/plot?${queryString}`;

    this.http.get(
      url,
      {
        headers: this.G.getHeaders(),
        responseType: "blob"
      }
    ).subscribe(data => {
      this.dataPlot.nativeElement.src = URL.createObjectURL(data);
    },
      (error: HttpErrorResponse) => {
        console.log("Error is " + error.message);
      }
    );
  }

  displayData() {
    this.http
      .get<SensorReading[]>(
        `${env.apiEndpoint}/historian/rtu-address/${this.device.rtu_address}/device-address/${this.device.device_address}`,
        { headers: this.G.getHeaders() }
      )
      .subscribe(
        sensorReadings => {
          this.sensorReadings = sensorReadings;
        },
        (error: HttpErrorResponse) => {
          console.log("Error is " + error);
        }
      );
  }
}
