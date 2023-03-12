import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { House } from '../..';
import { PhotoItem, PhotoService } from '../../services/photo.service';
import { PlatformService } from '../../services/platform.service';


@Component({
  selector: 'app-house-detail',
  templateUrl: './house-detail.component.html',
  styleUrls: ['./house-detail.component.scss'],
})

export class HouseDetailComponent {

  form:FormGroup;
  mode:"New" | "Edit" = "New";

  currentImage = new BehaviorSubject<string>("");
  currentImage$ = this.currentImage.asObservable();

  @Input('house') set house(house:House){
    if(house){
      this.form.controls['id'].setValue(house.id);
      this.form.controls['docId'].setValue(house.docId);
      this.form.controls['name'].setValue(house.name);
      this.form.controls['pais'].setValue(house.pais);
      this.form.controls['userId'].setValue(house.userId);
      this.form.controls['horario'].setValue(house.horario);
      this.form.controls['picture'].setValue(house.picture);
      if(house.picture)
        this.currentImage.next(house.picture);
      this.mode = "Edit";
    }
  }
  
  constructor(
    public platform:PlatformService,
    private fb:FormBuilder,
    private modal:ModalController,
    private photoSvc:PhotoService,
    private cdr: ChangeDetectorRef 
  ) { 
    this.form = this.fb.group({
      id:[null],
      docId:[''],
      name:['', [Validators.required]],
      pais:['', [Validators.required]],
      userId:[''],
      horario:['', [Validators.required]],
      picture:[''],
      pictureFile:[null]
    });
  }

  onSubmit(){   
    this.modal.dismiss({house: this.form.value, mode:this.mode}, 'ok');
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
