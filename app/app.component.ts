import { OpenNativeSettings } from '@ionic-native/open-native-settings';
import { DriverratingPage } from './../pages/driverrating/driverrating';
import { SettingsPage } from './../pages/settings/settings';
import { AboutPage } from './../pages/about/about';
import { Component, ViewChild , } from '@angular/core';
import { Nav, Platform, Events, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MyservicesProvider } from './../providers/myservices/myservices';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { ProfilePage } from '../pages/profile/profile';
import { ChatPage } from '../pages/chat/chat';
import { SharePage } from '../pages/share/share';
import { sharedStylesheetJitUrl } from '@angular/compiler';
import { UserbookingPage } from '../pages/userbooking/userbooking';
import { SocialSharing } from '@ionic-native/social-sharing';
import { ToastController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  splash = true;
  // secondPage = SecondPagePage;

  pages: Array<{title: string, component: any, icon: string}>;

   //chat things here
   widget_id = 'ZCKMJ4yuvY';
   d=document;
   w=window;

  constructor(public platform: Platform,  private toastCtrl: ToastController, private social: SocialSharing, private geolocation: Geolocation, private openNativeSettings: OpenNativeSettings, private alertCtrl: AlertController, private myservice: MyservicesProvider, public statusBar: StatusBar,
    public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage, icon: 'home'},
      { title: 'Profile', component: ProfilePage, icon: 'contact'},
      { title: 'Bookings', component: UserbookingPage, icon: 'paper' },
      { title: 'Rate Driver', component: DriverratingPage, icon: 'star-half' },
      { title: 'About', component: AboutPage, icon: 'megaphone' },
      // { title: 'Share', component: SharePage, icon: 'share' },
      // { title: 'Chat', component: ChatPage, icon: 'chatboxes' },
      { title: 'Settings', component: SettingsPage, icon: 'settings' }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // this.statusBar.styleDefault();
      // this.splashScreen.hide();
      // setTimeout(() => this.splash = false, 3000);
      this.locationavail();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.push(page.component);
  }



// chat of chat code

  removeElement() {
    // this.d.getElementById('ZCKMJ4yuvY').removeChild();
    var element = this.d.getElementById('script')[0];
    element.parentNode.removeChild(element);


      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.async = true;
      s.src = '//code.jivosite.com/script/widget/'+this.widget_id;
      var ss = document.getElementsByTagName('script')[0];
      ss.parentNode.removeChild(ss);

}



  l(){
var s = document.createElement('script');
s.type = 'text/javascript';
s.async = true;
s.src = '//code.jivosite.com/script/widget/'+this.widget_id;
 var ss = document.getElementsByTagName('script')[0];
  ss.parentNode.insertBefore(s, ss);}

  loadmechat(){

    if(this.d.readyState=='complete'){
      this.l();
    }
    else {
      if(this.w.addEventListener)
      {
        this.w.addEventListener('onload',this.l);
      }

    else{
     this. w.addEventListener('load',this.l,false);

    }

    }


  }

  // end of chat code




  // start of share code
socialshare() {


  // // Check if sharing via email is supported
  // this.socialSharing.canShareVia   .then(() => {
  //   // Sharing via email is possible
  // }).catch(() => {
  //   // Sharing via email is not possible
  // });

  // Share via email
  this.social.share('Nudrive App V.1', 'Get a Ride at Affordable Price Anywhere Anytime!').then(() => {
    // Success!
    this.presentToast();
  }).catch(() => {
    // Error!
  });

}

locationavail() {

  if(!this.myservice.isConnected()) {

    console.log('i not connected');

   this.splashScreen.hide();
    this.Errornetwork ();



  }

  else {


    console.log('i am connected to network');

    this.myservice.getmylocation().then((result) => {

      console.log(result);
      if(result == false) {
        console.log('i am enabled'+ result);
        setTimeout(() => {
          this.splash = false
          this.statusBar.styleDefault();
          this.splashScreen.hide();

        }, 4000);


      }

      else {

        console.log('i am not enabled'+ result);

            this.splashScreen.hide();
            this. Errorlocation();

      }
    });



  }

}


Errorlocation() {
  let alert = this.alertCtrl.create({
    title: 'NO LOCATION',
    subTitle: 'PLease Turn on Location',
    buttons: [

      {
        text: 'Go to Settings',
        handler: () => {
          console.log('Buy clicked');
          this.openNativeSettings.open('location');
          this.exitApp();
          // this.navCtrl.pop();
          // this.navCtrl.setRoot(HomePage);
        }
      }
    ],
    enableBackdropDismiss: false
  });
  alert.present();
}

Errornetwork() {
  let alert = this.alertCtrl.create({
    title: 'NO NETWORK',
    subTitle: 'PLease Turn on Network',
    buttons: [

      {
        text: 'Go to Settings',
        handler: () => {
          console.log('Buy clicked');
          this.openNativeSettings.open('settings');
          this.exitApp();
          // this.navCtrl.pop();
          // this.navCtrl.setRoot(HomePage);
        }
      }
    ],
    enableBackdropDismiss: false
  });
  alert.present();
}

exitApp(){
  this.platform.exitApp();
  }


presentToast() {
  let toast = this.toastCtrl.create({
    message: 'Shared Successfully',
    duration: 2000,
    position: 'bottom'
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
}

// settings page open

// opensettings () {

//   // there is a problem here navctr is not working so i used nav , but still not working , learnt it has to do with the @IonicPage decorator which is not presnt here
//   this.navctr.push(SettingsPage);
// }

}
