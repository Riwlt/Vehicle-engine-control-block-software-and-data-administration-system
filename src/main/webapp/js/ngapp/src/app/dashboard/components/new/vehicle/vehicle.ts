export class Vehicle {
    constructor(
        public id: number,
        public markName: string,
        public modelName: string,
        public vehicleYear: number,
        public dateRepaired: number,
        public vehicleChangesComment: string,
        public cubage: number,
        public gearboxType: string,
        public licensePlate: string
    ) { }
}
