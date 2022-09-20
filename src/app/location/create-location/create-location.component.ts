import { environment as env } from "../../../environments/environment";

import { Component, OnInit } from "@angular/core";
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
import { MatDialogRef } from "@angular/material/dialog";

import { Location } from "../../model";
import { GlobalData } from 'src/app/app.config';

@Component({
  selector: "app-create-location",
  templateUrl: "./create-location.component.html",
  styleUrls: ["./create-location.component.css"]
})
export class CreateLocationComponent implements OnInit {
  imageData: string;

  locationForm = this.fb.group({
    name: ["", Validators.required],
    image: [""]
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder,
    private G: GlobalData,
    public dialogRef: MatDialogRef<CreateLocationComponent>
  ) { }

  ngOnInit() { }

  onFileSelected(event) {
    if (event.target.files.length > 0) {
      let imageFile = event.target.files[0];
      let reader = new FileReader();
      reader.addEventListener(
        "load",
        () => {
          this.imageData = reader.result.toString();
        },
        false
      );
      reader.readAsDataURL(imageFile);
    }
  }

  onSubmit() {
    const location: Location = {
      id: 0,
      name: this.locationForm.get("name").value,
      image_data: this.imageData
    };

    this.http
      .post<Location>(`${env.apiEndpoint}/locations`,
        location,
        { headers: this.G.getHeaders() })
      .subscribe(
        response => {
          this.dialogRef.close(response);
        },
        (error: HttpErrorResponse) => {
          console.log("Error is " + error.message);
        }
      );
  }

  onCancel() {
    this.dialogRef.close(null);
  }
}
