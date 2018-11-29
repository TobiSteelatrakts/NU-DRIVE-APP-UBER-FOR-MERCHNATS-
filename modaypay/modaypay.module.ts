import { Angular4PaystackModule } from 'angular4-paystack';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModaypayPage } from './modaypay';

@NgModule({
  declarations: [
    ModaypayPage,
  ],
  imports: [
    IonicPageModule.forChild(ModaypayPage),
    Angular4PaystackModule
  ],
})
export class ModaypayPageModule {}
