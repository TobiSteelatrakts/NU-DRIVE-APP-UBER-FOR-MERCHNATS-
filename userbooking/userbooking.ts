import { OpenNativeSettings } from '@ionic-native/open-native-settings';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , AlertController, LoadingController} from 'ionic-angular';
import { MyservicesProvider } from './../../providers/myservices/myservices';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';
/**
 * Generated class for the UserbookingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-userbooking',
  templateUrl: 'userbooking.html',
})

export class UserbookingPage {
  loggedin = false;
  userbookings: any;
available = false;
loader: any;
  constructor(public navCtrl: NavController,private OpenNativeSettings: OpenNativeSettings, private alertCtr: AlertController,public loadingCtrl: LoadingController, public navParams: NavParams ,private Service: MyservicesProvider, private storage: Storage) {

    this.storage.get('username').then(data=>
      {
        if(data && this.Service.isConnected())
        {
          this.loggedin = true;
          console.log("loogedin already");
          this.fetchdetails (data);
        }

        else if(!this.Service.isConnected()) {
         this. Errornetwork() ;
         console.log("not connected");
        }
        else {
          this.loggedin = false;
          console.log("not loogedin already");
          // this.loggedin = false;
           this.presentAlert();
        }

        });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');

  }

Errornetwork() {
  let alert = this.alertCtr.create({
    title: 'NO NETWORK',
    subTitle: 'PLease Turn on Network',
    buttons: [

      {
        text: 'Go to Settings',
        handler: () => {
          console.log('Buy clicked');
          this.OpenNativeSettings.open('settings');
         // this.exitApp();
          // this.navCtrl.pop();
          // this.navCtrl.setRoot(HomePage);
        }
      }
    ],
    enableBackdropDismiss: false
  });
  alert.present();
}

  presentAlert() {
    let alert = this.alertCtr.create({
      title: 'Not Logged In',
      subTitle: 'Please LogIn to view Profile',
      buttons: [ {
        text: 'Go to Login',
        role: 'destructive',
        handler: () => {
          console.log('Destructive clicked');
          this.navCtrl.pop();
          this.navCtrl.push(LoginPage);
        }
      }],
      enableBackdropDismiss: false
    });
    alert.present();
  }

  fetchdetails (data: string) {

    // this.presentLoading();

    this.loader = this.loadingCtrl.create({
      content: "Please wait...",
    });

    this.loader.present().then(() => {

          this.Service.userbookings(data).then(dataa => {
            console.log(dataa);

            if (dataa == '401') {
          this.loggedin = false;
          this.presentAlert();
          console.log('i am actually unautorized' + dataa);
                }

          else {
            this.available = true;
            this.userbookings = dataa;
            console.log(data);
            console.log('i got here!');
      }





      }).catch(error => {

        console.error(error);
      });

      this.loader.dismiss();


      });

  }

  presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();
  }
}
