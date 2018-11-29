import { MyservicesProvider } from './../../providers/myservices/myservices';
import { ListPage } from './../list/list';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { IonicPage, NavController,LoadingController, NavParams } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { Storage } from '@ionic/storage';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms'
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
usernamee: string;
passwordd: string;
signined: any;
local:any;
loggedin = false;


userDetailsForm : FormGroup;
loading: any;

// error messages
account_validation_messages = {
  'username': [
    { type: 'required', message: 'Username is required' },
    // { type: 'minlength', message: 'Username must be at least 5 characters long' },
    // { type: 'maxlength', message: 'Username cannot be more than 25 characters long' },
    // { type: 'pattern', message: 'Your username must contain only numbers and letters' },
    // { type: 'validUsername', message: 'Your username has already been taken' }
  ],
  'email': [
    { type: 'required', message: 'Email is required' },
    { type: 'pattern', message: 'Enter a valid email' }
  ],
  'confirm_password': [
    { type: 'required', message: 'Confirm password is required' },
    { type: 'areEqual', message: 'Password mismatch' }
  ],
  'password': [
    { type: 'required', message: 'Password is required' },
    // { type: 'email', message: 'email is not valid' },
    // { type: 'minlength', message: 'Password must be at least 5 characters long' },

    // { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number' }
  ],
  'terms': [
    { type: 'pattern', message: 'You must accept terms and conditions' }
  ]
  }


  constructor(public navCtrl: NavController, private fb: FormBuilder, public navParams: NavParams, private Service: MyservicesProvider, private alertCtrl: AlertController, public loadingCtrl: LoadingController,private storagee: Storage) {

    this.userDetailsForm = this.fb.group({

      username: new FormControl('', {
        validators: Validators.required,
        // updateOn: 'blur'
     }),
      password: new FormControl('',

      {
        validators: Validators.compose([Validators.required]),
        // updateOn: 'blur'
     }

      )
    });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');


  }

  logmein() {
    this.navCtrl.setRoot(HomePage);
  }

  gotoregister(){
    this.navCtrl.push(SignupPage);
    console.log('I was clicked');
  }

  onsubmitpin(loginval: any){
    this.presentLoadingDefault();
    this.loading.present().then(() => {


      this.Service.signin(loginval.username , loginval.password).then(data => {

        this.signined = data;
         console.log(this.signined.Message);

         if(this.signined.Message == 'attached') {

        this.loggedin == true;
        this.navCtrl.setRoot(HomePage);
         this.storagee.set('username',  this.usernamee);
         this.storagee.set('loggedin', this.loggedin);

        this.storagee.get('username');
         this.storagee.get('loggedin');
         console.log(this.storagee.get('username'));

         this.userDetailsForm.get('username').reset();
         this.userDetailsForm.get('password').reset();

         this.navCtrl.setRoot(HomePage);
         }

         else {

         this.userDetailsForm.get('username').reset();
         this.userDetailsForm.get('password').reset();

         this.presentAlert();

         }

        //  this.navCtrl.setRoot(HomePage, {'nuban': loginval.username});

        //  if(this.signined.Response == 'Success') {
        //     //use the nuban to fetch user details
        //   this.myservice.fetchcustomer(loginval.username).then(data => {

        //     console.log(data);

        //   });
        //  }
      }).catch(error => {

        console.error(error);
      });
      this.loading.dismiss();


    });
    // console.log(loginval);


   };

   presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Invalid Login',
      subTitle: 'Invalid Username or Password',
      buttons: ['Dismiss']
    });
    alert.present();
  }



  presentLoadingDefault() {
    this.loading = this.loadingCtrl.create({
      content: 'Hang On Tight, Signing you in....'
    });


  }




}
