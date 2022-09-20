import { environment as env } from "../../../environments/environment";
import { CdkDragEnd, CdkDragStart } from '@angular/cdk/drag-drop';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { GlobalData } from 'src/app/app.config';
import { Device, Location } from 'src/app/model';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {

  @Input()
  device: Device;

  @Input()
  location: Location;

  dragPosition = {x: 0, y: 0};

  constructor(
    private http: HttpClient,
    private G: GlobalData,
  ) { }

  ngOnInit(): void {
    this.dragPosition.x = this.device.x;
    this.dragPosition.y = this.device.y;
  }

  isDisplayPoint(name: string) {
    for (let point of this.device.display_points) {
      if (point.name == name) {
        return true;
      }
    }
    return false;
  }

  isAlarmTriggered() {
    for (let alarm of this.device.alarms) {
      if (alarm.is_triggered) {
        return true;
      }
    }
    return false;
  }

  getDataPointUnit(name: string) {
    let mySchema = this.G.getSchema();
    let deviceSchema = mySchema[this.device.schema];
    let units = '';
    if (deviceSchema[name]['data_type'] == 'number') {
      units = deviceSchema[name]['units'];
    }
    return units;
  }

  dragStarted($event: CdkDragStart): void {
    this.G.setPauseRefresh(true);
  }

  dragEnded($event: CdkDragEnd): void {
    
    this.G.setPauseRefresh(false);

    const position = $event.source.getFreeDragPosition();

    this.device.x = position.x;
    this.device.y = position.y;


    this.http
      .put(
        `${env.apiEndpoint}/locations/${this.location.id}/devices/${this.device.id}/canvas-parms`,
        this.device,
        { headers: this.G.getHeaders() }
      )
      .subscribe(
        response => {
        },
        (error: HttpErrorResponse) => {
          console.log("Error is " + error);
        }
      );
  }


  
}
