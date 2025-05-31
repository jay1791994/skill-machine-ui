import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocationServiceService {
  constructor(private http: HttpClient) {}

  getLocations() {
    return this.http.get(
      'http://ec2-3-131-13-236.us-east-2.compute.amazonaws.com:8080/locations'
    );
  }
}
