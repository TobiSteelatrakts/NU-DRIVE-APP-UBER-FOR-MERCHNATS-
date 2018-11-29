import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DriverratingPage } from './driverrating';
// Import ionic2-rating module
import { Ionic2RatingModule } from 'ionic2-rating';

@NgModule({
  declarations: [
    DriverratingPage,
  ],
  imports: [
    IonicPageModule.forChild(DriverratingPage),
    Ionic2RatingModule
  ],
})
export class DriverratingPageModule {}
