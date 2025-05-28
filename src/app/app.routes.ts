import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import {LocationsComponent} from './locations/locations.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent },
  { path: 'locations', component: LocationsComponent }
];
