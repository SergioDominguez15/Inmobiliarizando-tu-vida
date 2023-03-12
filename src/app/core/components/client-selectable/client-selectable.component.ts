import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IonAccordionGroup } from '@ionic/angular';
import { Client, ClientsService } from '../..';

export const CLIENT_PROFILE_VALUE_ACCESSOR: any = {
  provide:  NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ClientSelectableComponent),
  multi: true
}

@Component({
  selector: 'app-client-selectable',
  templateUrl: './client-selectable.component.html',
  styleUrls: ['./client-selectable.component.scss'],
  providers: [CLIENT_PROFILE_VALUE_ACCESSOR]
})
export class ClientSelectableComponent implements OnInit, ControlValueAccessor {

  selectedClient: Client = null;
  propagateChange = (_: any) => { }
  isDisabled:boolean = false;

  constructor(
    private clientsService: ClientsService
  ) { }

  writeValue(obj: any): void {
    //this.selectedClient = this.clientsService.getClientById(obj);;
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {
    
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  ngOnInit() {}

  getClients() {
    return this.clientsService.getClients();
  }

  onClientClicked(client:Client, accordion: IonAccordionGroup){
    this.selectedClient = client;
    accordion.value = '';
    this.propagateChange(this.selectedClient.docId);
  }

}
