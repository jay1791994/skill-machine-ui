import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  constructor(private http: HttpClient) {}
  //@ts-ignore

  currentUser: User;

  getUserDetails(userName: String) {
    return this.http.get(
      'http://ec2-3-131-13-236.us-east-2.compute.amazonaws.com:8080/user/' +
        userName
    );
  }

  setCurrentUserDetails(user: User) {
    this.currentUser = user;
    console.log('setting current user:::', this.currentUser);
  }

  getUser() {
    return this.currentUser;
  }
}
