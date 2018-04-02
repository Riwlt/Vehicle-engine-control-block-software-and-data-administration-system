import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../new/vehicle/vehicle.service';
import { IVehicleMark, IVehicleModel } from '../../new/vehicle/vehicle.interface';
import { MessageService } from '../../common/message/message.service';
import { DialogModule } from 'primeng/primeng';

@Component({
  selector: 'app-manage-marks',
  templateUrl: './manage-marks.component.html',
  styleUrls: ['./manage-marks.component.css'],
  providers: [VehicleService, MessageService]
})
export class ManageMarksComponent implements OnInit {
  displayDialog: boolean;
  dialogMark: IVehicleMark[];
  marks: IVehicleMark[] = [];

  constructor(
    private service: VehicleService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.service.getVehicleMarks().subscribe(
      (marks) => {
        this.marks = marks;
      }
    );
  }

  selectMark(marks) {
    this.dialogMark = marks;
    this.displayDialog = true;
  }

  save() {
    if (this.dialogMark == null || this.dialogMark === undefined) {
      console.log('Data from dialog is null.');
    } else {
      this.service.editVehicleMarkById(this.dialogMark);
      this.messageService.showMessage('success', 'Success!', 'Vehicle mark has been edited!');
    }

  }
  removeMark(dialogMark) {
    if (dialogMark.id > 0 || dialogMark.markId > 0) {
      this.service.removeVehicleMarkById(dialogMark).then(
        () => {
          this.ngOnInit();
          this.displayDialog = false;
        }
      );
    }
  }

}
