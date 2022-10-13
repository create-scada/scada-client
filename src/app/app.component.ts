import { Component } from "@angular/core";

import { GlobalData } from "./app.config";
import { AppService } from "./services/src/app/services/app.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  constructor(
    private G: GlobalData,
    private appService: AppService
    ) { }

  ngOnInit() {
    this.appService.getSchema()
    .subscribe(
      schema => {
      this.G.setSchema(schema);
      let s = this.G.getSchema();
      });
  }
}
