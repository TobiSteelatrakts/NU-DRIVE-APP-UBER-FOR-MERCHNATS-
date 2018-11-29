import { Component , ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation, GeolocationOptions } from '@ionic-native/geolocation';
import { LatLng } from '@ionic-native/google-maps';
declare var google;
/**
 * Generated class for the PopmarkermapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-popmarkermap',
  templateUrl: 'popmarkermap.html',
})

// declare var google;
export class PopmarkermapPage {


  @ViewChild('map') mapElement: ElementRef;
  map: any;
  frommappage: any= this.navParams.data;

  lat: Number = this.frommappage.lat;
  long: Number = this.frommappage.lng;

    addressbus;
  addressme:any;
  showbutton = false;

  destinationvi = 'CMS Garage, Marina Road, Lagos';
   directionsService = new google.maps.DirectionsService();

   directionsDisplayy = new google.maps.DirectionsRenderer();

   // time and distance covered
   driverdistance: string;
   drivertime: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation) {
    this.reversegeocodingbus();
    this.getmylocation ();
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad PopmarkermapPage');
    // console.log(this.long);

  }


  ionViewDidEnter() {
    this.loadMap();
  }

  loadMap(){



  // plot direction
if (this.addressbus!=undefined) {
    this. calculateAndDisplayRoutebus(this.directionsDisplayy);
    // this.calculateAndDisplayRoutemylocation(this.directionsDisplayy);
}
  console.log(this.addressbus);
  console.log(this.addressme);

let latLng = new google.maps.LatLng(this.lat, this.long);
let mapOptions = {
  center: latLng,
  zoom: 15,
  disableDefaultUI: true,
  mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

 //this.addMarker(latLng);
 // hide the default A B route icon of the direction api
 this.directionsDisplayy.setOptions( { suppressMarkers: true } );

 // set the direction api
  this.directionsDisplayy.setMap(this.map);



  // code to add marker icon to each route
// https://stackoverflow.com/questions/24936037/change-individual-markers-in-google-maps-directions

}


addMarker(latlong){

  let marker = new google.maps.Marker({
    position: latlong,
    map: this.map,
    animation: google.maps.Animation.DROP,
    icon: {
      url: "http://thewinehouseng.com/nudrivefile/user.png",
      size: {
           width: 40,
           height: 40
       }
      }
  });

  let content = "<h4>I am here!</h4>";
  marker.setPosition(latlong);
  this.addInfoWindow(marker, content);

  // this.calculateAndDisplayRoute();
}

addInfoWindow(marker, content){

  let infoWindow = new google.maps.InfoWindow({
    content: content
  });

  google.maps.event.addListener(marker, 'click', () => {
    infoWindow.open(this.map, marker);

  });

}

closedirection() {
      this.navCtrl.pop();
    }

    reversegeocodingbus() {
      let latLng = new google.maps.LatLng(this.lat, this.long);
      var geocoder = new google.maps.Geocoder;
      geocoder.geocode({'location': latLng}, (results, status) => {
        if (status === 'OK') {
        //   if (results[0]) {
        //     map.setZoom(11);
        //     var marker = new google.maps.Marker({
        //       position: latlng,
        //       map: map
        //     });
        //     infowindow.setContent(results[0].formatted_address);
        //     infowindow.open(map, marker);
        //   } else {
        //     window.alert('No results found');
        //   }
        // } else {
        //   window.alert('Geocoder failed due to: ' + status);
        // }

        if(results[0]) {

           this.addressbus = results[0].formatted_address;
           console.log(results[0]);
        }

        else {

          //window.alert('No results found');
        }


        }

        else {
          //   window.alert('Geocoder failed due to: ' + status);
          }
      });
    }


    // reversegeocodingmylocation(mylatlng: LatLng) {
    //   // let latLng = new google.maps.LatLng(this.lat, this.long);
    //   var geocoder = new google.maps.Geocoder;
    //   geocoder.geocode({'location': mylatlng}, (results, status) => {
    //     if (status === 'OK') {

    //     if(results[0]) {

    //        this.addressme = results[0].formatted_address;
    //     }

    //     else {
    //       // console.log(this.addressme);
    //       //window.alert('No results found');
    //     }
    //     console.log(this.addressme);
    //     // console.log(this.addressme);
    //     }

    //     else {
    //       //   window.alert('Geocoder failed due to: ' + status);
    //       }
    //   });
    // }

    calculateAndDisplayRoutebus(directionway: any) {
      // this.directionsService.route({
      //   origin: 'chicago, il',
      //   destination: 'st louis, mo',
      //   travelMode: 'DRIVING'
      // }, (response, status) => {
      //   if (status === 'OK') {
      //     this.directionsDisplay.setDirections(response);
      //     console.log(response);
      //   } else {
      //     window.alert('Directions request failed due to ' + status);
      //   }
      // });

    //   var request = {
    //     origin: 'chicago, il',
    //       destination: 'st louis, mo',
    //       travelMode: 'DRIVING'
    //   };

    //   this.directionsService.route(request, function(result, status) {

    //       this.directionsDisplayy.setDirections(result);
    //       console.log(result);

      // });

//        // Start/Finish icons
//  var icons = {
//   start: new google.maps.MarkerImage(
//    // URL
//    'http://thewinehouseng.com/nudrivefile/buss.png',
//    // (width,height)
//    new google.maps.Size( 44, 40 )
//   //  // The origin point (x,y)
//   //  new google.maps.Point( 0, 0 ),
//   //  // The anchor point (x,y)
//   //  new google.maps.Point( 22, 32 )
//   ),
//   end: new google.maps.MarkerImage(
//    // URL
//    'http://thewinehouseng.com/nudrivefile/destination.png',
//    // (width,height)
//    new google.maps.Size( 44, 40 )
//   //  // The origin point (x,y)
//   //  new google.maps.Point( 0, 0 ),
//   //  // The anchor point (x,y)
//   //  new google.maps.Point( 22, 32 )
//   ) };


   var starticon ={

    url: 'http://thewinehouseng.com/nudrivefile/bussresize.png',
    size: {
         width: 40,
         height: 40
     }
    }

    var endicon ={


      url: 'http://thewinehouseng.com/nudrivefile/destination.png',
      size: {
           width: 40,
           height: 40
       }
      }

    var request = {
      origin: this.addressbus,
        destination: this.destinationvi,
        travelMode: 'DRIVING'
    };

    this.directionsService.route(request, (result, status) => {

      directionway.setDirections(result);
        console.log(result.routes[0].legs[0].distance.text);
        console.log(result.routes[0].legs[0].duration.text);
        if(result!= null && result!= undefined ) {
         this.showbutton = true;
         this.driverdistance = result.routes[0].legs[0].distance.text;
         this.drivertime = result.routes[0].legs[0].duration.text;

         var leg = result.routes[ 0 ].legs[ 0 ];
         this.makeMarker( leg.start_location, starticon, "title" );
         this.makeMarker( leg.end_location, endicon, 'title' );


        }

    });
     }


     makeMarker( position, icon, title ) {
   var markerloc =   new google.maps.Marker({
       position: position,
       map: this.map,
       icon: icon,
       title: title
      });

              // Add circle overlay and bind to marker
      var circle = new google.maps.Circle({
      map: this.map,
      radius: 30,    // 10 miles in metres
      fillColor: '#AA0000'
      });
      circle.bindTo('center', markerloc, 'position');
     }
    //  calculateAndDisplayRoutemylocation(directionway: any) {

    // var request = {
    //     origin: this.addressme,
    //     destination: this.addressbus,
    //     travelMode: 'DRIVING'
    // };

    // this.directionsService.route(request, (resultlocation, status) => {

    //   directionway.setDirections(resultlocation);
    //     console.log(resultlocation+ 'resultfor mylocation');

    // });
    //  }


    getmylocation () {

      this.geolocation.getCurrentPosition().then(position => {
        let myloc = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        if (myloc) {
        //  this.reversegeocodingmylocation(myloc);
          console.log(position);
          console.log('yeah you got me');
          this.addMarker(myloc);
        }

      },

      (err) => {

          console.log(err);

      });
    }

}
