import { ModaypayPage } from './../modaypay/modaypay';
import { ListPage } from './../list/list';
import { LoginPage } from './../login/login';
import { MyservicesProvider } from './../../providers/myservices/myservices';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, LoadingController,ActionSheetController  } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-ridelist',
  templateUrl: 'ridelist.html',
})
export class RidelistPage {

  driverlist:  any[];
  selectedseatnumber: string;
  eacharray: any[];
  seatavail : Number = 0;
  thenewarray: any[];
  loggedin = false;
  logoutresponse: any;
  availableseatarray: any;
  signined : any;
  allvehicles: any = [];
  available = false;
  showpay = false;

  profiledetails: any;
  profileusername: string;
  profileroute = 'Oshodi';
  profilephone: string;
  profileselecteddriver: string;
  eachvehicledetail: any;

  selecteddriverdetails: any;

  drivername : string;

  valueee: any;
  randdd: any;
  modalclassval: string;
  authorized: false;
  park: any;
  selectedpack: string;
  availablespinner= false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController,
    public loadingCtrl: LoadingController, public modalCtrl: ModalController, private storage: Storage, public actionSheetCtrl: ActionSheetController,private Service: MyservicesProvider) {

      this.availablespinner= false;
     this. refreshfetchdata();
     this.fetchparkandprice ();
      this.storage.get('username').then(data=>
        {
          if(data)
          {
            this.loggedin = true;
           this.fetchdetails(data);
            console.log("loogedin already");
          }
          else {
            console.log("not logedin");
          }

          });

  }

  ionViewDidLoad() {

    // this.fetchallavailablevehicle();
   // console.log(this.driverlist);
   this.availablespinner= false;
  }


fetchparkandprice () {

  this.park =[

    {
    park: 'Sango',
    price : '900',

  },
  {
    park: 'Ikeja',
    price : '700',
  },


  {
    park: 'Oshodi',
    price : '500',
  }

  ];

}

