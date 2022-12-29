import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CreateLocationComponent } from "./location/create-location/create-location.component";
import { LocationComponent } from "./location/location/location.component";
import { HomeComponent } from "./home/home.component";
import { HistorianComponent } from "./historian/historian.component";

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "location/create", component: CreateLocationComponent },
  { path: "location/:id", component: LocationComponent },
  {
    path: "historian/location/:locationId/device/:deviceId",
    component: HistorianComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
