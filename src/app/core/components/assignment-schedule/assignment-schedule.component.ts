import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Assign } from 'src/app/core/models/assign.model';
import { isLowResolution as lowres} from 'src/app/utils/screen.utils';
import { IonItemSliding } from '@ionic/angular';
import { HousesService } from 'src/app/core/services/house.service';
import { ClientsService } from 'src/app/core/services/clients.service';
import { House } from 'src/app/core/models/house.model';
import { Client } from 'src/app/core/models/client.model';

@Component({
  selector: 'app-assignment-schedule',
  templateUrl: './assignment-schedule.component.html',
  styleUrls: ['./assignment-schedule.component.scss'],
})
export class AssignmentScheduleComponent implements OnInit {

  @Input() assignment:Assign;
  isLowResolution = lowres;
  constructor(
    private housesSvc:HousesService,
    private clientsSvc:ClientsService, ){

  }

  ngOnInit(
  ) {

  }

  getClient(){
    var clientId = this.assignment.clientId;
    if(clientId)
      return this.clientsSvc.getClientById(clientId);
    return undefined;
  }

  getHouse(){
    var houseId = this.assignment.houseId;
    if(houseId)
      return this.housesSvc.getHouseById(houseId);
    return undefined;
  }
}
