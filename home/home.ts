import { PopmarkermapPage } from './../popmarkermap/popmarkermap';
import { StatusBar } from '@ionic-native/status-bar';
import { MyservicesProvider } from './../../providers/myservices/myservices';
import { Network } from '@ionic-native/Network';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  HtmlInfoWindow,
  MyLocationOptions,
  LocationService,
  MyLocation,
  LatLng,
  StreetViewPanorama,
  MarkerCluster
} from '@ionic-native/google-maps';
import { Component, ViewChild, ElementRef  } from "@angular/core/";
import { Geolocation } from '@ionic-native/geolocation';
import { Location } from '@angular/common';
import * as SlidingMarker         from '../../../node_modules/marker-animate-unobtrusive';
import * as jQuery         from '../../../node_modules/jquery';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Mapinterface } from './../../mapinterface';
import { IonicPage, NavController, NavParams, Platform , ModalController, AlertController} from 'ionic-angular';
import { RidelistPage } from '../ridelist/ridelist';


declare var google;
declare var Connection;


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('map') mapElement: ElementRef;
  // animation code

  map: GoogleMap;
  htmlInfoWindow :HtmlInfoWindow;
  getdevicepostion: any;

  driverloc: LatLng;
  shouldShowCancel = true;

  gotsearch = true;

  clusterlatlong: any;
onemarkereach: Marker;
  pushallmarkers = new Array();

  mycluster: MarkerCluster;

  marker: SlidingMarker;
  linear: jQuery.easing.IEasingType;

  markerr: Marker;

  locations = new Array();


   firebasebusmarker: Marker;

  // for loading my location when app loads
  mylatlong: any;
  // for loading my location along with drivers
  mylocationonfirebasebuttonclick: any;

  showstreet= false;
  items: Mapinterface[];
 firebasedata = this.afDB.list<Mapinterface>('/nudriverlocation');

  start = 'chicago, il';
  end = 'st louis, mo';
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;

  disconnectSubscription: any;
  connectSubscription: any;

 // search details
  searchTerm: string = '';
    itemss: any;
    searchControl: FormControl;
    searching = false;


  constructor(private openNativeSettings: OpenNativeSettings, private alertCtrl: AlertController,private myservice: MyservicesProvider, public net: Network, private statusBar: StatusBar, public modalCtrl: ModalController, private alert: AlertController, public navCtrl: NavController,public platform: Platform, public navParams: NavParams, public geolocation: Geolocation, private afDB: AngularFireDatabase) {
    this.searchControl = new FormControl();
    // this.checkiflocationisenabled();


    // this.net.onDisconnect().subscribe(() => {
    //   console.log('network was disconnected :-(');
    //   this.Errornetwork();

    // });
  }


  ionViewDidLoad() {

  //  this.fetchfirebase();

// watch network for a disconnect


// checking network

//  // watch network for a connection
//  this.connectSubscription = this.net.onConnect().subscribe(() => {
//   console.log('Network connected!!!!');

//   // We just got a connection but we need to wait briefly
//    // before we determine the connection type. Might need to wait.
//   // prior to doing any api requests as well.
//   setTimeout(() => {
//     if (this.net.type === 'wifi') {
//       console.log('We got a wifi connection, woohoo!');
//     }
//   }, 3000);
// });




    console.log("loaded");
    this.statusBar.hide();
  }
  ionViewDidEnter() {
   this.loadMap();

    // this.thesearch ();

  }

  ionViewDidLeave() {
    // stop disconnect watch
this.disconnectSubscription.unsubscribe();

// stop connect watch
this.connectSubscription.unsubscribe();
  }

  Errornetwork() {
    let alert = this.alertCtrl.create({
      title: 'NO NETWORK!',
      subTitle: 'Please Turn on Network',
      buttons: [

        {
          text: 'Go to Settings',
          handler: () => {
            console.log('Buy clicked');
            this.openNativeSettings.open('settings');
            // this.navCtrl.pop();
            // this.navCtrl.setRoot(HomePage);
          }
        }
      ]
    });
    alert.present();
  }

  Errorlocation() {
    let alert = this.alertCtrl.create({
      title: 'NO LOCATION',
      subTitle: 'Please Turn on Location',
      buttons: [

        {
          text: 'Go to Settings',
          handler: () => {
            console.log('Buy clicked');
            this.openNativeSettings.open('location');
            // this.navCtrl.pop();
            // this.navCtrl.setRoot(HomePage);
          }
        }
      ]
    });
    alert.present();
  }

  fetchfirebase() {

   this.firebasedata.valueChanges().subscribe(res => {

    this.items = res;
    console.log(this.items);

    if (this.firebasebusmarker!== undefined) {
      this.map.clear();

       }


    for (let i = 0; i < this.items.length; i++) {

// get my crrent location after removing all markers Note: this is the second time u are getting d cur location u av already goteen it at the top when creating map but it was cleared then u now called it again
    this.followmylocationunnecessary();



     this.driverloc = new LatLng(parseFloat(this.items[i].latitude), parseFloat(this.items[i].longitude));
      console.log(this.driverloc);

      if(this.driverloc!=null && this.driverloc!=undefined){

        var myLatLng = {lat: -25.363, lng: 131.044};
        console.log('Map is ready!');
        var old = new LatLng(3.5676755, 6.1976744);
        this.firebasebusmarker = this.map.addMarkerSync({
          //your original marker options
          position: this.driverloc,
          map: this.map,
          icon: {
            url: "http://breadwallet.live/img/buss.png",
            size: {
                 width: 30,
                 height: 30
             }
            },
          title: this.items[i].uuid,
          snippet: this.items[i].latitude + this.items[i].longitude,
          duration: 2000,
          easing: "easeOutExpo"
       });

       var newpos = new LatLng(3.8676755, 7.3976744);
       this.firebasebusmarker.setPosition(this.driverloc);


  // .then((marker: Marker) => {

  //   // not too needed
  //    this.pushallmarkers.push(marker);
  //   // console.log(this.pushallmarkers);
  //   this.firebasebusmarker = marker;

   this.firebasebusmarker.addEventListener(GoogleMapsEvent.MARKER_CLICK).subscribe(e => {
     console.log(e[0]);
      let varlatlng = e[0];
  this.presentProfileModal(varlatlng) ;


   });


  //});
  // });

  }


    else {

     // alert('not yet gotten a value');

      console.error('not yet gotten a value');
    }



      }

      console.log(this.pushallmarkers);
    },
    (error) => {

      console.error(error);
   });


  }






  loadMap() {

    // let firstdriver = new LatLng(parseFloat(this.items[0].latitude), parseFloat(this.items[0].longitude));
    let mapOptions: GoogleMapOptions = {
      camera: {
         target: {
           lat: 43.0741904,
           lng: -89.3809802
         },
        // target: firstdriver,
         zoom: 18,
         tilt: 30,

       },
       mapType: "MAP_TYPE_ROADMAP"
    };

    this.map = GoogleMaps.create(this.mapElement.nativeElement, mapOptions);
    this.map.setMyLocationButtonEnabled(true);
    this.map.setMyLocationEnabled(true);
    // use this for google maps javascript
    // this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    // this.directionsDisplay.setMap(this.map);

     // listen to MAP_READY event
 // You must wait for this event to fire before adding something to the map or modifying it in anyway
 this.map.one(GoogleMapsEvent.MAP_READY).then(
  () => {


  }
);


  }




 presentProfileModal(obj: any) {

    // let obj = {driverid: this.profileselecteddriver, name: this.profileusername, phone: this.profilephone, location: this.profileroute};
     let profileModal = this.modalCtrl.create(PopmarkermapPage, obj);

    //get the value from the modal
    // profileModal.onDidDismiss(data => {
    //   this.modalclassval = data.name;
    //   console.log(this.modalclassval);
    // });

    profileModal.present();
  }

  followmylocation() {


     this.fetchfirebase();
  }

