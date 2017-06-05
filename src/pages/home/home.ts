
import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, ModalController, ViewController, Platform, Nav} from 'ionic-angular';

import {UserData} from "../../providers/user-data";
import {LclBookingPage} from "../lcl-booking/lcl-booking";
import {CourierBookingPage} from "../courier-booking/courier-booking";
import {LoginPage} from "../login-modal/login-modal";
import {AdvertisementProvider} from "../../providers/advertisement/advertisement"

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  bpress: number = 0;
  advertisementHome:any;
  errorMessage:string;
  @ViewChild(Nav) nav:Nav;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public mdlCtrl: ModalController,
              public userData: UserData,
              public viewCtrl:ViewController,
              public platform: Platform,
              public advertisementProvider:AdvertisementProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.advertisementProvider.getHomeAdvertisement().subscribe(
        (res)=> this.advertisementHome = res
        ,(error)=> this.errorMessage = <any>error);
  }

  convertImg(img:string,type:string){
      return "data:"+type+";base64,"+img;
  }

  clickImg(index:string){
      console.log("Index :"+index);
  }

  openPage(page: number) {

    let  view: any;

    if(page == 1){ view = LclBookingPage; }
    else { view = CourierBookingPage; }

    let modal = this.mdlCtrl.create(LoginPage, view);
    this.userData.hasLoggedIn().then((hasLoggedIn) => {
        if (hasLoggedIn === true) { this.navCtrl.push(view); }
        else { modal.present(); }
    });
  }
}
