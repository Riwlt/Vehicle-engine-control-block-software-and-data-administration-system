import { Component, OnInit } from '@angular/core';
import { Vehicle } from './vehicle';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { VehicleService } from './vehicle.service';
import { IVehicle, IVehicleMark, IVehicleModel } from './vehicle.interface';
import { ReactiveFormsModule, NgForm, FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MessageService } from '../../../../dashboard/components/common/message/message.service';
import { AppConstants } from '../../../../app.constants';
import { AuthenticationService } from '../../../../authentication/authentication.service';
import { AuthGuard } from '../../../../authentication/_guards/auth.guard';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css'],
  providers: [VehicleService, MessageService, AuthenticationService, ConfirmationService]
})

export class VehicleFormComponent implements OnInit {
  files: File;
  vehicles: IVehicle[] = [];
  vehicleMarks: IVehicleMark[] = [];
  vehicleModels: IVehicleModel[] = [];
  selectedVehicleModels: String[];
  selectedVehicle: number;
  chosen = false;
  gearboxTypeArray: String[] = [];
  userForm: FormGroup;
  customerData: any[];
  length = 0;

  constructor(
    // private fb: FormBuilder,
    private service: VehicleService,
    private messageService: MessageService,
    private http: Http,
    private authenticationService: AuthenticationService,
    private _fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.gearboxTypeArray = ['Automatic', 'Manual'];
    this.getVehicles();
    this.getMarks();
    this.getModels();
    this.getLength();
    this.userForm = this._fb.group({
      markName: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(250)]),
      modelName: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(250)]),
      vehicleYear: new FormControl('', [Validators.required, Validators.min(1900), Validators.max(2100)]),
      dateRepaired: new FormControl('', [Validators.required, Validators.min(2010), Validators.max(2100)]),
      gearboxType: new FormControl('', [Validators.required]),
      cubage: new FormControl('', [Validators.required, Validators.min(0), Validators.max(1000)]),
      vehicleChangesComment: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(2000)]),
      licensePlate: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]),
      firstName: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(250)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(250)]),
      phoneNumber: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]),
      amountPaid: new FormControl('', [Validators.required, Validators.min(0), Validators.max(50000)]),
      file: new FormControl('', [])
    });
  }
  // Get vehicle marks
  getMarks() {
    this.service.getVehicleMarks().subscribe(
      (vehicleMarks) => { this.vehicleMarks = vehicleMarks; },
      (err) => { console.log(err); }
    );
  }
  // Get vehicle models
  getModels() {
    this.service.getVehicleModels().subscribe(
      (vehicleModels) => { this.vehicleModels = vehicleModels; },
      (err) => { console.log(err); }
    );
  }
  // Get all vehicle data
  // Make this fetch length only
  getVehicles() {
    this.service.getAllVehicles().subscribe(
      (vehicles) => {
        this.vehicles = vehicles;
      },
      (err) => { console.log(err); }
    );
  }
  // Get length of all vehicles
  getLength() {
    this.service.getVehicleFullLength().subscribe(
      (length) => { this.length = length; },
      (err) => { console.log(err); }
    );

  }

  onMarkChange(value) {
    this.selectedVehicleModels = [];
    // Grabbing the mark_id
    for (let i = 0; i < this.vehicleMarks.length; i++) {
      if (value === this.vehicleMarks[i].markName) {
        this.selectedVehicle = this.vehicleMarks[i].id;
      }
    }
    // Grabbing the models of selected mark
    this.vehicleModels.forEach(element => {
      if (this.selectedVehicle === element.mark_id) {
        this.selectedVehicleModels.push(element.modelName);
      }
      this.chosen = true;
    });
  }
  // Getting files from form field
  getFiles(event) {
    this.files = event.srcElement.files;
    if (this.files[0].size >= 50000000) {
      this.userForm.controls.file.setValue(null);
      this.messageService.showMessage('error', 'Error', 'File size cannot be over 50 MB.');
    }
  }

  customerDataPush() {
    this.customerData = [];
    ++this.length;
    this.customerData.push({
      'id': this.length,
      'vehicleId': this.length,
      'firstName': this.firstName.value,
      'lastName': this.lastName.value,
      'phoneNumber': this.phoneNumber.value,
      'amountPaid': this.amountPaid.value
    });
    return this.customerData;
  }

  add() {
    this.service.addVehicle(this.userForm.value, this.customerDataPush()).then(
      () => {
        this.getVehicles();
      }
    );
    if (this.files[0] === undefined) {
    } else {
      this.service.addVehicleFileById(this.files[0], this.files[0].name, this.length);
    }

  }
  handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  get markName() { return this.userForm.get('markName'); }
  get modelName() { return this.userForm.get('modelName'); }
  get vehicleYear() { return this.userForm.get('vehicleYear'); }
  get dateRepaired() { return this.userForm.get('dateRepaired'); }
  get gearboxType() { return this.userForm.get('gearboxType'); }
  get cubage() { return this.userForm.get('cubage'); }
  get vehicleChangesComment() { return this.userForm.get('vehicleChangesComment'); }
  get licensePlate() { return this.userForm.get('licensePlate'); }
  get firstName() { return this.userForm.get('firstName'); }
  get lastName() { return this.userForm.get('lastName'); }
  get phoneNumber() { return this.userForm.get('phoneNumber'); }
  get amountPaid() { return this.userForm.get('amountPaid'); }
  get file() { return this.userForm.get('file'); }
}
