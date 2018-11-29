webpackJsonp([4],{

/***/ 133:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__login_login__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ridersrequest_ridersrequest__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_device__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2_database__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_myservices_myservices__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_geolocation__ = __webpack_require__(247);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








// import {
//   GoogleMaps,
//   GoogleMap,
//   GoogleMapsEvent,
//   GoogleMapOptions,
//   CameraPosition,
//   MarkerOptions,
//   Marker,
//   HtmlInfoWindow,
//   MyLocationOptions,
//   LocationService,
//   MyLocation,
//   LatLng,
//   StreetViewPanorama
// } from '@ionic-native/google-maps';

var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, Service, storage, geolocation, device, afDB) {
        this.navCtrl = navCtrl;
        this.Service = Service;
        this.storage = storage;
        this.geolocation = geolocation;
        this.device = device;
        this.afDB = afDB;
        this.loggedin = false;
        this.ref = this.afDB.database.ref('nudriverlocation/');
    }
    HomePage.prototype.ionViewDidEnter = function () {
        this.loadMap();
    };
    HomePage.prototype.loadMap = function () {
        // let latLng = new google.maps.LatLng(3.3632583, 6.5697245);
        // let mapOptions = {
        //   center: latLng,
        //   zoom: 15,
        //   // disableDefaultUI: true,
        //   mapTypeId: google.maps.MapTypeId.ROADMAP
        //   }
        //   this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        // this.getdevicepostion = this.geolocation.watchPosition().subscribe
        //     // .filter((p) => p.coords !== undefined) //Filter Out Errors
        //     (position => {
        // console.log(position.coords.longitude + ' ' + position.coords.latitude);
        // let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        var latLng = new google.maps.LatLng(3.3632583, 6.5697245);
        var mapOptions = {
            center: latLng,
            zoom: 15,
            disableDefaultUI: true,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        // this.updateGeolocation(this.device.uuid, position.coords.latitude,position.coords.longitude);
        // add marker after getting location
        if (latLng != null) {
            console.log(latLng);
            this.addMarker(latLng);
        }
        // }, (err) => {
        // console.log(err);
        // });
        // let myLatLngg = new google.maps.LatLng({lat: 3.4447962, lng: 6.1653944});
        // // this.addMarker(myLatLngg);
        // console.log(myLatLngg);
    };
    HomePage.prototype.addMarker = function (latlong) {
        var marker = new google.maps.Marker({
            position: latlong,
            map: this.map,
            animation: google.maps.Animation.DROP
        });
        var content = "<h4>Information!</h4>";
        marker.setPosition(latlong);
        this.addInfoWindow(marker, content);
    };
    HomePage.prototype.addInfoWindow = function (marker, content) {
        var _this = this;
        var infoWindow = new google.maps.InfoWindow({
            content: content
        });
        google.maps.event.addListener(marker, 'click', function () {
            infoWindow.open(_this.map, marker);
        });
    };
    HomePage.prototype.ionViewDidLeave = function () {
    };
    HomePage.prototype.viewrequests = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_1__ridersrequest_ridersrequest__["a" /* RidersrequestPage */]);
    };
    HomePage.prototype.logout = function () {
        var _this = this;
        this.storage.get('usernamedriver').then(function (username) {
            _this.Service.logout(username).then(function (data) {
                _this.logoutresponse = data;
                _this.storage.remove('usernamedriver').then(function () {
                    console.log('username has been removed' + _this.logoutresponse.Response);
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_0__login_login__["a" /* LoginPage */]);
                    _this.loggedin = false;
                });
            });
        });
    };
    HomePage.prototype.addMarkerr = function () { };
    HomePage.prototype.updateGeolocation = function (uuid, lat, lng) {
        if (localStorage.getItem('mykey')) {
            this.afDB.database.ref('nudriverlocation/' + localStorage.getItem('mykey')).set({
                uuid: uuid,
                latitude: lat,
                longitude: lng
            });
        }
        else {
            var newData = this.ref.push();
            newData.set({
                uuid: uuid,
                latitude: lat,
                longitude: lng
            });
            localStorage.setItem('mykey', newData.key);
        }
        console.log(uuid);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["_8" /* ViewChild */])('map'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2__angular_core__["t" /* ElementRef */])
    ], HomePage.prototype, "mapElement", void 0);
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["m" /* Component */])({
            selector: 'home-page',template:/*ion-inline-start:"C:\Users\STEELATRAKTS\Documents\IOINCPROJECTS\New folder (2)\NuDriver\src\pages\home\home.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Map\n    </ion-title>\n    <ion-buttons end>\n      <button ion-button (click)="viewrequests()"><ion-icon name="add"></ion-icon>View Requests</button>\n    </ion-buttons>\n    <ion-buttons end>\n      <button ion-button (click)="logout()"><ion-icon ios="ios-log-out" md="md-log-out"></ion-icon>LogOut</button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <div #map style="height:100%;"></div>\n</ion-content>\n'/*ion-inline-end:"C:\Users\STEELATRAKTS\Documents\IOINCPROJECTS\New folder (2)\NuDriver\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_7__providers_myservices_myservices__["a" /* MyservicesProvider */], __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_device__["a" /* Device */], __WEBPACK_IMPORTED_MODULE_5_angularfire2_database__["a" /* AngularFireDatabase */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 158:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_myservices_myservices__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_login__ = __webpack_require__(71);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ProfilePage = /** @class */ (function () {
    function ProfilePage(navCtrl, alertCtr, loadingCtrl, navParams, Service, storage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.alertCtr = alertCtr;
        this.loadingCtrl = loadingCtrl;
        this.navParams = navParams;
        this.Service = Service;
        this.storage = storage;
        this.loggedin = false;
        this.storage.get('usernamedriver').then(function (data) {
            if (data) {
                _this.loggedin = true;
                console.log("loogedin already");
                _this.fetchdetails();
            }
            else {
                _this.loggedin = false;
                console.log("not logedin");
                _this.presentAlert();
            }
        });
    }
    ProfilePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ProfilePage');
        this.fetchdetails();
    };
    ProfilePage.prototype.presentAlert = function () {
        var _this = this;
        var alert = this.alertCtr.create({
            title: 'Not Logged In',
            subTitle: 'Please LogIn to view Profile',
            buttons: [{
                    text: 'Go to Login',
                    role: 'destructive',
                    handler: function () {
                        console.log('Destructive clicked');
                        _this.navCtrl.pop();
                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__login_login__["a" /* LoginPage */]);
                    }
                }],
            enableBackdropDismiss: false
        });
        alert.present();
    };
    ProfilePage.prototype.fetchdetails = function () {
        var _this = this;
        this.presentLoading();
        this.storage.get('username').then(function (data) {
            _this.Service.profile(data).then(function (data) {
                _this.profiledetails = data;
                _this.username = _this.profiledetails.username;
                _this.phone = _this.profiledetails.phone;
                _this.password = _this.profiledetails.password;
                _this.vehicle = _this.profiledetails.vehicle_brand;
                _this.plate = _this.profiledetails.plate_number;
                _this.capacityy = _this.profiledetails.max_capacity;
                console.log(data);
            });
        });
    };
    ProfilePage.prototype.presentLoading = function () {
        var loader = this.loadingCtrl.create({
            content: "Please wait...",
            duration: 3000
        });
        loader.present();
    };
    ProfilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-profile',template:/*ion-inline-start:"C:\Users\STEELATRAKTS\Documents\IOINCPROJECTS\New folder (2)\NuDriver\src\pages\profile\profile.html"*/'<!--\n  Generated template for the ProfilePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>profile</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n  <ion-card>\n    <img src="https://picsum.photos/30/30/?random"/>\n    <ion-card-content>\n      <ion-card-title>\n        Nine Inch Nails Live\n        </ion-card-title>\n        <ion-list>\n\n        <ion-card>\n            <ion-item>\n              <ion-icon name="contact" item-start></ion-icon>\n              <h2>{{username}}</h2>\n              <p>Ugh. As if.</p>\n            </ion-item>\n        </ion-card>\n\n        <ion-card>\n            <ion-item>\n                <ion-icon name="call" item-start></ion-icon>\n              <h2>{{phone}}</h2>\n              <p>Ugh. As if.</p>\n            </ion-item>\n        </ion-card>\n\n        <ion-card>\n            <ion-item>\n                <ion-icon name="mail" item-start></ion-icon>\n              <h2>{{password}}</h2>\n              <p>Ugh. As if.</p>\n            </ion-item>\n        </ion-card>\n\n        <ion-card>\n          <ion-item>\n              <ion-icon name="mail" item-start></ion-icon>\n            <h2>{{plate}}</h2>\n            <p>Ugh. As if.</p>\n          </ion-item>\n      </ion-card>\n\n      <ion-card>\n        <ion-item>\n            <ion-icon name="mail" item-start></ion-icon>\n          <h2>{{vehicle}}</h2>\n          <p>Ugh. As if.</p>\n        </ion-item>\n    </ion-card>\n    <ion-card>\n      <ion-item>\n          <ion-icon name="mail" item-start></ion-icon>\n        <h2>Capacity  {{capacityy}}</h2>\n        <p>Ugh. As if.</p>\n      </ion-item>\n  </ion-card>\n\n\n        </ion-list>\n    </ion-card-content>\n  </ion-card>\n\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\STEELATRAKTS\Documents\IOINCPROJECTS\New folder (2)\NuDriver\src\pages\profile\profile.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_myservices_myservices__["a" /* MyservicesProvider */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]])
    ], ProfilePage);
    return ProfilePage;
}());

