import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RidelistPage } from './ridelist';

@NgModule({
  declarations: [
    RidelistPage,
  ],
  imports: [
    IonicPageModule.forChild(RidelistPage),
  ],
})
export class RidelistPageModule {}
