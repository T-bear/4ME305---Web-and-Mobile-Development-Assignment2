import { Component } from '@angular/core';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';

const { Camera } = Plugins;

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

export class Tab3Page {
	image: any;
	savedImgs: any = [];
	
	constructor() {}
//Using the camera to take a photo
	async takePhoto(){
			const result = await Camera.getPhoto({
			quality: 90,
			resultType: CameraResultType.Base64,
			source: CameraSource.Camera
	});
	this.image = result.base64Data;
	}


}
