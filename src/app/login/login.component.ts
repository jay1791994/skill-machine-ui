import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  userDetails: Map<string, string> = new Map<string, string>();

  username = new FormControl('');
  password = new FormControl('');

  constructor(
    private router: Router,
    private userService: UserServiceService
  ) {}

  login() {
    console.log(this.username.getRawValue());
    console.log(this.password);
    let passwordAssigned: string | undefined | null = '';
    if (this.username.getRawValue() === null) {
      alert('Invalid credentials');
    } else {
      this.userService
        .getUserDetails(this.username.getRawValue() || '')
        .subscribe(
          (data) => {
            this.userService.setCurrentUserDetails(data);

            passwordAssigned = this.userDetails.get(
              <string>this.username.getRawValue()
            );
            console.log('::::', passwordAssigned);

            console.log(this.password.getRawValue());

            if (Object.keys(data).length > 0) {
              if (this.password.getRawValue() === passwordAssigned) {
                console.log('login success');
                this.router.navigate(['/home']);
              } else {
                alert('Invalid credentials');
              }
            }
          },
          (error) => {
            alert('Invalid User');
          }
        );
    }
  }

  ngOnInit(): void {
    this.userDetails.set('admin', 'password');
    this.userDetails.set('admin1', 'password1');
  }
}
