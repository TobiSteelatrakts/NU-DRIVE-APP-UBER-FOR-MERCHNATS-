import { SettingsPage } from './../pages/settings/settings';
import { DriverratingPage } from './../pages/driverrating/driverrating';
import { AboutPage } from './../pages/about/about';
import { UserbookingPage } from './../pages/userbooking/userbooking';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';
import { ChatPage } from './../pages/chat/chat';
import { PopmarkermapPage } from './../pages/popmarkermap/popmarkermap';
import { ModaypayPage} from './../pages/modaypay/modaypay';
import { ProfilePage } from './../pages/profile/profile';
import { SignupPage } from './../pages/signup/signup';
import { LoginPage } from './../pages/login/login';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { GoogleMaps } from '@ionic-native/google-maps';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { Angular4PaystackModule } from 'angular4-paystack';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RidelistPage } from '../pages/ridelist/ridelist';
import { ListPage } from '../pages/list/list';
import { Geolocation } from '@ionic-native/geolocation';
import { Network } from '@ionic-native/Network';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Diagnostic } from '@ionic-native/diagnostic';
// Import ionic2-rating module
import { Ionic2RatingModule } from 'ionic2-rating';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { MyservicesProvider } from '../providers/myservices/myservices';
import { NudriveProvider } from '../providers/nudrive/nudrive';
import { ReactiveFormsModule} from '@angular/forms';


export const firebaseConfig = {
  apiKey: "AIzaSyDNjdPOf6SZijP7UPoQbNADQD_6y53nvRY",
  authDomain: "shopfirebase-54948.firebaseapp.com",
  databaseURL: "https://shopfirebase-54948.firebaseio.com",
  projectId: "shopfirebase-54948",
  storageBucket: "shopfirebase-54948.appspot.com",
  messagingSenderId: "1040608331543"
};


@NgModule({
  declarations: [
    MyApp,
    SettingsPage,
    ChatPage,
    HomePage,
    DriverratingPage,
    PopmarkermapPage,
    ListPage,
    UserbookingPage,
    RidelistPage,
    LoginPage,
    AboutPage,
    SignupPage,
    ProfilePage,
    ModaypayPage

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    ReactiveFormsModule,
    Ionic2RatingModule,
     // Put ionic2-rating module here,
    Angular4PaystackModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SettingsPage,
    ChatPage,
    AboutPage,
    DriverratingPage,
    UserbookingPage,
    PopmarkermapPage,
    ListPage,
    RidelistPage,
    ProfilePage,
    ModaypayPage,
    LoginPage,
    SignupPage
  ],
  providers: [
    StatusBar,
    OpenNativeSettings,
    Network,
    SplashScreen,
    GoogleMaps,
    SocialSharing,
    Geolocation,
    Diagnostic,
    AngularFireDatabase,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MyservicesProvider,
    NudriveProvider
  ]
})
export class AppModule {}
