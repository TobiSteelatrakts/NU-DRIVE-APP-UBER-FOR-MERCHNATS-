import { OpenNativeSettings } from '@ionic-native/open-native-settings';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , AlertController, LoadingController} from 'ionic-angular';
import { MyservicesProvider } from './../../providers/myservices/myservices';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
loggedin = false;
profiledetails: any;
username: string;
name: string
phone: string;
email: string;
password: string;
available = false;
loader : any;
  constructor(public navCtrl: NavController, private OpenNativeSettings: OpenNativeSettings, private alertCtr: AlertController,public loadingCtrl: LoadingController, public navParams: NavParams ,private Service: MyservicesProvider, private storage: Storage) {

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


      this.loader = this.loadingCtrl.create({
        content: "Please wait...",
      });

      this.loader.present().then(() => {
        this.Service.profile(data).then(dataa => {

          if (dataa == '401') {
        this.loggedin = false;
         this.presentAlert();
        console.log('i am actually unautorized' + dataa);
          }

        else {
          this.available = true;
          this.profiledetails = dataa;
          this.username = this.profiledetails.username;
          this.phone = this.profiledetails.phone;
          this.password = this.profiledetails.password;
          this.email = this.profiledetails.email;
          this.name = this.profiledetails.name;
          console.log(data);
          console.log('i got here!');
    }


      }).catch(error => {

        console.error(error);
      });

      this.loader.dismiss();


      });
    }







}
