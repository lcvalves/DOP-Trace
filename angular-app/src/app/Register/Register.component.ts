import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { RegisterServiceService} from './RegisterService.service';



@Component({
  selector: 'app-Register',
  templateUrl: './Register.component.html',
  styleUrls: ['./Register.component.css'],
  providers:[RegisterServiceService]
})
export class RegisterComponent implements OnInit {

  private authenticated = false;
  private loggedIn = false;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private restService: RegisterServiceService) { }

    private currentUser;

    @ViewChild('signupForm') signupForm;

    private signUp = {
      username: '',
      operator:'',
      password:'',
      firstname: '',
      lastname: '',
      phoneNumber:'',
      email:'',
    };

  ngOnInit() {

    this.route
    .queryParams
    .subscribe((queryParams) => {
      const loggedIn = queryParams['loggedIn'];
      if (loggedIn) {
        this.authenticated = true;
        return this.router.navigate(['/'])
          .then(() => {
            return this.checkWallet();
          });
      }
    });
  }

  checkWallet() {
    return this.restService.checkWallet()
      .then((results) => {
        if (results['length'] > 0) {
          this.loggedIn = true;
          return this.getCurrentUser()
        }
      });
  }

  onSignUp() {
    return this.restService.signUp(this.signUp)
      .then(() => {
        return this.getCurrentUser();
      })
      .then(() => {
        this.loggedIn = true;
      });
  }

  getCurrentUser() {
    return this.restService.getCurrentUser()
      .then((currentUser) => {
        this.currentUser = currentUser;
      });
  }

}
