import { environment as env } from "../../environments/environment";

import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";
import { GlobalData } from '../app.config';
import { SimulatorRun } from '../model';
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-simulator',
  templateUrl: './simulator.component.html',
  styleUrls: ['./simulator.component.css']
})
export class SimulatorComponent implements OnInit {

  private simulator: Map<string, Array<string>>;
  public labs: Array<string> = new Array<string>();
  public steps: Array<string> = new Array<string>();

  simulatorForm = this.fb.group({
    lab: ["", Validators.required],
    step: ["", Validators.required],
  });

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private G: GlobalData,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getLabs();
  }

  getLabs() {
    this.http.get(`${env.apiEndpoint}/simulator-labs`,
      { headers: this.G.getHeaders() })
      .subscribe(
        (response: Map<string, Array<string>>) => {
          this.simulator = response;
          for (let key of Object.keys(this.simulator)) {
            this.labs.push(key);
          }
        },
        (error: HttpErrorResponse) => {
          console.log("Error is " + error);
        }
      );
  }

  onLabSelected(labName: string) {
    for (let step of this.simulator[labName]) {
      this.steps.push(step);
    }
  }

  // TODO: dummy onCancel for upgrade
  onCancel() { }

  onSubmit() {
    const labName = this.simulatorForm.get("lab").value;
    const stepName = this.simulatorForm.get("step").value;

    const simulatorRun: SimulatorRun = {
      lab: labName,
      step: stepName
    };

    this.http
      .post<SimulatorRun>(
        `${env.apiEndpoint}/simulator-labs`,
        simulatorRun,
        { headers: this.G.getHeaders() }
      )
      .subscribe(
        (response) => {
          this.snackBar.open(`Simulation Data Successful`, "Dismiss", {
            duration: 5000,
          });
        },
        (error: HttpErrorResponse) => {
          console.log("Error is " + error);
        }
      );
  }

}
