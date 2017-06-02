import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, ModalController, ViewController, Platform, ToastController, Nav} from 'ionic-angular';

import {UserData} from "../../providers/user-data";
import {LclBookingPage} from "../lcl-booking/lcl-booking";
import {CourierBookingPage} from "../courier-booking/courier-booking";
import {LoginPage} from "../login-modal/login-modal";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  bpress: number = 0;
  @ViewChild(Nav) nav:Nav;
  private unregisterCustomBackActionFunction: any;
  modal:any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public mdlCtrl: ModalController,
              public userData: UserData,
              public viewCtrl:ViewController,
              public platform: Platform,
              public toastCtrl: ToastController) {

  }
  ionViewDidEnter(){
    this.platform.ready().then(() => {
      this.unregisterCustomBackActionFunction = this.platform.registerBackButtonAction(() => {
        let activeView: ViewController = this.navCtrl.getActive();

        if (activeView != null && (<any> activeView).instance instanceof HomePage){
            this.exit();
/*          } else {
            this.viewCtrl.dismiss();
          }*/
        }else{
          this.navCtrl.pop();
        }
      })
    })
  }
  exit(){
    let toast = this.toastCtrl.create({message:'Press back button again to exit',duration:2000,position: 'bottom'});
    toast.present();
    this.bpress++;
    setTimeout(()=>{
      this.bpress=0;
    },2000);
    if(this.bpress==2){
      this.platform.exitApp();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  openPage(page: number) {

    let  view: any;

    if(page == 1){
      view = LclBookingPage;
    }
    else {
      view = CourierBookingPage
    }
    let modal = this.mdlCtrl.create(LoginPage, view);
    if (this.userData.hasLoggedIn().then((hasLoggedIn) => {
        if (hasLoggedIn === true) {
          this.navCtrl.push(view);
        } else {
          modal.present();
        }
      })) {
    }
  }
}
