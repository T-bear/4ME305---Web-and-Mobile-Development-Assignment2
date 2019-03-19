import { Component } from '@angular/core';
import { MapsService } from '../services/map.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  lat: string = '';
  lng: string = '';

  location : Object;

  constructor( private map: MapsService ) {
  
  }

  ngOnInit(){ 
    this.map.getLocation().subscribe(data => {
      console.log(data);
      this.lat = data.latitude;
      this.lng = data.longitude;
    })
  }

}