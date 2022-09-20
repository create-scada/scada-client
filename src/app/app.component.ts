import { environment as env } from "../environments/environment";
import { Component } from "@angular/core";

import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";

import { GlobalData } from "./app.config";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  constructor(private http: HttpClient, private G: GlobalData) { }

  ngOnInit() {
    this.http.get<string>(
      `${env.apiEndpoint}/schema`,
      { headers: this.G.getHeaders() }
    ).subscribe(schema => {
      this.G.setSchema(schema);
      let s = this.G.getSchema();
    });
  }
}
