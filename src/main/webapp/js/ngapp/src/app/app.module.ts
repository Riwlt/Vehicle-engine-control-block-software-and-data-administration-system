import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { TableModule } from 'primeng/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogModule } from 'primeng/primeng';
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
import { ManageModelsComponent } from './dashboard/components/manage/manage-models/manage-models.component';
import { ManageClientsComponent } from './dashboard/components/manage/manage-clients/manage-clients.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './authentication/_guards/auth.guard';
import { ManageUsersComponent } from './dashboard/components/manage/manage-users/manage-users.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ArraySortPipe } from './pipes/array-sort.pipe';
import { ManageMarksComponent } from './dashboard/components/manage/manage-marks/manage-marks.component';


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
    BrowserAnimationsModule,
    ReactiveFormsModule,
    TableModule,
    ProgressSpinnerModule,
    InputTextareaModule,
    DialogModule
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
    ManageModelsComponent,
    ManageClientsComponent,
    LoginComponent,
    ManageUsersComponent,
    ArraySortPipe,
    ManageMarksComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [appRoutingProviders, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
