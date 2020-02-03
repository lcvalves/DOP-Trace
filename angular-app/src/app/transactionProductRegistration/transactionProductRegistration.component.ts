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
import { transactionProductRegistrationService } from './transactionProductRegistration.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-transactionproductregistration',
  templateUrl: './transactionProductRegistration.component.html',
  styleUrls: ['./transactionProductRegistration.component.css'],
  providers: [transactionProductRegistrationService]
})
export class transactionProductRegistrationComponent implements OnInit {

  myForm: FormGroup;

  private allTransactions;
  private Transaction;
  private currentId;
  private errorMessage;

  transactionId = new FormControl('', Validators.required);
  timestamp = new FormControl('', Validators.required);

  id = new FormControl('', Validators.required);
  operator = new FormControl('', Validators.required);
  description = new FormControl('', Validators.required);
  latitude = new FormControl('', Validators.required);
  longitude = new FormControl('', Validators.required);
  dateTime = new FormControl('', Validators.required);
  worker = new FormControl('', Validators.required);

  //Batch Stuff
  batchId = new FormControl('', Validators.required);
  batchAmount= new FormControl('', Validators.required);
  batchUnit= new FormControl('', Validators.required);
  batchCreation = new FormControl('', Validators.required);
  batchExp = new FormControl('', Validators.required);
  batchState = new FormControl('', Validators.required);
  batchCert = new FormControl('', Validators.required);
  batchPrevEven = new FormControl('', Validators.required);
  batchPrevOp = new FormControl('', Validators.required);
  batchCurrOp = new FormControl('', Validators.required);
  batchProduct = new FormControl('', Validators.required);
  //





  constructor(private servicetransactionProductRegistration: transactionProductRegistrationService, fb: FormBuilder) {
    this.myForm = fb.group({

      transactionId : this.transactionId,
      timestamp: this.timestamp,

      id: this.id,
      operator:this.operator,
      description:this.description,
      latitude: this.latitude,
      longitude: this.longitude,
      dateTime: this.dateTime,
      worker: this.worker,

      //Batch Stuff
      batchId: this.batchId,
      batchAmount:this.batchAmount,
      batchUnit:this.batchUnit,
      batchCreation: this.batchCreation,
      batchExp:this.batchExp,
      batchState:this.batchState,
      batchCert:this.batchCert,
      batchPrevEven:this.batchPrevEven,
      batchPrevOp:this.batchPrevOp,
      batchCurrOp:this.batchCurrOp,
      batchProduct:this.batchProduct

    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.servicetransactionProductRegistration.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(transaction => {
        tempList.push(transaction);
      });
      this.allTransactions = tempList;
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

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the transaction field to update
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
   * only). This is used for checkboxes in the transaction updateDialog.
   * @param {String} name - the name of the transaction field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified transaction field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addTransaction(form: any): Promise<any> {
    this.Transaction = {
      $class: "org.doptrace.transactionProductRegistration",
    "productRegistration": {
      $class: "org.doptrace.ProductRegistration",
      "newBatch": {
        $class: "org.doptrace.Batch",
        "id": 'ola',//this.batchId.value,
        "amount": 10,
        "unit": 'KG',
        "creationDate": '2020-02-02T02:00:51.685Z',
        "expirationDate": '2020-05-02T02:00:51.685Z',
        "state": 'REGISTERED',
        "certificated": false,
        "previousEvents": ['resource:org.doptrace.ProductRegistration#4424'],
        "previousOperator": this.batchPrevOp.value,
        "currentOperator": 'resource:org.doptrace.Producer#PROD_001',
        "product":'resource:org.doptrace.Product#1',
      },
      "operator":'resource:org.doptrace.Producer#PROD_001',
      "id":'PROD_REG3',
      "description": 'THIS IS PROD REGISTRY 3',
      "latitude": 10,
      "longitude": 10,
      "dateTime": '2020-02-02T02:00:51.685Z',

      "worker": 'resource:org.doptrace.Worker#joselima',
    },
    "transactionId": this.transactionId.value,
    "timestamp": this.timestamp.value
  };

    this.myForm.setValue({
      
      'transactionId' : null,
      'timestamp': null,
      'id': null,
      'operator':null,
      'description':null,
      'latitude': null,
      'longitude': null,
      'dateTime': null,
      'worker': null,

      //Batch Stuff
      'batchId':null ,
      'batchUnit':null,
      'batchAmount':null,
      'batchCreation': null,
      'batchExp':null,
      'batchState':null,
      'batchCert':null,
      'batchPrevEven':null,
      'batchPrevOp':null,
      'batchCurrOp':null,
      'batchProduct':null
    });

    return this.servicetransactionProductRegistration.addTransaction(this.Transaction)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({

      'transactionId' : null,
      'timestamp': null,

      'id': null,
      'description':null,
      'latitude': null,
      'longitude': null,
      'dateTime': null,
      'worker': null,

      //Batch Stuff
      'batchId':null ,
      'batchAmount':null,
      'batchUnit':null,
      'batchCreation': null,
      'batchExp':null,
      'batchState':null,
      'batchCert':null,
      'batchPrevEven':null,
      'batchPrevOp':null,
      'batchCurrOp':null,
      'batchProduct':null
      });
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
        this.errorMessage = error;
      }
    });
  }

  
  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.servicetransactionProductRegistration.getTransaction(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
      'transactionId' : null,
      'timestamp': null,

      'id': null,
      'operator':null,
      'description':null,
      'latitude': null,
      'longitude': null,
      'dateTime': null,
      'worker': null,

      //Batch Stuff
      'batchId':null ,
      'batchAmount':null,
      'batchUnit':null,
      'batchCreation': null,
      'batchExp':null,
      'batchState':null,
      'batchCert':null,
      'batchPrevEven':null,
      'batchPrevOp':null,
      'batchCurrOp':null,
      'batchProduct':null
      };

      

      if (result.transactionId) {
        formObject.transactionId = result.transactionId;
      } else {
        formObject.transactionId = null;
      }

      if (result.timestamp) {
        formObject.timestamp = result.timestamp;
      } else {
        formObject.timestamp = null;
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
      'transactionId' : null,
      'timestamp': null,

      'id': null,
      'description':null,
      'latitude': null,
      'longitude': null,
      'dateTime': null,
      'worker': null,
      'operator':null,

      //Batch Stuff
      'batchId':null,
      'batchUnit':null,
      'batchAmount':null,
      'batchCreation': null,
      'batchExp':null,
      'batchState':null,
      'batchCert':null,
      'batchPrevEven':null,
      'batchPrevOp':null,
      'batchCurrOp':null,
      'batchProduct':null
    });
  }
}
