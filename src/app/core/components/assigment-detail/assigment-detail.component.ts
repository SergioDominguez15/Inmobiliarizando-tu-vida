import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Assign, HousesService, ClientsService, AssignmentService } from '../..';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assigment-detail.component.html',
  styleUrls: ['./assigment-detail.component.scss'],
})
export class AssignmentDetailComponent {

  form: FormGroup;
  mode: "New" | "Edit" = "New";
  houses = this.housesService.getHouses();
  clients = this.clientsService.getClients();

  @Input('assign') set assign(assign: Assign) {
    if (assign) {
      this.form.controls['id'].setValue(assign.id);
      this.form.controls['docId'].setValue(assign.docId);
      this.form.controls['houseId'].setValue(assign.houseId);
      this.form.controls['clientId'].setValue(assign.clientId);
      this.form.controls['userId'].setValue(assign.userId);
      this.form.controls['dateTime'].setValue(assign.dateTime);
      this.mode = "Edit";
    }
  }

  constructor(
    private housesService: HousesService,
    private clientsService: ClientsService,
    private assignmentsService: AssignmentService,
    private fb: FormBuilder,
    private modal: ModalController,

  ) {
    this.form = this.fb.group({
      id: [null],
      docId:[''],
      houseId: [-1, [Validators.min(1)]],
      clientId: [-1, [Validators.min(1)]],
      userId:[''],
      dateTime: ['', []]
      
    });
  }

  onSubmit() {
    this.modal.dismiss({ assign: this.form.value, mode: this.mode }, 'ok');
  }

  onDismiss(result) {
    this.modal.dismiss(null, 'cancel');
  }

  onChangeDateTime(dateTime) {
    console.log(dateTime.detail.value)
    this.form.controls['dateTime'].setValue(dateTime.detail.value);
  }

}
