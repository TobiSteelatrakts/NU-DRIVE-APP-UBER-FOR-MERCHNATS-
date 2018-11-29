import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserbookingPage } from './userbooking';

@NgModule({
  declarations: [
    UserbookingPage,
  ],
  imports: [
    IonicPageModule.forChild(UserbookingPage),
  ],
})
export class UserbookingPageModule {}
