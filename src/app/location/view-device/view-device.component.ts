import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalData } from 'src/app/app.config';

@Component({
  selector: 'app-view-device',
  templateUrl: './view-device.component.html',
  styleUrls: ['./view-device.component.css']
})
export class ViewDeviceComponent implements OnInit {

  data: Object;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private G: GlobalData,
    public dialogRef: MatDialogRef<ViewDeviceComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.data = data;
    console.log(this.data);
  }

  ngOnInit(): void {
  }

}
