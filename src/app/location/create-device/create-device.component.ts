import { environment as env } from "../../../environments/environment";

import {
  Component,
  OnInit,
  EventEmitter,
  Input,
  Output,
  Inject
} from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Device, DisplayPoint } from "../../model";
import { GlobalData } from "src/app/app.config";
import { DeviceService } from "src/app/services/src/app/services/device.service";

@Component({
  selector: "app-create-device",
  templateUrl: "./create-device.component.html",
  styleUrls: ["./create-device.component.css"]
})
export class CreateDeviceComponent implements OnInit {
  deviceForm = this.fb.group({
    rtuAddress: ["", Validators.required],
    deviceAddress: ["", Validators.required],
    schema: ["", Validators.required],
    imagePath: ["", Validators.required]
  });
  locationId: number;
  public pointDefs: Object = null;
  public displayPoints: DisplayPoint[] = new Array();
  public refSchema: Object;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private deviceService: DeviceService,
    private fb: FormBuilder,
    public G: GlobalData,
    public dialogRef: MatDialogRef<CreateDeviceComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.locationId = parseInt(data.locationId);
    this.refSchema = this.G.getSchema();
  }

  ngOnInit() { }

  schemaClicked(clickedSchema: string) {
    this.pointDefs = this.refSchema[clickedSchema];
  }

  addDisplayPoint(name: string) {
    const displayPoint: DisplayPoint = {
      id: 0,
      name: name
    };
    this.displayPoints.push(displayPoint);
  }

  onSubmit() {
    const device: Device = {
      id: 0,
      locationId: this.locationId,
      rtuAddress: this.deviceForm.get("rtuAddress").value,
      deviceAddress: this.deviceForm.get("deviceAddress").value,
      schema: this.deviceForm.get("schema").value,
      pointData: null,
      x: 0,
      y: 0,
      imagePath: this.deviceForm.get("imagePath").value,
      displayPoints: this.displayPoints,
    };

    this.deviceService.createDevice(device)
      .subscribe(
        (response: Device) => {
          this.dialogRef.close(response);
        },
      );
  }

  onCancel() {
    this.dialogRef.close(null);
  }
}
