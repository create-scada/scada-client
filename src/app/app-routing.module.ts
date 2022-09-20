import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CreateLocationComponent } from "./location/create-location/create-location.component";
import { LocationComponent } from "./location/location/location.component";
import { HomeComponent } from "./home/home.component";
import { ListAlarmsComponent } from "./alarm/list-alarms/list-alarms.component";
import { HistorianComponent } from "./historian/historian.component";
import { SimulatorComponent } from './simulator/simulator.component';

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "location/create", component: CreateLocationComponent },
  { path: "location/:id", component: LocationComponent },
  { path: "location/:id/alarms", component: ListAlarmsComponent },
  { path: "simulator", component: SimulatorComponent },
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
