import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { CreateLocationComponent } from "../../location/create-location/create-location.component";
import { CreateAlarmComponent } from "src/app/alarm/create-alarm/create-alarm.component";

import { Location } from "../../model";
import { ListLocationsComponent } from "src/app/location/list-locations/list-locations.component";

@Component({
  selector: "app-primary-nav",
  templateUrl: "./primary-nav.component.html",
  styleUrls: ["./primary-nav.component.css"]
})
export class PrimaryNavComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit() { }

  createLocation() {
    //href="/location/create"
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(CreateLocationComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result: Location) => {
      if (result == null) return;
      this.router.navigate(["location", result.id]);
    });
  }

  listLocations() {
    //href="/location/create"
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(ListLocationsComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result: Location) => {
      if (result == null) return;
    });
  }

}
