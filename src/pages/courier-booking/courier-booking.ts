import {Component, ViewChild} from '@angular/core';
import {Navbar, NavController, NavParams, ViewController, ModalController, Events} from 'ionic-angular';
import {UserData} from "../../providers/user-data";
import {LoginPage} from "../login-modal/login-modal";
import {CourierBooking2Page} from "../courier-booking2/courier-booking2";
import {PickupAddressPage} from "../pickup-address/pickup-address";
import {AuthServiceProvider} from '../../providers/auth-service/auth-service';
import {NgForm} from "@angular/forms";

export interface cvalue{
  co:string;cname:string;
}
@Component({
  selector: 'page-courier-booking',
  templateUrl: 'courier-booking.html',
})
export class CourierBookingPage {

  @ViewChild(Navbar) navbar: Navbar;
  pickadd:string = null;
  submitted: boolean = false;
  countries:cvalue[]=[{co:'US',cname:'United State'},
             {co:'HK',cname:'Hongkong'},
             {co:'JP',cname:'Japan'}];
  courier:{pick?:string,
    conname?:string,
    address?:string,
    country?:string,
    zip?:string,
    contname?:string,
    tel?:string,
    rmk?:string} = {country:'US'};
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public mdlCtrl: ModalController,
              public userData: UserData,
              public events: Events
            ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CourierBookingPage');
  }

  ionViewCanEnter(){
    let modal = this.mdlCtrl.create(LoginPage, CourierBookingPage);
    this.userData.hasLoggedIn().then((hasLoggedIn) => {
      if (hasLoggedIn === true) { return true; }
      else { this.navCtrl.pop(); modal.present(); return false; }
    });
  }

  toCourier2(form: NgForm){
    this.submitted = true;
    if(form.valid) {
          console.log(this.courier);
          this.navCtrl.push(CourierBooking2Page, this.courier);
    }
  }

  openPickupModal(){
    let openPickup = this.mdlCtrl.create(PickupAddressPage);
    openPickup.present();
    openPickup.onDidDismiss(data=>{
      if(data!=null){
        this.courier.pick = this.pickadd = data;
      }
    });
  }

}
