import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { Client } from 'src/app/core/models/client.model';
import { PhotoItem, PhotoService } from '../../services/photo.service';
import { PlatformService } from '../../services/platform.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss'],
})
export class ClientDetailComponent {

  form:FormGroup;
  mode:"New" | "Edit" = "New";

  currentImage = new BehaviorSubject<string>("");
  currentImage$ = this.currentImage.asObservable();

  @Input('client') set client(client:Client){
    if(client){
      this.form.controls['id'].setValue(client.id);
      this.form.controls['docId'].setValue(client.docId);
      this.form.controls['name'].setValue(client.name);
      this.form.controls['time'].setValue(client.time);
      this.form.controls['valor'].setValue(client.valor);
      this.form.controls['userId'].setValue(client.userId);
      this.form.controls['picture'].setValue(client.picture);
      if(client.picture)
        this.currentImage.next(client.picture);
      this.mode = "Edit";
    }
  }
  
  constructor(
    public platform:PlatformService,
    private fb:FormBuilder,
    private modal:ModalController,
    private photoSvc:PhotoService,
    private userSVC : UserService,
    private cdr: ChangeDetectorRef 
  ) { 
    this.form = this.fb.group({
      id:[null],
      docId:[''],
      name:['', [Validators.required]],
      time:['', [Validators.required]],
      userId:[''],
      valor:[''],
      picture:[''],
      pictureFile:[null]
    });
  }

  onSubmit(){   
    this.modal.dismiss({client: this.form.value, mode:this.mode}, 'ok');
  }

  onDismiss(result){
    this.modal.dismiss(null, 'cancel');
  }

  async changePic(fileLoader:HTMLInputElement, mode:'library' | 'camera' | 'file'){
    var item:PhotoItem = await this.photoSvc.getPicture(mode, fileLoader);
    this.currentImage.next(item.base64);
    this.cdr.detectChanges();
    this.form.controls['pictureFile'].setValue(item.blob);
  }

}
