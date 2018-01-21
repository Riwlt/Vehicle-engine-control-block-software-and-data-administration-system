export interface IVehicle {
    id: number;
    markName: string;
    modelName: string;
    vehicleYear: number;
    dateRepaired: Date;
    vehicleChangesComment: Text;
    cubage: number;
    gearboxType: string;
    hexFile: File;
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
