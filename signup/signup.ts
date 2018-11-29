import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { MyservicesProvider } from './../../providers/myservices/myservices';
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  name: string;
  bvn: string;
  phone: string;
  password: string;
  nuban: string;
  balance: string = '0';

  datacreated: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public alertCtrl: AlertController,private myservice: MyservicesProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }


  registerme () {



  }

  onsubmitpin(registerval: any) {
    this.createthenewaccount(registerval);

  }

  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present().then(() => {
      loading.dismiss();
      this.showConfirm();
    } );
  }

  showConfirm() {
    const confirm = this.alertCtrl.create({
      title: 'Account Created Successfully',
      message: 'Go To Login Page To Login',
      buttons: [
        // {
        //   text: 'Disagree',
        //   handler: () => {
        //     console.log('Disagree clicked');
        //   }
        // },
        {
          text: 'Ok',
          handler: () => {
            console.log('Agree clicked');
            this.navCtrl.setRoot(LoginPage);


          }
        }
      ],
      enableBackdropDismiss : false
    });
    confirm.present();
  }

  createthenewaccount(userdata: any) {
    this.myservice.signup(userdata.name, userdata.password, userdata.phone).then(data => {
this.datacreated = data;
      console.log(this.datacreated.Response);
      console.log(this.datacreated.Headers);
      console.log(userdata);

      if(this.datacreated.Response == 'Success') {

        this.presentLoadingDefault();
      }

      else {
        this.presentAlert();
      }


     });

  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Invalid Details',
      subTitle: 'Some Fields are missing',
      buttons: ['Dismiss']
    });
    alert.present();
  }
}
