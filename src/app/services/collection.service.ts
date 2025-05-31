import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CashCollectionRequest } from '../models/collection';

@Injectable({
  providedIn: 'root',
})
export class CollectionService {
  constructor(private http: HttpClient) {}

  addCollection(collectionDetails: CashCollectionRequest) {
    return this.http.post(
      'http://ec2-3-131-13-236.us-east-2.compute.amazonaws.com:8080/collection',
      collectionDetails
    );
  }
}
