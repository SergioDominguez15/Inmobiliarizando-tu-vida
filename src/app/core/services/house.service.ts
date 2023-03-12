import { Injectable } from '@angular/core';
import { DocumentData } from 'firebase/firestore';
import { BehaviorSubject, map } from 'rxjs';
import { House } from '..';
import { FileUploaded, FirebaseService } from './firebase/firebase-service';

@Injectable({
  providedIn: 'root'
})
export class HousesService {

  private _houseSubject:BehaviorSubject<House[]> = new BehaviorSubject([]);
  public houses$ = this._houseSubject.asObservable();


  unsub;
  constructor(
    private firebase:FirebaseService
  ) { 
    this.unsub = this.firebase.subscribeToCollection('houses',this._houseSubject,this.mapHouse)
  }

  ngOnDestroy(): void {
    this.unsub();
  }

  private mapHouse(doc : DocumentData){
    return{
      id:0,
      docId:doc['id'],
      name: doc['data']().name,
      pais: doc['data']().pais,
      userId: doc['data']().userId,
      horario: doc['data']().horario,
      picture: doc['data']().picture
    };
  }


  getHouses():House[]{
    var house;
    this.houses$
      .pipe()
      .subscribe(filteredHouses => {
       house = filteredHouses;
      });
    return house;
  }

  getHousesByUserId():House[]{
    var housefilteredByUserId;

    this.houses$
      .pipe(
        map(houses => houses.filter(house => house.userId === this.firebase.getUser().uid))
      )
      .subscribe(filteredHouses => {
        housefilteredByUserId = filteredHouses;
      });
      return(housefilteredByUserId);
  }

  getHouseById(id: string):any {
    this.houses$.pipe(map(houses => houses.filter(house => house.docId === id))).subscribe(filteredHouse => {return filteredHouse});
  }

  async deleteHouseById(house: House) {
    await this.firebase.deleteDocument('houses',house.docId);
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

  async addHouse(house: House) {
    var _house = {
      id:0,
      docId: house.docId,
      name: house.name,
      pais: house.pais,
      userId: this.firebase.getUser().uid,
      horario: house.horario
    };
    if (house['pictureFile']){
      var response:FileUploaded = await this.uploadImage(house['pictureFile']);
      _house['picture'] = response.file;
    }
    try {
      await this.firebase.createDocument('houses', _house);
    }catch(error){
      console.log(error);
    }
  }

  async updateHouse(houseItem: House) {
    var _house = {
      id:0,
      docId: houseItem.docId,
      name: houseItem.name,
      pais: houseItem.pais,
      userId:houseItem.userId,
      horario: houseItem.horario
    };
    if (houseItem['pictureFile']){
      var response:FileUploaded = await this.uploadImage(houseItem['pictureFile']);
      _house['picture'] = response.file;
    }
    try {
      await this.firebase.updateDocument('houses',houseItem.docId, _house);
    }catch(error){
      console.log(error);
    }
  }

  searchHouse(houseItem: House){
    this.houses$
      .pipe(map(houses => houses.filter(house => houseItem.name === house.name)))
      .subscribe(filteredHouses => {
        console.log(filteredHouses);
        return(filteredHouses);
      });
  }
}
