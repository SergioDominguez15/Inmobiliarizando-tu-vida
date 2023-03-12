import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';

import { isLowResolution as lowres} from 'src/app/utils/screen.utils';
import { Assign, HousesService, ClientsService, Client, House } from '../..';

@Component({
  selector: 'app-assignment',
  templateUrl: './assigment.component.html',
  styleUrls: ['./assigment.component.scss'],
})
export class AssignmentComponent {

  @Output() onEdit = new EventEmitter();
  @Output() onDelete = new EventEmitter();
  @Input() assign:Assign;

  isLowResolution = lowres;


  private _house:BehaviorSubject<House[]> = new BehaviorSubject([]);
  private _client:BehaviorSubject<Client[]> = new BehaviorSubject([]);
  public house$ = this._house.asObservable();
  public client$ = this._client.asObservable();

  constructor(
    private housesService: HousesService,
    private clientsService: ClientsService,
  ) {
    this.loadHouseandClients(this.assign);
  }

  private async loadHouseandClients(a:Assign){
    if (!a) {
      console.error('No se ha proporcionado un objeto Assign válido');
      return;
    }
    this._house.next(await this.housesService.getHouseById(a.houseId));
    this._client.next(await this.clientsService.getClientById(a.clientId));
  }

  public results2 = [];
  getHouse(){
    
    return this.housesService.getHouseById(this.assign.houseId);
  }

  onEditClick(slide:IonItemSliding){
    slide.close();
    this.onEdit.emit(this.assign);
  }

  onDeleteClick(slide:IonItemSliding){
    slide.close();
    this.onDelete.emit(this.assign);
  }

}
