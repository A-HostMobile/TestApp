import {Component, ViewChild} from '@angular/core';
import {ModalController, Navbar, NavController, NavParams, ViewController} from 'ionic-angular';
import {LclSummaryPage} from "../lcl-summary/lcl-summary";
import {LoginPage} from "../login-modal/login-modal";
import {UserData} from "../../providers/user-data";
import {AuthServiceProvider} from '../../providers/auth-service/auth-service';

import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";


@Component({
  selector: 'page-lcl-booking',
  templateUrl: 'lcl-booking.html',
})
export class LclBookingPage {
  @ViewChild(Navbar) navbar : Navbar;
  lcl:{pod?:string,myDate?:string,volume?:string,gw?:string,gtype?:string,commodity?:string,adetail?:string,quantity?:string,qtype?:string} = {};
  submitted = false;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public mdlCtrl: ModalController,
              public userData: UserData,
              public authService: AuthServiceProvider
            ) {}


  ionViewWillEnter() {
    this.lcl = {pod:'TH',gtype:'ton',commodity:'ct',qtype:'ea'};
  }

  ionViewCanEnter(){
    let modal = this.mdlCtrl.create(LoginPage, LclBookingPage);
    this.userData.hasLoggedIn().then((hasLoggedIn) => {
      if (hasLoggedIn === true) { console.log('login from lcl'); return true; }
      else { console.log('false lcl'); this.navCtrl.pop(); modal.present(); return false; }
    });
  }

  CheckSts(form: NgForm){
    this.authService.getProfile().subscribe((res)=>{
      let profile = res;
      if(profile.responseCode == 3){
        this.userData.logout();
        console.log('logOut from lcl booking');
      }else{
        this.toSummary(form);
        console.log('loggedIn from lcl booking');
      }
    });
  }

  toSummary(form: NgForm){
    this.submitted = true;
    if(form.valid){
      console.log(this.lcl);
      //this.navCtrl.push(LclSummaryPage);
    } else {
      console.log('FUCK Form not finish');
    }
  }
}
