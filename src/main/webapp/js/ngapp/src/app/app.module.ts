import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NgForm } from '@angular/forms';

import { VehicleFormComponent } from './form/vehicle-form/vehicle-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';


const appRoutes: Routes = [
  { path: 'vehicleform', component: VehicleFormComponent },
  { path: '', component: DashboardComponent },
];

@NgModule({
  imports: [
    FormsModule,
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [
    AppComponent,
    VehicleFormComponent,
    DashboardComponent

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
