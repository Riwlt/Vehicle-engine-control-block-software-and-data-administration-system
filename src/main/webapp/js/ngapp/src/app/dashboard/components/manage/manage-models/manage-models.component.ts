import { Component, OnInit } from '@angular/core';
import { DataTableModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { VehicleService } from '../../../../form/vehicle-form/vehicle.service';
import { IVehicleMark, IVehicleModel } from '../../../../form/vehicle-form/vehicle.interface';
import { MessageService } from '../../common/message/message.service';
import { ArraySortPipe } from '../../../../pipes/array-sort.pipe';
import { DialogModule } from 'primeng/primeng';

@Component({
  selector: 'app-manage-models',
  templateUrl: './manage-models.component.html',
  styleUrls: ['./manage-models.component.css'],
  providers: [VehicleService, MessageService]
})
export class ManageModelsComponent implements OnInit {
  displayDialog: boolean;
  models: IVehicleModel[] = [];
  dialogModel: IVehicleModel[];

  constructor(
    private service: VehicleService,
    private messageService: MessageService
  ) { }

  ngOnInit() {

    this.service.getVehicleModels().subscribe(
      (models) => {
        this.models = models;
      }
    );

  }

  selectModel(models) {
    this.dialogModel = models;
    this.displayDialog = true;
  }

  save(dialogModel) {
    if (this.dialogModel == null || this.dialogModel === undefined) {
      console.log('Data from dialog is null.');
    } else {
      this.service.editVehicleModelById(dialogModel, dialogModel.mark_id);
      this.messageService.showMessage('success', 'Success!', 'Vehicle model has been edited!');
    }
  }

}
