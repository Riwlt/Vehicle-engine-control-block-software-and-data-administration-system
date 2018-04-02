export interface IVehicle {
    // Vehicle
    id: number;
    markName: string;
    modelName: string;
    vehicleYear: number;
    dateRepaired: Date;
    vehicleChangesComment: Text;
    cubage: number;
    gearboxType: string;
    licensePlate: string;
    // Customer
    firstName: string;
    lastName: string;
    phoneNumber: string;
    amountPaid: number;
    dateAdded: Date;
    disabled: boolean;
}
export interface IVehicleMark {
    id: number;
    markName: string;
}
export interface IVehicleModel {
    id: number;
    mark_id: number;
    modelName: string;
}
export interface IVehicleFile {
    id: number;
    fileBlob: File;
    fileName: string;
    fileSize: number;
    vehicleId: number;
    licensePlate: string;
    dateAdded: Date;
}
