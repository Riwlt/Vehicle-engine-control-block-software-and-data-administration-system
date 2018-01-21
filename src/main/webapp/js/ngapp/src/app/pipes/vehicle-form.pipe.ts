import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'vehicleModels', pure: false })
export class VehicleFormPipe implements PipeTransform {
    transform(value: any, args: any[] = null): any {
        return Object.keys(value).map(key => value[key]);
    }
}
