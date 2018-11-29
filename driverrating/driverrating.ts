import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DriverratingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-driverrating',
  templateUrl: 'driverrating.html',
})
export class DriverratingPage {

  rate: any;
  driver: any;
  selecteddriver : any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DriverratingPage');
    this.fetchparkandprice();
  }

  onModelChange(event: any) {
    console.log(event);

  }

  optionsselecteddriver () {

  }
fetchparkandprice () {

  this.driver =[

    {
    driver: 'NuDrive1',
    price : '900',

  },
  {
    driver: 'NuDrive2',
    price : '700',
  },


  {
    driver: 'NuDrive3',
    price : '500',
  }

  ];

}


}
