import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

interface Location {
  latitude: string;
  longitude: string;
}

@Injectable({
  providedIn: 'root'
})
export class MapsService {

  constructor(private http: HttpClient) { }

  getLocation() {
    return this.http.get<Location>('http://api.ipapi.com/check?access_key=756b800cd942342960e3bf62ce88dc88')
  }
}
