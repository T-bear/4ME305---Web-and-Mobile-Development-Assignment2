import { Component } from '@angular/core';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import io from 'socket.io-client';
const socket = io('http://localhost:3001');
const { Camera } = Plugins;

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

export class Tab3Page {
	image: string;
	savedImg: string;
	userId: any;
	constructor() {}

//Using capacitor to take a photo
	async takePhoto(){
		const result = await Camera.getPhoto({
			quality: 90,
			resultType: CameraResultType.Base64,
			source: CameraSource.Camera
		});
		this.image = result.base64Data;
	}


	saveImage(){
		this.savedImg = this.image;
		const img = {id: 'id', location: 'loc', image: this.savedImg}
		console.log(this.savedImg);
		socket.emit('image', img);	
	}
	ngOnInit() {
		this.takePhoto();		
	}
}
