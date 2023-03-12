import { Injectable } from '@angular/core';
import { DocumentData } from 'firebase/firestore';
import { BehaviorSubject, map } from 'rxjs';
import { Client } from '..';
import { FileUploaded, FirebaseService } from './firebase/firebase-service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  private _clientSubject:BehaviorSubject<Client[]> = new BehaviorSubject([]);
  public clients$ = this._clientSubject.asObservable();

  unsub;
  constructor(
    private firebase:FirebaseService,
    private userSVC:UserService
    
  ) { 
    this.unsub = this.firebase.subscribeToCollection('client',this._clientSubject,this.mapClients);

    
  }

  private mapClients(doc : DocumentData){
    return{
      id:0,
      docId:doc['id'],
      name: doc['data']().name,
      time: doc['data']().time,
      userId: doc['data']().userId,
      valor: doc['data']().valor,
      picture: doc['data']().picture
    };
  }

  ngOnDestroy(): void {
    this.unsub();
  }

  getClients(): Client[] {
    var client;
    this.clients$.pipe().subscribe(filteredClients => { 
      
      client = filteredClients;
    });
    return client;
  }

  getClientsByUserId():Client[]{
    var clientfilteredByUserId;

    this.clients$
      .pipe(
        map(clients => clients.filter(client => client.userId === this.firebase.getUser().uid))
      )
      .subscribe(filteredClients => {
        clientfilteredByUserId = filteredClients;
      });
      return(clientfilteredByUserId);
  }

  getClientById(id:string):any{
    this.clients$.pipe(map(clients => clients.filter(client => client.docId === id))).subscribe(filteredClient => {return filteredClient});
  }

  async deleteClientById(client:Client){
     await this.firebase.deleteDocument('client',client.docId);
  }

  uploadImage(file):Promise<any>{  
    return new Promise(async (resolve, reject)=>{
      try {
        const data = await this.firebase.imageUpload(file);  
        resolve(data);
      } catch (error) {
        resolve(error);
      }
    });
  }

  async addClient(client:Client){
    var _client = {
      id:0,
      docId: client.docId,
      name: client.name,
      time: client.time,
      userId: this.firebase.getUser().uid,
      valor: client.valor,
    };
    if (client['pictureFile']){
      var response:FileUploaded = await this.uploadImage(client['pictureFile']);
      _client['picture'] = response.file;
    }
    try {
      await this.firebase.createDocument('client', _client);
    }catch(error){
      console.log(error);
    }
  }

  async updateClient(clientItem:Client){
    var _client = {
      id:0,
      docId: clientItem.docId,
      name: clientItem.name,
      time: clientItem.time,
      userId: clientItem.userId,
      valor: clientItem.valor
    };
    if (clientItem['pictureFile']){
      var response:FileUploaded = await this.uploadImage(clientItem['pictureFile']);
      _client['picture'] = response.file;
    }
    try {
      await this.firebase.updateDocument('client',clientItem.docId, _client);
    }catch(error){
      console.log(error);
    }
  }

  searchHouse(clientItem: Client){
    this.clients$
      .pipe(map(client => client.filter(client => clientItem.name === client.name)))
      .subscribe(filteredHouses => {
        console.log(filteredHouses);
        return(filteredHouses);
      });
  }

}
