import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IonAccordionGroup } from '@ionic/angular';
import { HousesService, House } from '../..';

export const USER_PROFILE_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => HouseSelectableComponent),
  multi: true
}

@Component({
  selector: 'app-house-selectable',
  templateUrl: './house-selectable.component.html',
  styleUrls: ['./house-selectable.component.scss'],
  providers: [USER_PROFILE_VALUE_ACCESSOR]
})
export class HouseSelectableComponent implements OnInit, ControlValueAccessor {
  selectedHouse: House = null;
  propagateChange = (_: any) => { }
  isDisabled:boolean = false;

  constructor(
    private housesService: HousesService
  ) { }

  async writeValue(obj: any){
    try{
      this.selectedHouse = await this.housesService.getHouseById(obj);
    }catch(error){
      console.log("No se ha podido recupera los datos: "+error)
    }
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

  getHouses() {
    return this.housesService.getHouses();
  }

  onHouseClicked(house:House, accordion?:IonAccordionGroup){
    this.selectedHouse = house;
    accordion.value = '';
    this.propagateChange(this.selectedHouse.docId);
  }
  
}
