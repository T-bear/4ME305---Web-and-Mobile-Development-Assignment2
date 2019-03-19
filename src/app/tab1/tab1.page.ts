import { Component, ViewChild } from '@angular/core';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { NavController } from '@ionic/angular';
import io from 'socket.io-client';
const socket = io('http://localhost:3001');

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {
    socket:any;
		user: any;
		name: string;
constructor(private googlePlus: GooglePlus, public navCtrl: NavController) {

}
	 @ViewChild('myNav') nav: NavController

	login() {
		this.googlePlus.login({})
		  .then(res => {
		  	socket.emit('login', res);
				console.log(res);
				this.user = res.email;
		  	 //this.navCtrl.navigateForward('/tabs/tab2');
				this.name = res.username;
				
		  })
		  .catch(err => {
		  	console.error(err)
		  });
	}



}
