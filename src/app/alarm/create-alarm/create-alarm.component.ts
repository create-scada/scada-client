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
import { AlarmService } from "src/app/services/src/app/services/alarm.service";

@Component({
  selector: "app-create-alarm",
  templateUrl: "./create-alarm.component.html",
  styleUrls: ["./create-alarm.component.css"]
})
export class CreateAlarmComponent implements OnInit {
  alarmForm = this.fb.group({
    name: ["", Validators.required],
    point: ["", Validators.required],
    compare: ["", Validators.required],
    value: ["", Validators.required]
  });

  public locationId: number;
  public device: Device;
  public isDiscrete: boolean = false;
  public pointValues: string[];
  public pointDefs: Object = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder,
    private G: GlobalData,
    public dialogRef: MatDialogRef<CreateAlarmComponent>,
    private alarmService: AlarmService,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.device = data.device;
    this.locationId = data.locationId;
  }

  ngOnInit() {
    let schema = this.G.getSchema();
    this.pointDefs = schema[this.device.schema];
  }

  onCancel() {
    this.dialogRef.close(null);
  }

  onPointClicked(point: string) {
    this.isDiscrete = this.pointDefs[point]["data_type"] == "discrete";
    if (this.isDiscrete) {
      this.pointValues = this.pointDefs[point]["values"];
    }
  }

  onSubmit() {
    const point = this.alarmForm.get("point").value;
    const data_type = this.pointDefs[point]["data_type"];

    const alarm: Alarm = {
      id: 0,
      device: this.device,
      name: this.alarmForm.get("name").value,
      point: point,
      compare: this.alarmForm.get("compare").value,
      value: this.alarmForm.get("value").value,
      is_triggered: false,
      data_type: data_type
    };

    // this.http
    //   .post<Alarm>(
    //     `${env.apiEndpoint}/locations/${this.locationId}/devices/${this.device.id}/alarms`,
    //     alarm,
    //     { headers: this.G.getHeaders() }
    //   )
    //   .subscribe(
    //     (response: Alarm) => {
    //       this.dialogRef.close(response);
    //     },
    //     (error: HttpErrorResponse) => {
    //       console.log("Error is " + error);
    //     }
    //   );
    
    this.create(alarm, this.device, this.locationId) 
    
  }

  create(alarm: Alarm, device: Device, locationId) : void {
    this.alarmService.createAlarm(alarm, device, locationId)
    .subscribe(
      (response: Alarm) => {
        this.dialogRef.close(response);
      },
      (error: HttpErrorResponse) => {
        console.log("Error is " + error);
      })

  }


}
