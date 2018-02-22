import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { VehicleService } from '../../../form/vehicle-form/vehicle.service';
import { IVehicle, IVehicleMark, IVehicleModel } from '../../../form/vehicle-form/vehicle.interface';
import { DatePipe } from '@angular/common';
import { Message } from 'primeng/components/common/api';
import { ReactiveFormsModule, NgForm, FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MessageService } from '../common/message/message.service';
import { AuthenticationService } from '../../../authentication/authentication.service';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css'],
    providers: [VehicleService,
        DatePipe,
        MessageService,
        AuthenticationService
    ]
})
export class UserComponent implements OnInit {

    selectedVehicleId: any;
    // Subscription
    private sub: any;
    date: string;
    // Interfaces
    vehicles: IVehicle[] = [];
    vehicleMarks: IVehicleMark[] = [];
    vehicleModels: IVehicleModel[] = [];
    // Message service
    message: Message[] = [];
    // Selected
    selectedVehicleModels: String[];
    selectedVehicle: number;
    // Is mark chosen
    chosen = false;
    // FORM CONTROL
    userForm: FormGroup;
    // Fix loading


    constructor(
        private route: ActivatedRoute,
        private service: VehicleService,
        private datePipe: DatePipe,
        private messageService: MessageService,
        private _fb: FormBuilder
    ) {

        // Getting params for ID
        this.sub = this.route.params.subscribe(params => {
            this.selectedVehicleId = +params['id'];
        });
        this.service.getVehicleModels().subscribe(
            (vehicleModels) => { this.vehicleModels = vehicleModels; },
            (err) => { console.log(err); },
            () => { this.getVehicleMarks(); }
        );
    }

    onFormSubmit() {
        this.editVehicle();
    }

    onMarkChangeCons(vehicles) {
        this.onMarkChange(vehicles.markName);
        this.userForm.controls.markName.setValue(vehicles.markName);
        this.userForm.controls.modelName.setValue(vehicles.modelName);
        this.userForm.controls.vehicleYear.setValue(vehicles.vehicleYear);
        this.userForm.controls.dateRepaired.setValue(vehicles.dateRepaired);
        this.userForm.controls.gearboxType.setValue(vehicles.gearboxType);
        this.userForm.controls.cubage.setValue(vehicles.cubage);
        this.userForm.controls.vehicleChangesComment.setValue(vehicles.vehicleChangesComment);
        this.userForm.controls.hexFile.setValue(vehicles.hexFile);
    }

    getVehicleMarks() {
        this.service.getVehicleMarks().subscribe(
            (vehicleMarks) => { this.vehicleMarks = vehicleMarks; },
            (err) => { console.log(err); },
            () => { this.getVehicleById(); }
        );
    }

    getVehicleById() {
        this.service.getVehicleById(this.selectedVehicleId).subscribe(
            (vehicles) => { this.vehicles = vehicles; },
            (err) => { console.log(err); },
            () => { this.onMarkChangeCons(this.vehicles); }
        );
    }
    ngOnInit(): void {
        this.userForm = this._fb.group({
            markName: new FormControl('', [Validators.required]),
            modelName: new FormControl('', [Validators.required]),
            vehicleYear: new FormControl('', [Validators.required]),
            dateRepaired: new FormControl('', [Validators.required]),
            gearboxType: new FormControl('', [Validators.required]),
            cubage: new FormControl('', [Validators.required]),
            vehicleChangesComment: new FormControl('', [Validators.required]),
            hexFile: new FormControl('', [Validators.required])
        });


    }

    // Shorthand getter methods to simplify the long chain of method names
    get markName() { return this.userForm.get('markName'); }
    get modelName() { return this.userForm.get('modelName'); }
    get vehicleYear() { return this.userForm.get('vehicleYear'); }
    get dateRepaired() { return this.userForm.get('dateRepaired'); }
    get gearboxType() { return this.userForm.get('gearboxType'); }
    get cubage() { return this.userForm.get('cubage'); }
    get vehicleChangesComment() { return this.userForm.get('vehicleChangesComment'); }
    get hexFile() { return this.userForm.get('hexFile'); }



    onMarkChange(value) {
        this.selectedVehicleModels = [];
        // Grabbing the mark_id
        this.chosen = true;
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
        });

    }


    editVehicle() {
        if (this.userForm.valid) {
            this.service.editVehicleById(this.selectedVehicleId, this.userForm.value);
        }
        this.messageService.showMessage('success', 'Success', 'Vehicle has been edited!');
    }


}
