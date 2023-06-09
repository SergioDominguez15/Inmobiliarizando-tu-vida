import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { UserService } from 'src/app/core/services/user.service';
import { SignupComponent } from '../singup/singup.component';

@Component({
  selector: 'app-singin',
  templateUrl: './singin.component.html',
  styleUrls: ['./singin.component.scss'],
})
export class SinginComponent implements OnInit {

  form:FormGroup;
  constructor(
    private formBuilder:FormBuilder,
    private modalCtrl:ModalController,
    private user:UserService,
    private router:Router
  ) { 
    this.form = this.formBuilder.group({
      identifier:["", [Validators.required, Validators.email]],
      password:["", Validators.required]
    });
    
  }

  ngOnInit() {}

  async register(){ //Modal para cargar el formulario de registro
    const modal = await this.modalCtrl.create({
      component:SignupComponent,
      cssClass:"modal-full-right-side"
    });

    modal.onDidDismiss().then(async(response)=>{
      try {
        if(response.role=='ok'){
          await this.user.register(response.data);
          this.router.navigate(['folder/Home'], {replaceUrl:true});
        }
        
      } catch (error) {
        console.log(error);
  
      }
    });
    modal.present();
  }

  async onSignIn(){ //Inicia sesion
    try {
      await this.user.login(this.form.value);//LLama a la funcion login del user.service.ts
      this.router.navigate(['folder/Home'], {replaceUrl:true}); //Si obtiene respuesta navega a la pagina home del usuario
    } catch (error) {
      console.log(error);

    }
    
  }

  hasFormError(error){
    return this.form?.errors && Object.keys(this.form.errors).filter(e=>e==error).length==1;
  }
  
  errorsToArray(errors){
   
    if(errors && !('required' in errors))
      return [Object.keys(errors)[0]];
    else
      return [];
  } 
}