//# sourceMappingURL=profile.js.map

/***/ }),

/***/ 159:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RidersrequestPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_myservices_myservices__ = __webpack_require__(45);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the RidersrequestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var RidersrequestPage = /** @class */ (function () {
    function RidersrequestPage(navCtrl, navParams, alertCtrl, Service, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.Service = Service;
        this.loadingCtrl = loadingCtrl;
        this.fetchdriverriderequest();
    }
    RidersrequestPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RidersrequestPage');
    };
    RidersrequestPage.prototype.fetchdriverriderequest = function () {
        var _this = this;
        // console.log(loginval);
        this.Service.fetchbooked('NUDRIVE_6581').then(function (data) {
            _this.fetchdriverbooks = data;
            console.log(_this.fetchdriverbooks);
            if (_this.fetchdriverbooks.length != 0) {
                _this.presentLoadingDefault();
                //  console.log(this.signined.Response);
            }
            else {
                _this.presentAlert();
            }
        });
    };
    RidersrequestPage.prototype.presentAlert = function () {
        var alert = this.alertCtrl.create({
            title: 'No Ride Request',
            subTitle: 'Please Check Back!',
            buttons: ['Dismiss']
        });
        alert.present();
    };
    RidersrequestPage.prototype.presentLoadingDefault = function () {
        var loading = this.loadingCtrl.create({
            content: 'Hang In Tight, Signing you in....'
        });
        loading.present().then(function () {
            loading.dismiss();
            // this.navCtrl.setRoot(HomePage);
        });
        ;
    };
    RidersrequestPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-ridersrequest',template:/*ion-inline-start:"C:\Users\STEELATRAKTS\Documents\IOINCPROJECTS\New folder (2)\NuDriver\src\pages\ridersrequest\ridersrequest.html"*/'<!--\n  Generated template for the RidersrequestPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>ridersrequest</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n\n\n\n  <ion-card>\n    <ion-card-header>\n        Ride Requests Today\n      </ion-card-header>\n\n<ion-list *ngFor="let eachbookeddetails of fetchdriverbooks" detail-push>\n\n\n\n          <ion-card-content>\n              <ion-item>\n\n\n\n                  <ion-avatar item-start>\n                    <ion-icon name="person"></ion-icon>\n                  </ion-avatar>\n                  <ion-label stacked>\n                      {{eachbookeddetails[\'vehicle_id\']}}\n                    </ion-label>\n                    <ion-label stacked>\n                        {{eachbookeddetails[\'name\']}}\n                      </ion-label>\n                      <ion-label stacked>\n                          {{eachbookeddetails[\'phone\']}}\n                        </ion-label>\n                        <ion-label stacked>\n                            {{eachbookeddetails[\'park\']}}\n                          </ion-label>\n                            <button ion-button outline item-end>\n                           Details\n                          </button>\n                </ion-item>\n          </ion-card-content>\n\n\n\n\n</ion-list>\n\n</ion-card>\n<!-- <ion-card *ngIf="available==false">\n<div class="tocenter">\n  <i class="fa fa-spinner fa-spin text-center" style="font-size:80px;"></i>\n  <ion-spinner icon="crescent" class="spinner" style="font-size:80px;"></ion-spinner>\n</div>\n</ion-card> -->\n\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\STEELATRAKTS\Documents\IOINCPROJECTS\New folder (2)\NuDriver\src\pages\ridersrequest\ridersrequest.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2__providers_myservices_myservices__["a" /* MyservicesProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */]])
    ], RidersrequestPage);
    return RidersrequestPage;
}());

