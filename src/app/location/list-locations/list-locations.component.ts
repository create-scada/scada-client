import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalData } from 'src/app/app.config';
import { LocationService } from "src/app/services/src/app/services/location.service";

@Component({
  selector: 'app-list-locations',
  templateUrl: './list-locations.component.html',
  styleUrls: ['./list-locations.component.css']
})
export class ListLocationsComponent implements OnInit {

  public locations: Location[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private locationService: LocationService,
    private fb: FormBuilder,
    private G: GlobalData,
    public dialogRef: MatDialogRef<ListLocationsComponent>
  ) { }

  ngOnInit(): void {
    this.locationService.getLocations()
      .subscribe(
        response => {
          this.locations = response;
        },
      );
  }

}