followmylocationunnecessary() {


  // let options: MyLocationOptions = {
  //   enableHighAccuracy : false
  // };

  let options = { enableHighAccuracy: true};
  LocationService.getMyLocation(options).then((location: MyLocation) => {

this.mylocationonfirebasebuttonclick =location.latLng;
      if (this.markerr !== undefined) {
        this.markerr.remove();
 }

      // let marker: Marker = this.map.addMarkerSync({
        this.markerr = this.map.addMarkerSync({
        title: 'I am Here',
        snippet: "This is where i am",
        icon: {
          url: "http://breadwallet.live/img/user.png",
          size: {
               width: 40,
               height: 40
           }
          },
        animation: 'DROP',
        position: location.latLng
      });

    // this.map.animateCamera({
    // 'target': location.latLng,
    // 'tilt': 60,
    // 'zoom': 18,
    // 'bearing': 140,
    // 'duration': 3000
    //   });


console.log('lat  '+location.latLng.lat + 'long  '+location.latLng.lng);

     // show alert of location
        // alert(["Your current location:\n",
        //   "latitude:" + location.latLng.lat.toFixed(3),
        //   "longitude:" + location.latLng.lng.toFixed(3),
        //   "speed:" + location.speed,
        //   "time:" + location.time,
        //   "bearing:" + location.bearing].join("\n"));
  },

  (err) => {
    console.log(err);
  });




}



checkiflocationisenabled() {

  let options = { enableHighAccuracy: false};
  LocationService.getMyLocation(options).then((location: MyLocation) => {


  },

  (err) => {
    console.log(err);
    this.Errorlocation();
    console.log('no location enabled');
  });

}



bookride() {


  this.navCtrl.push(RidelistPage);


}



closeap() {
this.exit();
}

exit(){
  let alert = this.alert.create({
    title: 'Confirm',
    message: 'Do you want to exit?',
    buttons: [{
      text: "exit?",
      handler: () => { this.exitApp() }
    }, {
      text: "Cancel",
      role: 'cancel'
    }]
  })
  alert.present();
}
exitApp(){
this.platform.exitApp();
}

onSearchInput(){
  this.thesearch ();
  this.searching = true;
}


setFilteredItems() {


this.itemss = this.items.filter((item) => {
  console.log(item.latitude);
  console.log(item);

  // note there is always an issue with the to string and indexof thing.this is eacuse the api already returns a string
  return   item.latitude.toString().toLowerCase().indexOf(this.searchTerm.toLowerCase())> -1;
});


}



thesearch () {
   this.setFilteredItems();
  this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
    this.searching = false;
    this.setFilteredItems();

});




}

drivertozoomto (data) {
console.log(data);
this.searchTerm =='';
let myloc = new LatLng(data.latitude, data.longitude);
this.markerr = this.map.addMarkerSync({
  title: 'I am Here',
  snippet: "This is where i am",
  icon: 'red',
  animation: 'DROP',
  position: myloc
});

this.map.animateCamera({
'target': myloc,
'tilt': 60,
'zoom': 18,
'bearing': 140,
'duration': 3000
});


console.log(myloc);
}


onCancel (event) {
  this.searchTerm == '';
}

}
