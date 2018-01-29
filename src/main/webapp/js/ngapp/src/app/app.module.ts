import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
// PrimeNG
import { RouterModule, Routes } from '@angular/router';
import { NgForm } from '@angular/forms';
import { PanelModule } from 'primeng/primeng';
import { DataTableModule } from 'primeng/primeng';
import { InplaceModule } from 'primeng/primeng';
import { GrowlModule } from 'primeng/primeng';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routing, appRoutingProviders } from './app.routes';
// My imports
import { VehicleFormComponent } from './form/vehicle-form/vehicle-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './dashboard/components/header/header.component';
import { SidebarComponent } from './dashboard/components/sidebar/sidebar.component';
import { DatatableComponent } from './dashboard/components/datatable/datatable.component';
import { UserComponent } from './dashboard/components/user/user.component';
import { MessageComponent } from './dashboard/components/common/message/message.component';
// Pipes
import { VehicleFormPipe } from './pipes/vehicle-form.pipe';
import { MarkComponent } from './dashboard/components/new/mark/mark.component';
import { ModelComponent } from './dashboard/components/new/model/model.component';
import { ManageVehiclesComponent } from './dashboard/components/manage/manage-vehicles/manage-vehicles.component';
import { ManageClientsComponent } from './dashboard/components/manage/manage-clients/manage-clients.component';

@NgModule({
  imports: [
    FormsModule,
    BrowserModule,
    HttpModule,
    routing,
    PanelModule,
    DataTableModule,
    InplaceModule,
    GrowlModule,
    BrowserAnimationsModule
  ],
  declarations: [
    AppComponent,
    VehicleFormComponent,
    DashboardComponent,
    HeaderComponent,
    SidebarComponent,
    DatatableComponent,
    UserComponent,
    MessageComponent,
    VehicleFormPipe,
    MarkComponent,
    ModelComponent,
    ManageVehiclesComponent,
    ManageClientsComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
