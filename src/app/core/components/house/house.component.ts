import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { House } from '../../models';


@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.scss'],
})


export class HouseComponent {
 /* 
 public data = ['Amsterdam', 'Buenos Aires', 'Cairo', 'Geneva', 'Hong Kong', 'Istanbul', 'London', 'Madrid', 'New York', 'Panama City'];
  public results = [...this.data];

  handleChange(event) {
    const query = event.target.value.toLowerCase();
    this.results = this.data.filter(d => d.toLowerCase().indexOf(query) > -1);
  }
  */

  @Output() onEdit = new EventEmitter;
  @Output() onDelete = new EventEmitter;
  @Input() house:House;

  onEditClick(){
    this.onEdit.emit(this.house);
  }

  onDeleteClick(){
    this.onDelete.emit(this.house);
  }

  @ViewChild('popover') popover;

  isOpen = false;

  presentPopover(e:Event) {
    this.popover.Event = e
    this.isOpen = true;
  }

  onDismiss(result){
    this.popover.dismiss(null, 'cancel');
  }
  
   
}
