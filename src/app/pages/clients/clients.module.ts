import { NgModule } from '@angular/core';

import { ClientsPageRoutingModule } from './clients-routing.module';

import { CoreModule } from '../../core/core.module';
import { ClientsPage } from './clients.page';

@NgModule({
  imports: [
    CoreModule,
    ClientsPageRoutingModule,
  ],
  declarations: [ClientsPage]
})
export class ClientsPageModule {}