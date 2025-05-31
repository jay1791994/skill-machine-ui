import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LocationDomain} from '../models/location';
import {NgForOf, NgIf} from '@angular/common';
import {Address} from '../models/address';

@Component({
  selector: 'app-locations',
  imports: [ReactiveFormsModule, FormsModule, NgForOf],
  templateUrl: './locations.component.html',
  styleUrl: './locations.component.css'
})
export class LocationsComponent implements OnInit {


    locations: LocationDomain[] = [

    ];

    ngOnInit(): void {
       let location = new LocationDomain();
       location.locationId =1;

       let address = new Address();
       address.streetName = "1528 Lynn Drive";
       address.city = "Wyllie";

       location.address = address;

       this.locations.push(location);

    }


  addCollectionForLocation() {
     console.log(this.locations);
  }
}
