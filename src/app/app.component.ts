import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FirebaseService } from './core/services/firebase/firebase-service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Gestion de clientes', url: '/houses', icon: 'people' },
    { title: 'Gestion de viviendas', url: '/clients', icon: 'Home' },
    { title: 'Asignacion de clientes a viviendas', url: '/assign', icon: 'time' },
    { title: 'Ver citas en el calendario', url: '/schedule', icon: 'calendar-number' },
    { title: 'Contacto', url: '/about', icon: 'call'},
    { title: 'About', url: '/folder/Inbox', icon: 'information-circle' },
  ];
  public labels =[]
  language = 0; // 0 español, 1 ingles
  constructor(
    private translate: TranslateService,
    private firebase: FirebaseService
  ) {
    this.translate.setDefaultLang('es');
  }


  signOut(){
    this.firebase.signOut();
  }

  onLanguage(){
    this.language = (this.language+1)%2;
    switch(this.language){
      case 0 :
        this.translate.setDefaultLang('es');
        break;
      case 1 :
        this.translate.setDefaultLang('en');
        break;
    }
  }
  OnToggleDarkMode() {
    document.body.setAttribute('color-theme', 'dark');
  }

  OnToggleLightMode() {
    document.body.setAttribute('color-theme', 'light');
  }
}

