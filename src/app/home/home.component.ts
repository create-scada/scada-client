import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalData } from '../app.config';

import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from "../services/src/app/services/app.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private appService: AppService,
    private G: GlobalData,
    private snackBar: MatSnackBar
  ) { }


  ngOnInit() {
  }

  startLabSession() {

    this.appService.getConnection()
      .subscribe(
        response => {
          this.G.setConnId(response.connId);
          this.snackBar.open(`New Lab Session Created`, "Dismiss", {
            duration: 5000,
          });
        },
      );
  }

}
