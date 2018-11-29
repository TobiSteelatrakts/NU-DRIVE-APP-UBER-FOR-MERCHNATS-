import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  widget_id = 'ZCKMJ4yuvY';
  d=document;
  w=window;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.navCtrl.pop();
    this.navCtrl.setRoot(HomePage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
    this.loadme();
  }
  ionViewDidLeave() {
    console.log('i left');
    // this.removeElement();
  }

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

  loadme(){

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



}
