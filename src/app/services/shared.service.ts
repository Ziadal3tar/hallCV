import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
Router
@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private userData = new BehaviorSubject<any>([]);
  currentUserData = this.userData.asObservable();

  private LoggedIn = new BehaviorSubject<any>([]);
  isLoggedIn = this.LoggedIn.asObservable();
  constructor(private AuthService:AuthService,private Router:Router) { }

  updateUserData() {
    if (localStorage.getItem('userToken')) {
      this.AuthService.getUserData(localStorage.getItem('userToken')).subscribe(
        (data: any) => {
          if (data.userData) {
            this.userData.next(data.userData);
          }

        },
        (err: HttpErrorResponse) => {
          if (
            err.error.message == 'jwt expired' ||
            err.error.message == 'jwt malformed'
          ) {
            localStorage.removeItem('userToken');
            this.Router.navigate([`/register`]);
          }
        }
      );
    }
  }
  isLoggedInFun() {
    if (localStorage.getItem('userToken')) {
      this.LoggedIn.next(true);
    }else{
      this.LoggedIn.next(false);

    }
  }
  // LogIn() {
  //   if (localStorage.getItem('userToken')) {
  //     this.isLoggedIn = true
  //   }
  // }
  // logOut() {
  //   if (localStorage.getItem('userToken')) {
  //     localStorage.removeItem('userToken');
  //     this.isLoggedIn = false
  //   }else{
  //     this.isLoggedIn = false
  //   }
  // }
}