optionspackpicked (pickedpak) {
 console.log(this.selectedpack);

 this.fetchallavailablevehicle(this.selectedpack['park']);


}


  presentLoadingDefault(amount:string) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait,paying...'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
      this.successpay(amount)
    }, 5000);
  }

  presentProfileModal() {

     let obj = {driverid: this.selecteddriverdetails['vehicle_id'], name: this.profileusername, phone: this.profilephone, location: this.selectedpack['park'], amount: this.selectedpack['price']};
    let profileModal = this.modalCtrl.create(ModaypayPage, obj);
    console.log(obj);
    //get the value from the modal
    profileModal.onDidDismiss(data => {
      this.modalclassval = data.name;
      console.log(this.modalclassval);
    });

    profileModal.present();
  }


  optionsvalue(value: any){
    console.log(value);
    this.selecteddriverdetails = value;
// this.profileselecteddriver = drivername;
    this.presentConfirm(this.selectedseatnumber, value['vehicle_id'],this.selectedpack['park'], this.selectedpack['price']);
  }

  presentConfirm(seatnum:string,driverid:string, driverroute:string, amount:string) {
    let alert = this.alertCtrl.create({
      title: 'Confirm selected seat',
      message: 'You are about to book for seat' +seatnum+' with '+driverid+ 'route  '+ driverroute + ' at'+ amount ,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Proceed',
          handler: () => {

            // this.showpay == true;
            if(this.loggedin==true) {
              // this.presentpay(amount);
             this. presentProfileModal();
            //  this.paymentDone(this.valueee);
            }
            else {
                this.presentActionSheet();
            }

          }
        }
      ]
    });
    alert.present();
  }

  presentpay(amount:string) {
    let alert = this.alertCtrl.create({
      title: 'PAY',
      message: 'Proceed to pay N'+ amount,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirm',
          handler: () => {
            console.log('Buy clicked');
            this.presentLoadingDefault(amount)
          }
        }
      ]
    });
    alert.present();
  }

  successpay(amount:string) {
    let alert = this.alertCtrl.create({
      title: 'SUCCESS!',
      subTitle: 'you successfully paid N'+amount,
      buttons: [

        {
          text: 'Go to map',
          handler: () => {
            console.log('Buy clicked');
            this.navCtrl.pop();
            this.navCtrl.setRoot(HomePage);
          }
        }
      ]
    });
    alert.present();
  }

  presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Modify your album',
      buttons: [
        {
          text: 'LogIn',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
            this.showlogin();
          }
        },{
          text: 'SignUp',
          handler: () => {
            console.log('Archive clicked');
            this.navCtrl.push(SignupPage);
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  showlogin() {
    const prompt = this.alertCtrl.create({
      title: 'Login',
      message: "Please Enter Login Details",
      inputs: [
        {
          name: 'username',
          placeholder: 'Username'
        },
        {
          name: 'password',
          placeholder: 'password'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'LogIn',
          handler: data => {
            console.log(data);
            this.onsubmitpin(data);
          }
        }
      ]
    });
    prompt.present();
  }

  tologin() {
    this.navCtrl.push(LoginPage);
            }

  tohome() {
     // console.log(loginval);
  this.storage.get('username').then(username => {
    this.Service.logout(username).then(data => {

      this.logoutresponse = data;
      this.storage.remove('username').then(() => {
        console.log('username has been removed'+ this.logoutresponse.Response );
        this.navCtrl.push(HomePage);
        this.loggedin = false;
      });

    });

  });



  }


  onsubmitpin(loginval: any){

    // console.log(loginval);
   this.Service.signin(loginval.username , loginval.password).then(data => {
    this.signined = data;
     console.log(this.signined.Message);

     if(this.signined.Message == 'attached') {
     this.presentLoadingDefaultlogin();
     this.loggedin == true;
     this.storage.set('username', loginval.username);
     this.storage.set('loggedin', this.loggedin);

     this.storage.get('username');
     this.storage.get('loggedin');
     console.log(this.storage.get('username')+ ' i am also here '+ this.storage.get('loggedin'));
     this.navCtrl.pop();
     this.navCtrl.push(RidelistPage);
     }

     else {
      this.loggedin == false;
     this.presentAlert();

     }


  });

   };


   fetchallavailablevehicle(park: string){
    this.availablespinner = true;
    // console.log(loginval);
   this.Service.fetchdriverbypark(park).then(data => {
    this.allvehicles = data;
     console.log(this.allvehicles);

     this.available= true;


     if(data) {
    //  this.presentLoadingDefaultlogin();

    for (let i = 0; i < this.allvehicles.length; i++) {

      // this.eachvehicledetail = this.allvehicles[i];
      // this.availableseatarray = this.allvehicles[i].available_seats;
      // console.log(this.availableseatarray);
      // this.eacharray = new Array(this.availableseatarray);
     // array.length;
     //console.log(this.eacharray);
  let val = this.allvehicles[i].available_seats;


var num = parseInt(val);
// console.log(val+ 'fhhfhf'+ num);
this.eacharray = new Array(num);

//   for (var ii = 0; ii < this.eacharray.length; ii++) {
//     this.eacharray[ii] = ii;
//     console.log(this.eacharray[ii]);
//    //  this.eacharray.push(arr_names[i]);
//  }

    };

  //   let x = this.allvehicles[0].available_seats;
  //   this.eacharray = new Array(x);
  //   for(let i = 0; i < this.eacharray.length; i++) {

  //     let neki = Number(this.eacharray[i]);
  //     this.eacharray[i]=neki;
  //     console.log(neki+'me');
  //     this.eacharray.forEach
  // }

  //Generated by typescript 1.8.10
//   let x = this.allvehicles[0].available_seats;
// var arr_names = new Array(4);

// for (var i = 0; i < arr_names.length; i++) {
//    arr_names[i] = i;
//    console.log(arr_names[i]);
// }

// let val = this.allvehicles[0].available_seats;


// var num = parseInt(val);
// // console.log(val+ 'fhhfhf'+ num);
// this.eacharray = new Array(num);

//   for (var i = 0; i < this.eacharray.length; i++) {
//     this.eacharray[i] = i;
//     console.log(this.eacharray[i]);
//    //  this.eacharray.push(arr_names[i]);
//  }


    // int[] num = new int[args.length];
    // for (int i=0; i < num.length; i++){
    //   int neki = Integer.parseInt(args[i]);
    //   num[i]=neki;
    // }
    // for(let i = 0; i < this.availableseatarray.length; i++) {


    // }

 // 100


    // //  this.loggedin == true;
    // //  this.storage.set('username', loginval.username);
    // //  this.storage.set('loggedin', this.loggedin);

    // //  this.storage.get('username');
    // //  this.storage.get('loggedin');
    // //  console.log(this.storage.get('username')+ ' '+ this.storage.get('loggedin'));
    // //  this.navCtrl.pop();
    // //  this.navCtrl.push(RidelistPage);
   }

     else {
      this.presentAlert2()

     }


  }).then(

    () => {

      setTimeout(() => {

        this.availablespinner= false; }, 1000
      );

    }
  );

   };


   refreshfetchdata() {
    this.Service.fetch_available_vehicles( ).then(data => {

       console.log(data);

    });
   }



   presentLoadingDefaultlogin() {
    let loading = this.loadingCtrl.create({
      content: 'Hang On Tight, Signing you in....'
    });

    loading.present().then(() => {
      loading.dismiss();
      // this.navCtrl.push(HomePage);

    });;


  }
   presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Invalid Login',
      subTitle: 'Invalid Username or Password',
      buttons: ['Dismiss']
    });
    alert.present();
  }

  presentAlert2() {
    let alert = this.alertCtrl.create({
      title: 'No Details',
      subTitle: 'Please check your connection',
      buttons: ['Dismiss']
    });
    alert.present();
  }


  fetchdetails (dataa: any) {


        this.Service.profile(dataa).then(data => {


           // called only when the user is logged out by the server based on unauthorized error
           if (data == '401') {
            this.loggedin = false;
            console.log('i am actually unautorized' + data);
           }

           else {
            this.profiledetails = data;
            this.profileusername = this.profiledetails['username'];
            this.profilephone = this.profiledetails['phone'];

             console.log(data);
           }



                })





  }
}
