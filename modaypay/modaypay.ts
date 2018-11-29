import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController  } from 'ionic-angular';
import { MyservicesProvider } from './../../providers/myservices/myservices';
import { RidelistPage } from '../ridelist/ridelist';
import { Angular4PaystackModule } from 'angular4-paystack';
/**
 * Generated class for the ModaypayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modaypay',
  templateUrl: 'modaypay.html',
})
export class ModaypayPage {

  frompaypage: any= this.navParams.data;
  randdd: Number;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private Service: MyservicesProvider) {
    this.randdd = Math.floor(Math.random() * 2637458696) + 1000000000  ; //the first one is the number of possible results the second is the stsrt
  // console.log(this.randdd);
}



  ionViewDidLoad() {
    console.log('ionViewDidLoad ModaypayPage');

  }


  paymentCancel() {
    // passing value back to the clalling page
    let val = {name: 'i got this from the modal class'};
    this.viewCtrl.dismiss(val);
  }

  paymentDone(evnt:any) {
    this.navCtrl.pop();
    console.log(evnt);


    if (evnt.message=='Approved') {
      console.log(this.frompaypage);
      this.Service.bookcustomer(this.frompaypage.driverid , this.frompaypage.name, this.frompaypage.phone, this.frompaypage.location, this.frompaypage.amount, this.randdd.toString()).then(data => {
        // this.signined = data;
        //  console.log(this.signined.Response);
        console.log(data);
        console.log(this.frompaypage + this.frompaypage.driverid + this.frompaypage.name + this.frompaypage.phone+ this.frompaypage.location);
        // this.refreshfetchdata();
        console.log(this.randdd);
        this.navCtrl.setRoot(HomePage);
        this.navCtrl.pop();
        this.navCtrl.push(RidelistPage);

    });
  }
  }

  pay() {

    this.Service.bookcustomer(this.frompaypage.driverid , this.frompaypage.name, this.frompaypage.phone, this.frompaypage.location, this.frompaypage.amount, this.randdd.toString()).then(data => {
      // this.signined = data;
      //  console.log(this.signined.Response);
      console.log(data);
      console.log(this.frompaypage + this.frompaypage.driverid + this.frompaypage.name + this.frompaypage.phone+ this.frompaypage.location);
      // this.refreshfetchdata();
      console.log(this.randdd);
      this.navCtrl.setRoot(HomePage);
      this.navCtrl.pop();
      this.navCtrl.setRoot(RidelistPage);

  });

  }
  tohome() {
console.log(this.frompaypage);
    // console.log(this.email);
    console.log(this.randdd);
    this.navCtrl.pop();
  }

  refreshfetchdata() {
    this.Service.fetch_available_vehicles( ).then(data => {

       console.log(data);

    });
   }
}
