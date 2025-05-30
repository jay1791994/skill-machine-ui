import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private router: Router) {}

   addLocation() {

   }

   addOwner() {

   }

  addCollection() {

    console.log("routing to collection")
    this.router.navigate(['/add/collection']);
   }
}
