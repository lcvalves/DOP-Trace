/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { SysAdminService } from './SysAdmin.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-sysadmin',
  templateUrl: './SysAdmin.component.html',
  styleUrls: ['./SysAdmin.component.css'],
  providers: [SysAdminService]
})
export class SysAdminComponent implements OnInit {

  myForm: FormGroup;

  private allParticipants;
  private participant;
  private currentId;
  private errorMessage;

  username = new FormControl('', Validators.required);
  firstname = new FormControl('', Validators.required);
  lastname = new FormControl('', Validators.required);
  password = new FormControl('', Validators.required);
  phoneNumber = new FormControl('', Validators.required);
  email = new FormControl('', Validators.required);


  constructor(public serviceSysAdmin: SysAdminService, fb: FormBuilder) {
    this.myForm = fb.group({
      username: this.username,
      firstname: this.firstname,
      lastname: this.lastname,
      password: this.password,
      phoneNumber: this.phoneNumber,
      email: this.email
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceSysAdmin.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(participant => {
        tempList.push(participant);
      });
      this.allParticipants = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the participant field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the participant updateDialog.
   * @param {String} name - the name of the participant field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified participant field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addParticipant(form: any): Promise<any> {
    this.participant = {
      $class: 'org.doptrace.SysAdmin',
      'username': this.username.value,
      'firstname': this.firstname.value,
      'lastname': this.lastname.value,
      'password': this.password.value,
      'phoneNumber': this.phoneNumber.value,
      'email': this.email.value
    };

    this.myForm.setValue({
      'username': null,
      'firstname': null,
      'lastname': null,
      'password': null,
      'phoneNumber': null,
      'email': null
    });

    return this.serviceSysAdmin.addParticipant(this.participant)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'username': null,
        'firstname': null,
        'lastname': null,
        'password': null,
        'phoneNumber': null,
        'email': null
      });
      this.loadAll(); 
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
        this.errorMessage = error;
      }
    });
  }


   updateParticipant(form: any): Promise<any> {
    this.participant = {
      $class: 'org.doptrace.SysAdmin',
      'firstname': this.firstname.value,
      'lastname': this.lastname.value,
      'password': this.password.value,
      'phoneNumber': this.phoneNumber.value,
      'email': this.email.value
    };

    return this.serviceSysAdmin.updateParticipant(form.get('username').value, this.participant)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }


  deleteParticipant(): Promise<any> {

    return this.serviceSysAdmin.deleteParticipant(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceSysAdmin.getparticipant(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'username': null,
        'firstname': null,
        'lastname': null,
        'password': null,
        'phoneNumber': null,
        'email': null
      };

      if (result.username) {
        formObject.username = result.username;
      } else {
        formObject.username = null;
      }

      if (result.firstname) {
        formObject.firstname = result.firstname;
      } else {
        formObject.firstname = null;
      }

      if (result.lastname) {
        formObject.lastname = result.lastname;
      } else {
        formObject.lastname = null;
      }

      if (result.password) {
        formObject.password = result.password;
      } else {
        formObject.password = null;
      }

      if (result.phoneNumber) {
        formObject.phoneNumber = result.phoneNumber;
      } else {
        formObject.phoneNumber = null;
      }

      if (result.email) {
        formObject.email = result.email;
      } else {
        formObject.email = null;
      }

      this.myForm.setValue(formObject);
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });

  }

  resetForm(): void {
    this.myForm.setValue({
      'username': null,
      'firstname': null,
      'lastname': null,
      'password': null,
      'phoneNumber': null,
      'email': null
    });
  }
}
