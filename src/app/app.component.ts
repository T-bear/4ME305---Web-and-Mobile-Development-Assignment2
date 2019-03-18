import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { MapsService } from 'src/app/services/map.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  lat: string = '';
  lng: string = '';

  location : Object;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private map: MapsService
  ) {
    this.initializeApp();
  }

  ngOnInit(){
    this.map.getLocation().subscribe(data => {
      console.log(data);
      this.lat = data.latitude;
      this.lng = data.longitude;
    })}

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