//# sourceMappingURL=ridersrequest.js.map

/***/ }),

/***/ 160:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__login_login__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_myservices_myservices__ = __webpack_require__(45);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SignupPage = /** @class */ (function () {
    function SignupPage(navCtrl, navParams, loadingCtrl, alertCtrl, myservice) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.myservice = myservice;
    }
    SignupPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RegisterPage');
    };
    SignupPage.prototype.registerme = function () {
    };
    SignupPage.prototype.onsubmitpin = function (registerval) {
        this.createthenewaccount(registerval);
    };
    SignupPage.prototype.presentLoadingDefault = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present().then(function () {
            loading.dismiss();
            _this.showConfirm();
        });
    };
    SignupPage.prototype.showConfirm = function () {
        var _this = this;
        var confirm = this.alertCtrl.create({
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
                    handler: function () {
                        console.log('Agree clicked');
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_0__login_login__["a" /* LoginPage */]);
                    }
                }
            ],
            enableBackdropDismiss: false
        });
        confirm.present();
    };
    SignupPage.prototype.createthenewaccount = function (userdata) {
        var _this = this;
        this.myservice.signup(userdata.username, userdata.name, userdata.phone, userdata.address, userdata.password, userdata.vehicle_brand, userdata.plate_number, userdata.max_capacity).then(function (data) {
            _this.datacreated = data;
            console.log(_this.datacreated.Response);
            console.log(_this.datacreated.Headers);
            console.log(userdata);
            if (_this.datacreated.Response == 'Success') {
                _this.presentLoadingDefault();
            }
            else {
                _this.presentAlert();
            }
        });
    };
    SignupPage.prototype.presentAlert = function () {
        var alert = this.alertCtrl.create({
            title: 'Invalid Details',
            subTitle: 'Some Fields are missing',
            buttons: ['Dismiss']
        });
        alert.present();
    };
    SignupPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-signup',template:/*ion-inline-start:"C:\Users\STEELATRAKTS\Documents\IOINCPROJECTS\New folder (2)\NuDriver\src\pages\signup\signup.html"*/'<!--\n  Generated template for the RegisterPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Signup</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n    <!-- <div class="loginimg">\n\n      </div>\n        <ion-list>\n\n            <ion-item>\n              <ion-label>Name</ion-label>\n              <ion-input type="text"></ion-input>\n            </ion-item>\n\n            <ion-item>\n              <ion-label>Account</ion-label>\n              <ion-input type="text"></ion-input>\n            </ion-item>\n            <ion-item>\n              <ion-label>Phone Number</ion-label>\n              <ion-input type="text"></ion-input>\n            </ion-item>\n\n            <ion-item>\n                <ion-label>BVN</ion-label>\n                <ion-input type="text"></ion-input>\n              </ion-item>\n\n              <ion-item>\n                  <ion-label>Username</ion-label>\n                  <ion-input type="text"></ion-input>\n                </ion-item>\n\n                <ion-item>\n                    <ion-label>Password</ion-label>\n                    <ion-input type="password"></ion-input>\n                  </ion-item>\n\n          </ion-list> -->\n\n          <form  id="formNewProduct" name ="formNewProduct" #productData="ngForm" (ngSubmit) = "onsubmitpin(productData.value)">\n            <ion-list>\n\n              <ion-item>\n                <ion-label>Username</ion-label>\n                <ion-input type="text" name="name" id="user"  required autofocus [(ngModel)]=\'username\'></ion-input>\n              </ion-item>\n\n              <ion-item>\n                <ion-label>Password</ion-label>\n                <ion-input type="password" name="password" id="pass"  required autofocus [(ngModel)]=\'password\'></ion-input>\n              </ion-item>\n\n              <ion-item>\n                <ion-label>Phone Number</ion-label>\n                <ion-input type="text" name="phone" id="user"  required autofocus [(ngModel)]=\'phone\'></ion-input>\n              </ion-item>\n\n\n              <ion-item>\n                <ion-label>Name</ion-label>\n                <ion-input type="text" name="name" id="user"  required autofocus [(ngModel)]=\'name\'></ion-input>\n              </ion-item>\n\n              <ion-item>\n                <ion-label>Address</ion-label>\n                <ion-input type="text" name="address" id="user"  required autofocus [(ngModel)]=\'address\'></ion-input>\n              </ion-item>\n\n              <ion-item>\n                <ion-label>Vehicle</ion-label>\n                <ion-input type="text" name="vehicle" id="user"  required autofocus [(ngModel)]=\'vehicle\'></ion-input>\n              </ion-item>\n\n              <ion-item>\n                <ion-label>Plate Number</ion-label>\n                <ion-input type="text" name="plate" id="user"  required autofocus [(ngModel)]=\'plate\'></ion-input>\n              </ion-item>\n\n              <ion-item>\n                <ion-label>Capacity</ion-label>\n                <ion-input type="text" name="capacity" id="user"  required autofocus [(ngModel)]=\'capacity\'></ion-input>\n              </ion-item>\n              </ion-list>\n\n              <div>\n                  <button ion-button secondary block type="submit">Sign UP</button>\n                <!-- <button ion-button secondary block (click)="logmein()" [disabled]="!closed" type="submit">Sign In</button> -->\n              </div>\n            </form>\n\n\n\n          <!-- <div padding>\n            <button ion-button secondary block (click)="registerme()">Sign In</button>\n          </div> -->\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\STEELATRAKTS\Documents\IOINCPROJECTS\New folder (2)\NuDriver\src\pages\signup\signup.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_3__providers_myservices_myservices__["a" /* MyservicesProvider */]])
    ], SignupPage);
    return SignupPage;
}());

