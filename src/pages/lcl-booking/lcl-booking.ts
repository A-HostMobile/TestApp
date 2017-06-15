import {Component, ViewChild} from '@angular/core';
import {ModalController, Navbar, NavController, NavParams, ViewController} from 'ionic-angular';
import {LclSummaryPage} from "../lcl-summary/lcl-summary";
import {LoginPage} from "../login-modal/login-modal";
import {UserData} from "../../providers/user-data";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'page-lcl-booking',
  templateUrl: 'lcl-booking.html',
})
export class LclBookingPage {
  @ViewChild(Navbar) navbar : Navbar;
  lcl:{pod?:string,myDate?:string,volume?:string,gw?:string,gwtk?:string,commodity?:string,adetail?:string,quantity?:string} = {};
  submitted = false;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public mdlCtrl: ModalController,
              public userData: UserData) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LclBookingPage');
  }

  ionViewCanEnter(){
    let modal = this.mdlCtrl.create(LoginPage, LclBookingPage);
    this.userData.hasLoggedIn().then((hasLoggedIn) => {
      if (hasLoggedIn === true) { return true; }
      else { this.navCtrl.pop(); modal.present(); return false; }
    });
  }

  toSummary(form: NgForm){
    this.submitted = true;
    if(form.valid){
      console.log('YES');
    } else {
      console.log('FUCK');
    }
    //this.navCtrl.push(LclSummaryPage);
  }
}
