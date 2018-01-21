import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from '../../app.component';
// PrimeNG
import { RouterModule, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgForm } from '@angular/forms';
import { PanelModule } from 'primeng/primeng';
import { DataTableModule } from 'primeng/primeng';
import { InplaceModule } from 'primeng/primeng';
import { GrowlModule } from 'primeng/primeng';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routing, appRoutingProviders } from '../../app.routes';
// My imports
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { HeaderComponent } from '../../dashboard/components/header/header.component';
import { SidebarComponent } from '../../dashboard/components/sidebar/sidebar.component';
import { DatatableComponent } from '../../dashboard/components/datatable/datatable.component';
import { UserComponent } from '../../dashboard/components/user/user.component';
import { MessageComponent } from '../../dashboard/components/common/message/message.component';
import { APP_BASE_HREF } from '@angular/common';
import { VehicleFormComponent } from './vehicle-form.component';
import { VehicleService } from './vehicle.service';
import { DebugElement } from '@angular/core/src/debug/debug_node';
import { By } from '@angular/platform-browser';
import { IVehicle, IVehicleMark } from './vehicle.interface';
import { ArrayBuffer } from '@angular/http/src/static_request';

describe('VehicleFormComponent', () => {
  let component: VehicleFormComponent;
  let fixture: ComponentFixture<VehicleFormComponent>;
  let de: DebugElement;
  let element: HTMLElement;
  const expectedMark: IVehicleMark[] = [];
  const expectedVehicle: IVehicle[] = [];

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
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: VehicleService, useClass: VehicleService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(VehicleFormComponent);
    component = fixture.componentInstance; // to access properties and methods
    element = fixture.nativeElement;  // to access DOM element
    de = fixture.debugElement; // test helper
    fixture.autoDetectChanges(); // Automatically trigger component change detection

  }));
  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should contain necessary form values', () => {
    fixture.detectChanges();
    // component.vehicleMarks = null;
    expect(component.vehicleMarks.length).toBeGreaterThan(0);
    expect(component.vehicleModels.length).toBeGreaterThan(0);
  });

  it('it should display vehicle marks and models', async () => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(element.querySelector('option').innerText).toBe('Alfa Romeo');
      expect(de.query(By.css('option')).nativeElement.innerText).toBe('Alfa Romeo');
    });
    /* To change form value, get incorrect values
    expectedMark.push({ 'id': 1, 'markName': 'mark' }, { 'id': 2, 'markName': 'mark2' });
       component.vehicleMarks = expectedMark; */
  });

  it('it should send form data', async () => {
    fixture.detectChanges();
    const testForm = <NgForm>{
      value: {
        markName: 'markName',
        modelName: 'modelName',
        vehicleYear: 1995,
        dateRepaired: '1995-10-31',
        vehicleChangesComment: 'Text',
        cubage: 80,
        gearboxType: 'automatic',
        hexFile: [9, 32, 64, 82, 101, 113, 117, 101, 115, 116, 77]
      }
    };
    expect(component.add(testForm)).toBeTruthy();
    // Incorrect data being sent here
  });

  it('if backend returns no data', async () => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.vehicles).toBeDefined();
    });
    // If backend actually returns as undefined (query did not
    // go through in the backend)
    // component.vehicles = undefined;
  });
});