//# sourceMappingURL=signup.js.map

/***/ }),

/***/ 193:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 193;

/***/ }),

/***/ 235:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/login/login.module": [
		497,
		3
	],
	"../pages/profile/profile.module": [
		498,
		2
	],
	"../pages/ridersrequest/ridersrequest.module": [
		499,
		1
	],
	"../pages/signup/signup.module": [
		500,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 235;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 289:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ListPage = /** @class */ (function () {
    function ListPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');
        // Let's populate this page with some filler content for funzies
        this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
            'american-football', 'boat', 'bluetooth', 'build'];
        this.items = [];
        for (var i = 1; i < 11; i++) {
            this.items.push({
                title: 'Item ' + i,
                note: 'This is item #' + i,
                icon: this.icons[Math.floor(Math.random() * this.icons.length)]
            });
        }
    }
    ListPage_1 = ListPage;
    ListPage.prototype.itemTapped = function (event, item) {
        // That's right, we're pushing to ourselves!
        this.navCtrl.push(ListPage_1, {
            item: item
        });
    };
    ListPage = ListPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-list',template:/*ion-inline-start:"C:\Users\STEELATRAKTS\Documents\IOINCPROJECTS\New folder (2)\NuDriver\src\pages\list\list.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>List</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <button ion-item *ngFor="let item of items" (click)="itemTapped($event, item)">\n      <ion-icon [name]="item.icon" item-start></ion-icon>\n      {{item.title}}\n      <div class="item-note" item-end>\n        {{item.note}}\n      </div>\n    </button>\n  </ion-list>\n  <div *ngIf="selectedItem" padding>\n    You navigated here from <b>{{selectedItem.title}}</b>\n  </div>\n</ion-content>\n'/*ion-inline-end:"C:\Users\STEELATRAKTS\Documents\IOINCPROJECTS\New folder (2)\NuDriver\src\pages\list\list.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
    ], ListPage);
    return ListPage;
    var ListPage_1;
}());

//# sourceMappingURL=list.js.map

/***/ }),

