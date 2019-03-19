import { Component } from '@angular/core';
import { ImageserviceService } from '../services/imageservice.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

export class Tab3Page {
  savedImgs: any = [];
  constructor(public imageService: ImageserviceService){}

//loading images in the gallery from the image service
  loadImages() {
      this.imageService.getImages().then(result => {
          if (result) {
              this.savedImgs = result;
              for (let i = 0; i < this.savedImgs.length; i++) {
                console.log(this.savedImgs[i]);
              }

          }
      });
  }
    ngOnInit() {
       this.loadImages();
    }
  }