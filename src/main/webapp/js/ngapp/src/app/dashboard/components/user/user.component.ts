import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { VehicleService } from '../../../form/vehicle-form/vehicle.service';
import { IVehicle } from '../../../form/vehicle-form/vehicle.interface';
import { DatePipe } from '@angular/common';
import { Message } from 'primeng/primeng';



@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css'],
    providers: [VehicleService]
})
export class UserComponent implements OnInit {

    selectedVehicleId: number;
    private sub: any;
    vehicles: IVehicle[] = [];
    message: Message[] = [];

    constructor(private route: ActivatedRoute, private service: VehicleService) { }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.selectedVehicleId = +params['id'];
        });

        this.service.getVehicleById(this.selectedVehicleId).then(
            vehicles => this.vehicles = vehicles
        );


    }

    showSuccess() {
        this.message = [];
        this.message.push({ severity: 'success', summary: 'Success', detail: 'Vehicle has been edited' });
    }

}