/***/ 291:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(292);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(413);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 413:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_profile_profile__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pages_ridersrequest_ridersrequest__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_signup_signup__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_login_login__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_common_http__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_storage__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_Network__ = __webpack_require__(489);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_geolocation__ = __webpack_require__(247);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_device__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__app_component__ = __webpack_require__(490);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_home_home__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_list_list__ = __webpack_require__(289);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_angularfire2__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_angularfire2_database__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_angularfire2_auth__ = __webpack_require__(491);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_native_status_bar__ = __webpack_require__(287);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ionic_native_splash_screen__ = __webpack_require__(288);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__providers_nudrive_nudrive__ = __webpack_require__(496);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__providers_myservices_myservices__ = __webpack_require__(45);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






















var config = {
    apiKey: "AIzaSyDNjdPOf6SZijP7UPoQbNADQD_6y53nvRY",
    authDomain: "shopfirebase-54948.firebaseapp.com",
    databaseURL: "https://shopfirebase-54948.firebaseio.com",
    projectId: "shopfirebase-54948",
    storageBucket: "shopfirebase-54948.appspot.com",
    messagingSenderId: "1040608331543"
};
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_5__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_12__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_2__pages_signup_signup__["a" /* SignupPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_1__pages_ridersrequest_ridersrequest__["a" /* RidersrequestPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_list_list__["a" /* ListPage */],
                __WEBPACK_IMPORTED_MODULE_0__pages_profile_profile__["a" /* ProfilePage */],
                __WEBPACK_IMPORTED_MODULE_3__pages_login_login__["a" /* LoginPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_7__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_15_angularfire2__["a" /* AngularFireModule */].initializeApp(config),
                __WEBPACK_IMPORTED_MODULE_8__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_12__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/profile/profile.module#ProfilePageModule', name: 'ProfilePage', segment: 'profile', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/ridersrequest/ridersrequest.module#RidersrequestPageModule', name: 'RidersrequestPage', segment: 'ridersrequest', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/signup/signup.module#SignupPageModule', name: 'SignupPage', segment: 'signup', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_16_angularfire2_database__["b" /* AngularFireDatabaseModule */],
                __WEBPACK_IMPORTED_MODULE_17_angularfire2_auth__["a" /* AngularFireAuthModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_6_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_12__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_2__pages_signup_signup__["a" /* SignupPage */],
                __WEBPACK_IMPORTED_MODULE_1__pages_ridersrequest_ridersrequest__["a" /* RidersrequestPage */],
                __WEBPACK_IMPORTED_MODULE_0__pages_profile_profile__["a" /* ProfilePage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_list_list__["a" /* ListPage */],
                __WEBPACK_IMPORTED_MODULE_3__pages_login_login__["a" /* LoginPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_18__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_19__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_10__ionic_native_geolocation__["a" /* Geolocation */],
                __WEBPACK_IMPORTED_MODULE_16_angularfire2_database__["a" /* AngularFireDatabase */],
                __WEBPACK_IMPORTED_MODULE_11__ionic_native_device__["a" /* Device */],
                { provide: __WEBPACK_IMPORTED_MODULE_5__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["c" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_20__providers_nudrive_nudrive__["a" /* NudriveProvider */],
                __WEBPACK_IMPORTED_MODULE_21__providers_myservices_myservices__["a" /* MyservicesProvider */],
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_Network__["a" /* Network */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 45:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyservicesProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_network__ = __webpack_require__(444);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/*
  Generated class for the MyservicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var MyservicesProvider = /** @class */ (function () {
    function MyservicesProvider(http, network) {
        this.http = http;
        this.network = network;
        console.log('Hello MyservicesProvider Provider');
    }
    MyservicesProvider.prototype.signin = function (username, password) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get('http://nudrive.azurewebsites.net/drivers/login?username=' + username + '&password=' + password, { withCredentials: true }).subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    MyservicesProvider.prototype.fetchcustomer = function (nuban) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get('http://localhost:65199/account/fetch?nuban=' + nuban, { withCredentials: true }).subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    MyservicesProvider.prototype.lockbalance = function (nuban, fakebal) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get('http://localhost:65199/account/lock?nuban=' + nuban + '&mask=' + fakebal, { withCredentials: true }).subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    MyservicesProvider.prototype.signup = function (username, name, phone, address, password, vehicle_brand, plate_number, max_capacity) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get('http://nudrive.azurewebsites.net/drivers/signup?username=' + username + '&name=' + name + '&phone=' + phone + '&address=' + address + '&password=' + password + '&vehicle_brand=' + vehicle_brand + '&plate_number=' + plate_number + '&max_capacity=' + max_capacity, { withCredentials: true }).subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    MyservicesProvider.prototype.transfer = function (source, destination, amount, description) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get('http://localhost:65199/account/transfer?source=' + source + '&destination=' + destination + '&amount=' + amount + '&description=' + description, { withCredentials: true }).subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    MyservicesProvider.prototype.logout = function (username) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get('http://nudrive.azurewebsites.net/drivers/signout?username=' + username, { withCredentials: true }).subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    MyservicesProvider.prototype.profile = function (username) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get('http://nudrive.azurewebsites.net/drivers/fetch?username=' + username, { withCredentials: true }).subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    MyservicesProvider.prototype.fetchbooked = function (vehicleid) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get('http://nudrive.azurewebsites.net/vehicles/fetchbooked?vehicle_id=' + vehicleid).subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    MyservicesProvider.prototype.isConnected = function () {
        var conntype = this.network.type;
        return conntype && conntype !== 'unknown' && conntype !== 'none';
    };
    MyservicesProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_network__["a" /* Network */]])
    ], MyservicesProvider);
    return MyservicesProvider;
}());

