import { Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { HousesService, House, HouseDetailComponent, ClientsService } from 'src/app/core';
import { BehaviorSubject, lastValueFrom } from 'rxjs';



@Component({
  selector: 'app-houses',
  templateUrl: './houses.page.html',
  styleUrls: ['./houses.page.scss'],
})

export class HousesPage {
  //public data = ['Nasdaq100:Apple,Tlry,Acb', 'Spx500:Adobe,LockyMartin', 'Crypto:Bitcoin,Ethereum', 'CAC40:Intel', 'FTSE:Astrazeneca', 'Nikkei225:Sony', 'Dax30:Teamviewer', 'EuroStoxx:Orange'];

  filteredHouses:House[];

  private _filteredSubject:BehaviorSubject<House[]> = new BehaviorSubject([]);
  public filteredHouses$ = this._filteredSubject.asObservable();

  handleChange2(event) {
   
    const query = event.target.value.toLowerCase();
   // this.results = this.data.filter(d => d.toLowerCase().indexOf(query) > -1);
    this.filteredHouses = this.housesService.getHousesByUserId().filter(d => d.name.toLowerCase().indexOf(query) > -1)
    this.updateFilteredHouses();
  }

  private updateFilteredHouses() {
    this._filteredSubject.next(this.filteredHouses);
  }

  constructor(
    private housesService: HousesService,
    private modal:ModalController,
    private alert:AlertController,
    private translate:TranslateService,
    ) {}
 
  getHouses(){
    return this.housesService.getHousesByUserId();
  }

  async presentHouseForm(house:House){
    const modal = await this.modal.create({
      component:HouseDetailComponent,
      componentProps:{
        house:house
      }
    });
    
    modal.present();
    modal.onDidDismiss().then(result=>{
      if(result && result.data){
        switch(result.data.mode){
          case 'New':
            this.housesService.addHouse(result.data.house);
            break;
          case 'Edit':
            this.housesService.updateHouse(result.data.house);
            break;
          default:
        }
      }
    });
  }
  
  onNewHouse(){
    this.presentHouseForm(null);  
  }

  onEditHouse(house){
    this.presentHouseForm(house);
  }

  async onDeleteAlert(house){
    const alert = await this.alert.create({
      header: await lastValueFrom(this.translate.get('Houses.aviso')),
      buttons: [
        {
          text: await lastValueFrom(this.translate.get('button.cancel')),
          role: 'cancel',
          handler: () => {
            console.log("Operacion cancelada");
          },
        },
        {
          text: await lastValueFrom(this.translate.get('button.delete')),
          role: 'confirm',
          handler: () => {
            this.housesService.deleteHouseById(house);
          },
        },
      ],
    });

    await alert.present();
    const { role } = await alert.onDidDismiss();
  }
  
  onDeleteHouse(house){
   this.onDeleteAlert(house);    
  }

}
