import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { House, Client, ClientDetailComponent, ClientsService } from 'src/app/core';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';



@Component({
  selector: 'app-clients',
  templateUrl: './clients.page.html',
  styleUrls: ['./clients.page.scss'],
})
export class ClientsPage {
  filteredClients:Client[];

  private _filteredSubject:BehaviorSubject<Client[]> = new BehaviorSubject([]);
  public filteredPostions$ = this._filteredSubject.asObservable();
  
  handleChange2(event) {
    const query = event.target.value.toLowerCase();
    this.filteredClients = this.clientsService.getClientsByUserId().filter(d => d.name.toLowerCase().indexOf(query) > -1)
    this.updateFilteredClients();
    
  }

  private updateFilteredClients() {
    this._filteredSubject.next(this.filteredClients);
  }

  constructor(
    public clientsService: ClientsService,
    private modal: ModalController,
    private alert: AlertController,
    private translate:TranslateService,
  ) { }

  getClients(){
    return this.clientsService.getClientsByUserId();
  }

  async presentClientForm(client:Client){
    const modal = await this.modal.create({
      component:ClientDetailComponent,
      componentProps:{
        client:client
      }
    });
    
    modal.present();
    modal.onDidDismiss().then(result=>{
      if(result && result.data){
        switch(result.data.mode){
          case 'New':
            this.clientsService.addClient(result.data.client);
            break;
          case 'Edit':
            this.clientsService.updateClient(result.data.client);
            break;
          default:
        }
      }
    });
  }
  
  onNewClient(){
    this.presentClientForm(null);  
  }

  onEditClient(client){
    this.presentClientForm(client);
  }

  async onDeleteAlert(client){
    const alert = await this.alert.create({
      header: await lastValueFrom(this.translate.get('Client.aviso')),
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
            this.clientsService.deleteClientById(client);
          },
        },
      ],
    });

    await alert.present();
    const { role } = await alert.onDidDismiss();
  }
  
  onDeleteClient(client){
   this.onDeleteAlert(client);    
  }

}
