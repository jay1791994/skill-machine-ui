import {Component, OnInit} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';

import {LocationDomain} from '../models/location';
import {NgFor, NgForOf, NgIf} from '@angular/common';
import {MachineCollection} from '../models/machine-collection';
import {Address} from '../models/address';


@Component({
  selector: 'app-add-collection',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf, NgFor, NgForOf
  ],
  templateUrl: './add-collection.component.html',
  styleUrl: './add-collection.component.css'
})
export class AddCollectionComponent implements OnInit {

  // @ts-ignore

  locationName = new FormControl('');
  cashHandedOverToOwner = new FormControl("");
  cashHandedOverTo = new FormControl("");
  locations = new Array<LocationDomain>();
  startdate : Date | undefined;
  enddate : Date | undefined;
  amount : number | undefined;
  showMachineCollectionFormView : boolean = false;
  machineCollections : Array<any> = [];
  totalAmountCollected : number = 0;
  ownerShareAmount : number = this.totalAmountCollected * 0.70;
  vendorShareAmount : number = this.totalAmountCollected * 0.30;
  location : LocationDomain | undefined;


  constructor() {

  }

  ngOnInit(): void {

    let location = new LocationDomain();
    location.locationId =1;

    let address = new Address();
    address.streetName = "1528 Lynn Drive";
    address.city = "Wyllie";

    location.address = address;

    let location1 = new LocationDomain();
    location1.locationId =1;

    let address1 = new Address();
    address1.streetName = "Wylie Drive";
    address1.city = "Murphy";

    location1.address = address1;

    this.locations.push(location);
    this.locations.push(location1);

  }

  onSubmit(): void {
    // @ts-ignore
    if (this.cashCollectionForm.valid) {
      // @ts-ignore
      console.log(this.cashCollectionForm.value);
    } else {
      console.log('Form is invalid');
    }
  }


  saveCashCollection() {
    console.log("cash collection added")
  }

  showMachineCollectionForm() {
    this.showMachineCollectionFormView = true;
  }

  hideMachineCollectionForm() {
    this.showMachineCollectionFormView = false;
  }

  submitCollectionDetail() {
    this.showMachineCollectionFormView = false;
    let machineCollection = new MachineCollection();
    machineCollection.startDate = this.startdate;
    machineCollection.endDate = this.enddate;
    machineCollection.amount = this.amount;

    // @ts-ignore
    this.totalAmountCollected = this.totalAmountCollected + machineCollection.amount;
    this.updateShareAmount(this.totalAmountCollected);

    this.machineCollections.push(machineCollection);
    console.log(machineCollection);

    this.startdate = undefined;
    this.enddate = undefined;
    this.amount = 0;

  }

  updateShareAmount(totalAmount : number) {
       this.ownerShareAmount = totalAmount * 0.70;
       this.vendorShareAmount = totalAmount * 0.30;
  }


  resetCollectionData() {
      this.machineCollections = [];
      this.totalAmountCollected = 0;
      this.updateShareAmount(this.totalAmountCollected);
  }

  deletemachine(i: number) {
    let machineCollection = this.machineCollections[i];
    this.machineCollections.splice(i, 1);
    this.totalAmountCollected = this.totalAmountCollected - machineCollection.amount;
    this.updateShareAmount(this.totalAmountCollected);
  }
}


/*
{

  "locationId": 1,
  "userId": 1,
  "totalAmount": 300,
  "ownerShareAmount": 0.0,
  "cashHandedOverToOwner": false,
  "cashHandedOverTo": "",
  "machineCollections": [
  {
    "startDate": "3925-03-04T06:00:00.000+00:00",
    "endDate": "3925-03-04T06:00:00.000+00:00",
    "amount": 200.0
  },
  {
    "startDate": "3925-03-04T06:00:00.000+00:00",
    "endDate": "3925-03-04T06:00:00.000+00:00",
    "amount": 400.0
  }
],
  "vendorShareAmount": 0.0
}*/
