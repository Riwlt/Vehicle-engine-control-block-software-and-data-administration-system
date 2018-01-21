import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from '../../../app.component';
// PrimeNG
import { RouterModule, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgForm } from '@angular/forms';
import { PanelModule } from 'primeng/primeng';
import { DataTableModule } from 'primeng/primeng';
import { InplaceModule } from 'primeng/primeng';
import { GrowlModule } from 'primeng/primeng';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routing, appRoutingProviders } from '../../../app.routes';
// My imports
import { VehicleFormComponent } from '../../../form/vehicle-form/vehicle-form.component';

import { DashboardComponent } from '../../../dashboard/dashboard.component';
import { HeaderComponent } from '../../../dashboard/components/header/header.component';
import { SidebarComponent } from '../../../dashboard/components/sidebar/sidebar.component';
import { DatatableComponent } from '../../../dashboard/components/datatable/datatable.component';
import { UserComponent } from '../../../dashboard/components/user/user.component';
import { MessageComponent } from '../../../dashboard/components/common/message/message.component';
// Pipes
import { VehicleFormPipe } from '../../../pipes/vehicle-form.pipe';
import { APP_BASE_HREF } from '@angular/common';
import { DatatableService } from './datatable.service';


describe('DatatableComponent', () => {
  let component: DatatableComponent;
  let fixture: ComponentFixture<DatatableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
        DatatableComponent,
        DashboardComponent,
        VehicleFormComponent,
        UserComponent
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' },
      { provide: DatatableService, useClass: DatatableService }]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatatableComponent);
    component = fixture.componentInstance;

  });

  it('should be created', async () => {
    // Do not call ngOnInit directly
    // I'm in control when it activates
    // Reikia pasplittint moduliais viska
    spyOn(component, 'ngOnInit')
      .and.callThrough();
    fixture.detectChanges();
    expect(component).toBeTruthy();

  });
});
