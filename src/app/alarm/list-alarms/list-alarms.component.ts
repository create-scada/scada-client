import { Component, OnInit, Inject } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
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
    private alarmService: AlarmService,
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
    this.alarmService.getAlarms(this.deviceId,this.locationId)
      .subscribe(
        response => {
          this.alarms = response;
        })
  }

  reset(alarmId: number) {
    this.alarmService.resetAlarm(alarmId, this.locationId, this.deviceId)
      .subscribe(
        response => { }
      );
  }
}
