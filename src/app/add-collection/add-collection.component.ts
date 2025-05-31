import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgFor, NgForOf, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { CashCollection, CashCollectionRequest } from '../models/collection';
import { LocationDomain } from '../models/location';
import { MachineCollection } from '../models/machine-collection';
import { CollectionService } from '../services/collection.service';
import { LocationServiceService } from '../services/location-service.service';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-add-collection',
  imports: [FormsModule, ReactiveFormsModule, NgIf, NgFor, NgForOf],
  templateUrl: './add-collection.component.html',
  styleUrl: './add-collection.component.css',
})
export class AddCollectionComponent implements OnInit {
  // @ts-ignore

  locationName = new FormControl('');
  cashHandedOverToOwner: boolean = false;
  cashHandedOverTo: string = '';
  locations: Array<LocationDomain> = [
    {
      locationId: 1,
      address: {
        streetName: '1528 Lynn Drive',
        city: 'Wylie',
      },
    },
  ];
  startdate: Date | undefined;
  enddate: Date | undefined;
  amount: number = 0;
  showMachineCollectionFormView: boolean = false;
  machineCollections: Array<any> = [];
  totalAmountCollected: number = 0;
  ownerShareRate: number = 0;
  ownerShareAmount: number = this.totalAmountCollected * this.ownerShareRate;
  vendorShareRate: number = 0;
  vendorShareAmount: number = this.totalAmountCollected * this.vendorShareRate;
  location: LocationDomain = new LocationDomain();

  constructor(
    private locationService: LocationServiceService,
    private userService: UserServiceService,
    private collectionsService: CollectionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.locationService.getLocations().subscribe(
      (data: any) => {
        this.locations = data;
        console.log('::::', this.locations);
      },
      (error) => {
        console.log('error::::', error);
      }
    );
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
    let draftCollection = new CashCollectionRequest();

    draftCollection.locationId = this.location.locationId;
    draftCollection.userName = this.userService.currentUser.userName;
    draftCollection.cashHandedOverTo = this.cashHandedOverTo;
    draftCollection.ownerShareAmount = this.ownerShareAmount;
    draftCollection.totalAmount = this.totalAmountCollected;
    draftCollection.vendorShareAmount = this.vendorShareAmount;
    draftCollection.cashHandedOverToOwner = this.cashHandedOverToOwner;
    draftCollection.machineCollections = this.machineCollections;

    console.log('cash collection added', draftCollection);
    this.collectionsService.addCollection(draftCollection).subscribe(
      (data: CashCollection) => {
        if (data.collectionId && data.collectionId.trim() !== '') {
          this.router.navigate(['/home']);
        }
      },
      (error) => {
        alert('Please try again later!');
      }
    );
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
    this.totalAmountCollected =
      this.totalAmountCollected + machineCollection.amount;
    this.updateShareAmount();

    this.machineCollections.push(machineCollection);
    console.log(machineCollection);

    this.startdate = undefined;
    this.enddate = undefined;
    this.amount = 0;
  }

  updateShareAmount() {
    this.ownerShareAmount = this.totalAmountCollected * this.ownerShareRate;
    this.vendorShareAmount = this.totalAmountCollected * this.vendorShareRate;
  }

  resetCollectionData() {
    this.machineCollections = [];
    this.totalAmountCollected = 0;
    this.updateShareAmount();
  }

  deletemachine(i: number) {
    let machineCollection = this.machineCollections[i];
    this.machineCollections.splice(i, 1);
    this.totalAmountCollected =
      this.totalAmountCollected - machineCollection.amount;
    this.updateShareAmount();
  }

  onLocationSelect(event: any) {
    const selectedIndex = event.target.options.selectedIndex;
    if (selectedIndex > 0) {
      const selectedLocation = this.locations[selectedIndex - 1];
      this.location = selectedLocation;
      this.ownerShareRate = (selectedLocation.ownerSplitShare || 0) / 100;
      this.vendorShareRate = 1 - this.ownerShareRate;
      this.updateShareAmount();
    } else {
      this.resetCollectionData();
      this.location = {};
    }
  }
}
