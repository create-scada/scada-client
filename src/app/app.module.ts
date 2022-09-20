import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";

import { LocationComponent } from "./location/location/location.component";
import { CreateDeviceComponent } from "./location/create-device/create-device.component";
import { CreateLocationComponent } from "./location/create-location/create-location.component";
import { PrimaryNavComponent } from "./view/primary-nav/primary-nav.component";
import { HomeComponent } from "./home/home.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatSidenav } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { LayoutModule } from "@angular/cdk/layout";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatSelectModule } from "@angular/material/select";
import { AlarmComponent } from "./alarm/alarm.component";
import { CreateAlarmComponent } from "./alarm/create-alarm/create-alarm.component";
import { GlobalData } from "./app.config";
import { ListAlarmsComponent } from "./alarm/list-alarms/list-alarms.component";
import { HistorianComponent } from "./historian/historian.component";
import { SimulatorComponent } from './simulator/simulator.component';
import { ListLocationsComponent } from './location/list-locations/list-locations.component';
import { ViewDeviceComponent } from './location/view-device/view-device.component';
import { DeviceComponent } from './location/device/device.component';
import { RoundStringPipe } from './round-string.pipe';

@NgModule({
    declarations: [
        AppComponent,
        CreateLocationComponent,
        LocationComponent,
        CreateDeviceComponent,
        PrimaryNavComponent,
        HomeComponent,
        AlarmComponent,
        CreateAlarmComponent,
        ListAlarmsComponent,
        HistorianComponent,
        SimulatorComponent,
        ListLocationsComponent,
        ViewDeviceComponent,
        DeviceComponent,
        RoundStringPipe,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatMenuModule,
        MatToolbarModule,
        LayoutModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatSelectModule,
        MatCardModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSnackBarModule,
        DragDropModule
    ],
    providers: [GlobalData],
    bootstrap: [AppComponent]
})
export class AppModule { }
