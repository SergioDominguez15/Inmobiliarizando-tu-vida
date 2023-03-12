import { NgModule } from '@angular/core';

import { HousesPageRoutingModule } from './houses-routing.module';

import { HousesPage } from './houses.page';
import { CoreModule } from '../../core/core.module';


@NgModule({
  imports: [
    CoreModule,
    HousesPageRoutingModule
  ],
  declarations: [HousesPage]
})
export class HousesPageModule {}