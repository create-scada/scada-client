import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class GlobalData {
  private pauseRefresh: Boolean = false;

  private http_headers = new HttpHeaders({
    "Content-Type": "application/json",
    Accept: "application/json, application/csv, image/png",
    "ConnId": ""
  });

  public getHeaders(): HttpHeaders {
    let connId = localStorage.getItem('ConnId');
    if (connId != null) {
      this.http_headers = this.http_headers.set('ConnId', connId);
    }
    return this.http_headers;
  }

  public setConnId(val: string) {
    localStorage.setItem('ConnId', val);
  }

  public setSchema(schema: Object) {
    let sSchema = JSON.stringify(schema);
    localStorage.setItem('Schema', sSchema);
  }

  public getSchema(): Object {
    let sSchema = localStorage.getItem('Schema');
    let schema = JSON.parse(sSchema);
    return schema;
  }

  public getPauseRefresh(): Boolean {
    return this.pauseRefresh;
  }

  public setPauseRefresh(pauseRefresh: Boolean) {
    this.pauseRefresh = pauseRefresh;
  }

}