//# sourceMappingURL=myservices.js.map

/***/ }),

/***/ 490:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_myservices_myservices__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pages_home_home__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_profile_profile__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__ = __webpack_require__(287);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__ = __webpack_require__(288);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_list_list__ = __webpack_require__(289);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var MyApp = /** @class */ (function () {
    function MyApp(platform, Service, statusBar, splashScreen) {
        this.platform = platform;
        this.Service = Service;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_1__pages_home_home__["a" /* HomePage */];
        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', component: __WEBPACK_IMPORTED_MODULE_1__pages_home_home__["a" /* HomePage */] },
            { title: 'Profile', component: __WEBPACK_IMPORTED_MODULE_2__pages_profile_profile__["a" /* ProfilePage */] },
            { title: 'List', component: __WEBPACK_IMPORTED_MODULE_7__pages_list_list__["a" /* ListPage */] }
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            if (!_this.Service.isConnected()) {
                console.log('i am connected');
            }
            else {
                console.log('i am not connected');
            }
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["g" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["g" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\STEELATRAKTS\Documents\IOINCPROJECTS\New folder (2)\NuDriver\src\app\app.html"*/'<ion-menu [content]="content">\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Menu</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content>\n    <ion-list>\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n        {{p.title}}\n      </button>\n    </ion-list>\n  </ion-content>\n\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n'/*ion-inline-end:"C:\Users\STEELATRAKTS\Documents\IOINCPROJECTS\New folder (2)\NuDriver\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_0__providers_myservices_myservices__["a" /* MyservicesProvider */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 496:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NudriveProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/*
  Generated class for the NudriveProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var NudriveProvider = /** @class */ (function () {
    function NudriveProvider(http) {
        this.http = http;
        console.log('Hello NudriveProvider Provider');
    }
    // signin () {
    //   this.http.get('https://jsonplaceholder.typicode.com/photos').subscribe(
    //     res => {
    //       console.log(res);
    //     }
    //   );
    // }
    NudriveProvider.prototype.signin = function (username, password) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get('nudrive.azurewebsites.net/account/signin?username=' + username + '&password=' + password, { withCredentials: true }).subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    NudriveProvider.prototype.fetchcustomer = function (nuban) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get('http://localhost:65199/account/fetch?nuban=' + nuban, { withCredentials: true }).subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    NudriveProvider.prototype.lockbalance = function (nuban, fakebal) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get('http://localhost:65199/account/lock?nuban=' + nuban + '&mask=' + fakebal, { withCredentials: true }).subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    NudriveProvider.prototype.signup = function (nuban, name, phone, bvn, password) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get('http://localhost:65199/account/signup?nuban=' + nuban + '&name=' + name + '&phone=' + phone + '&balance=0' + '&bvn=' + bvn + '&password=' + password, { withCredentials: true }).subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    NudriveProvider.prototype.transfer = function (source, destination, amount, description) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get('http://localhost:65199/account/transfer?source=' + source + '&destination=' + destination + '&amount=' + amount + '&description=' + description, { withCredentials: true }).subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    NudriveProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], NudriveProvider);
    return NudriveProvider;
}());

//# sourceMappingURL=nudrive.js.map

/***/ }),

/***/ 71:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_myservices_myservices__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__home_home__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__signup_signup__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(86);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, platform, navParams, Service, alertCtrl, loadingCtrl, storage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.navParams = navParams;
        this.Service = Service;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.storage = storage;
        this.loggedin = false;
        this.storage.get('usernamedriver').then(function (data) {
            if (data) {
                _this.loggedin = true;
                console.log("loogedin already" + data);
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_1__home_home__["a" /* HomePage */]);
            }
            else {
                console.log("not logedin");
            }
        });
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    LoginPage.prototype.logmein = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_1__home_home__["a" /* HomePage */]);
    };
    LoginPage.prototype.gotoregister = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__signup_signup__["a" /* SignupPage */]);
        console.log('I was clicked');
    };
    LoginPage.prototype.onsubmitpin = function (loginval) {
        var _this = this;
        // console.log(loginval);
        this.Service.signin(loginval.username, loginval.password).then(function (data) {
            _this.signined = data;
            console.log(_this.signined.Response);
            if (_this.signined.Response == 'Success') {
                _this.presentLoadingDefault();
                _this.loggedin == true;
                _this.storage.set('usernamedriver', loginval.username);
                _this.storage.set('loggedinn', _this.loggedin);
                _this.storage.get('usernamedriver');
                _this.storage.get('loggedinn');
                console.log(_this.local.get('usernamedriver') + ' ' + _this.local.get('loggedinn'));
            }
            else {
                _this.presentAlert();
            }
            //  this.navCtrl.setRoot(HomePage, {'nuban': loginval.username});
            //  if(this.signined.Response == 'Success') {
            //     //use the nuban to fetch user details
            //   this.myservice.fetchcustomer(loginval.username).then(data => {
            //     console.log(data);
            //   });
            //  }
        });
    };
    ;
    LoginPage.prototype.presentAlert = function () {
        var alert = this.alertCtrl.create({
            title: 'Invalid Login',
            subTitle: 'Invalid Username or Password',
            buttons: ['Dismiss']
        });
        alert.present();
    };
    LoginPage.prototype.presentLoadingDefault = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Hang On Tight, Signing you in....'
        });
        loading.present().then(function () {
            loading.dismiss();
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_1__home_home__["a" /* HomePage */]);
        });
        ;
    };
    LoginPage.prototype.closeap = function () {
        this.exit();
    };
    LoginPage.prototype.exit = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Confirm',
            message: 'Do you want to exit?',
            buttons: [{
                    text: "exit?",
                    handler: function () { _this.exitApp(); }
                }, {
                    text: "Cancel",
                    role: 'cancel'
                }]
        });
        alert.present();
    };
    LoginPage.prototype.exitApp = function () {
        this.platform.exitApp();
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"C:\Users\STEELATRAKTS\Documents\IOINCPROJECTS\New folder (2)\NuDriver\src\pages\login\login.html"*/'<!--\n  Generated template for the LoginPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Login</ion-title>\n   <!-- <button ion-buttons (click)="gotoregister()" item-right><ion-icon ios="ios-add" md="md-add"></ion-icon></button> -->\n\n   <ion-buttons end>\n      <button (click)="gotoregister()" ion-button icon-only>SignUp\n          <ion-icon ios="ios-add" md="md-add"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding  class="bg">\n  <div class="loginimg">\nLOGIN\n  </div>\n  <form  id="formNewProduct" name ="formNewProduct" #productData="ngForm" (ngSubmit) = "onsubmitpin(productData.value)">\n    <ion-list class="bgall">\n\n\n        <ion-item>\n          <ion-label>Username</ion-label>\n          <ion-input type="text" name="username" id="user"  required autofocus [(ngModel)]=\'usernamee\'></ion-input>\n        </ion-item>\n\n        <ion-item>\n          <ion-label>Password</ion-label>\n          <ion-input type="password" name="password" id="pass"  required autofocus [(ngModel)]=\'passwordd\'></ion-input>\n        </ion-item>\n\n      </ion-list>\n\n      <div>\n          <button ion-button secondary block type="submit">Sign In</button>\n        <!-- <button ion-button secondary block (click)="logmein()" [disabled]="!closed" type="submit">Sign In</button> -->\n      </div>\n    </form>\n\n<div class="forgotpassword"><span >forgot password --></span></div>\n\'<ion-fab right bottom>\n  <button ion-fab color="danger" (click)=\'closeap()\'><ion-icon name="close"></ion-icon></button>\n</ion-fab>\'\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\STEELATRAKTS\Documents\IOINCPROJECTS\New folder (2)\NuDriver\src\pages\login\login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_0__providers_myservices_myservices__["a" /* MyservicesProvider */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ })

},[291]);
//# sourceMappingURL=main.js.map