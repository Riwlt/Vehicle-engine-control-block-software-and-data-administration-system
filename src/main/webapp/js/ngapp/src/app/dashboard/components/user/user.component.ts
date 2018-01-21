import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { VehicleService } from '../../../form/vehicle-form/vehicle.service';
import { IVehicle } from '../../../form/vehicle-form/vehicle.interface';
import { DatePipe } from '@angular/common';
import { Message } from 'primeng/components/common/api';
import { NgForm } from '@angular/forms';
import { MessageService } from '../common/message/message.service';


@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css'],
    providers: [VehicleService, DatePipe, MessageService]
})
export class UserComponent implements OnInit {
    private editVehicleUrl = 'http://localhost:8080/edit/vehicle';
    private headers = new Headers({});
    selectedVehicleId: number;
    private sub: any;
    date: string;
    vehicles: IVehicle[] = [];
    message: Message[] = [];

    constructor(
        private route: ActivatedRoute,
        private service: VehicleService,
        private datePipe: DatePipe,
        private messageService: MessageService
    ) { }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.selectedVehicleId = +params['id'];
        });
        this.service.getVehicleById(this.selectedVehicleId).then(
            vehicles => this.vehicles = vehicles
        );

    }

    editVehicle(form: NgForm) {
        let formValue = form.value;
        this.service.editVehicleById(this.selectedVehicleId, formValue, this.editVehicleUrl, this.headers);
        this.messageService.showMessage('success', 'Success', 'Vehicle has been edited!');
    }


}
