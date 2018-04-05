import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { VehicleService } from '../new/vehicle/vehicle.service';
import { IVehicle, IVehicleMark, IVehicleModel, IVehicleFile } from '../new/vehicle/vehicle.interface';
import { DatePipe } from '@angular/common';
import { Message } from 'primeng/components/common/api';
import { ReactiveFormsModule, NgForm, FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MessageService } from '../common/message/message.service';
import { AuthenticationService } from '../../../authentication/authentication.service';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/primeng';
import { UserService } from './user.service';
import { Response } from '@angular/http';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { SpinnerModule } from 'primeng/spinner';
import { saveAs } from 'file-saver';
import { AppConstants } from '../../../app.constants';
import { BlockUIModule } from 'primeng/blockui';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css'],
    providers: [VehicleService,
        DatePipe,
        MessageService,
        AuthenticationService,
        UserService,
        ConfirmationService
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
    vehicleFiles: IVehicleFile[] = [];
    customerData: any[] = [];
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
    uploadedFiles: any[] = [];
    fileBlob: Response;
    gearboxTypeArray: String[] = [];
    loading = true;
    // Status


    // Form data load cycle
    // Models -> Marks -> VehicleById -> VehicleByIdFiles

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: VehicleService,
        private datePipe: DatePipe,
        private messageService: MessageService,
        private _fb: FormBuilder,
        private userService: UserService,
        private confirmationService: ConfirmationService
    ) {
        this.gearboxTypeArray = AppConstants.VEHICLE_GEARBOX_TYPE_ARRAY;
        // Getting params for ID
        this.sub = this.route.params.subscribe(params => {
            this.selectedVehicleId = +params['id'];
        });
        this.getVehicleModels();
    }

    confirmFileDeletion(file) {
        this.confirmationService.confirm({
            message: 'You are going to delete ' + file.fileName + ' are you sure?',
            header: 'Confirmation',
            icon: 'fa fa-question-circle',
            accept: () => {
                this.messageService.showMessage('success', 'Success', 'File deleted successfully.');
                this.deleteFile(file);
            },
            reject: () => {
                this.messageService.showMessage('info', 'Info', 'File has not been deleted.');
            }
        });
    }

    confirmDeletion() {
        this.confirmationService.confirm({
            message: 'You are going to delete vehicle with the id: ' + this.selectedVehicleId + ' are you sure?',
            header: 'Confirmation',
            icon: 'fa fa-question-circle',
            accept: () => {
                this.messageService.showMessage('success', 'Success', 'Vehicle deleted successfully.');
                this.removeVehicle();
            },
            reject: () => {
                this.messageService.showMessage('info', 'Info', 'Vehicle has not been deleted.');
            }
        });
    }

    onFormSubmit() {
        this.editVehicle();
    }




    downloadFile(vehicleFiles) {
        const contentType = vehicleFiles.fileBlob.split(';')[0];
        const byteCharacters = atob(vehicleFiles.fileBlob);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: contentType });
        saveAs(blob, vehicleFiles.fileName);
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
        this.userForm.controls.licensePlate.setValue(vehicles.licensePlate);
        this.userForm.controls.firstName.setValue(vehicles.firstName);
        this.userForm.controls.lastName.setValue(vehicles.lastName);
        this.userForm.controls.phoneNumber.setValue(vehicles.phoneNumber);
        this.userForm.controls.amountPaid.setValue(vehicles.amountPaid);
    }

    getVehicleModels() {
        this.service.getVehicleModels().subscribe(
            (vehicleModels) => { this.vehicleModels = vehicleModels; },
            (err) => { console.log(err); },
            () => { this.getVehicleMarks(); }
        );
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
            (err) => {
                console.log(err);
                this.messageService.showMessage('error', 'Error', 'Vehicle with the id ' + this.selectedVehicleId + ' does not exist.');
            },
            () => {
                this.onMarkChangeCons(this.vehicles);
                this.getVehicleFilesBySelectedId();
            }
        );
    }

    ngOnInit(): void {
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
            phoneNumber: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(250)]),
            amountPaid: new FormControl('', [Validators.required, Validators.min(0), Validators.max(100000)]),
        });
    }

    getVehicleFilesBySelectedId() {
        this.service.getVehicleFilesByVehicleId(this.selectedVehicleId).subscribe(
            (vehicleFiles) => {
                this.vehicleFiles = vehicleFiles;
            },
            (err) => { console.log(err); },
            () => {
                this.loading = false;
            }
        );
    }

    // Shorthand getter methods to simplify the long chain of method names
    // User form getter methods
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

    customerDataPush() {
        this.customerData = [];
        this.customerData.push({
            'id': this.selectedVehicleId,
            'vehicleId': this.selectedVehicleId,
            'firstName': this.firstName.value,
            'lastName': this.lastName.value,
            'phoneNumber': this.phoneNumber.value,
            'amountPaid': this.amountPaid.value
        });
        return this.customerData;
    }

    editVehicle() {
        this.service.editVehicleById(this.selectedVehicleId, this.userForm.value, this.customerDataPush());
        this.messageService.showMessage('success', 'Success', 'Vehicle has been edited!');

    }

    onUpload(event, form) {
        this.service.addVehicleFileById(event.files[0], event.files[0].name, this.selectedVehicleId)
            .then(
                () => { this.getVehicleFilesBySelectedId(); }
            );
        form.clear();
    }

    deleteFile(file) {
        this.loading = true;
        this.service.disableVehicleFileById(file.id)
            .then(
                () => {
                    this.getVehicleFilesBySelectedId();
                    this.loading = false;
                }
            );

    }

    disableVehicle() {
        this.loading = true;
        this.service.disableVehicleById(this.selectedVehicleId).then(
            () => {
                this.getVehicleById();
                this.loading = false;
            }
        );
    }

    enableVehicle() {
        this.loading = true;
        this.service.enableVehicleById(this.selectedVehicleId).then(
            () => {
                this.getVehicleById();
                this.loading = false;
            }
        );
    }
    removeVehicle() {
        this.service.removeVehicleById(this.selectedVehicleId).then(
            () => {
                this.router.navigate(['/dashboard/data']);
            }
        );
    }




}
