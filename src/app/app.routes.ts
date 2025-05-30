import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import {LocationsComponent} from './locations/locations.component';
import {HomeComponent} from './home/home.component';
import {AddCollectionComponent} from './add-collection/add-collection.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent },
  { path: 'locations', component: LocationsComponent },
  { path: 'home', component: HomeComponent },
  { path: 'add/collection', component: AddCollectionComponent }
];
