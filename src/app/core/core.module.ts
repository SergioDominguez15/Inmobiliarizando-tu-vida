import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HouseComponent, HouseDetailComponent, ClientComponent, ClientDetailComponent, AssignmentComponent, AssignmentDetailComponent, HouseSelectableComponent, ClientSelectableComponent } from '.';
import es from '@angular/common/locales/es';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslateLoader } from './utils/translate';
import { AssignmentScheduleComponent } from './components/assignment-schedule/assignment-schedule.component';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';

registerLocaleData(es);

@NgModule({
  declarations: [
    HouseComponent,
    HouseDetailComponent,
    ClientComponent,
    ClientDetailComponent,
    AssignmentComponent,
    AssignmentDetailComponent,
    HouseSelectableComponent,
    ClientSelectableComponent,
    AssignmentScheduleComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    TranslateModule.forChild({
      loader: {
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [HttpClient]
      }
      })],
  exports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    HouseComponent,
    HouseDetailComponent,
    ClientComponent,
    ClientDetailComponent,
    AssignmentComponent,
    AssignmentDetailComponent,
    HouseSelectableComponent,
    ClientSelectableComponent,
    HttpClientModule,
    TranslateModule,
    AssignmentScheduleComponent
  ],
  providers:[
    {
      provide:LOCALE_ID,
      useValue: 'es'
    },
    Camera,
    File
  ]
})
export class CoreModule { }
