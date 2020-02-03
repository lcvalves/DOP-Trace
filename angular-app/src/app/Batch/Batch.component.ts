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
import { BatchService } from './Batch.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-batch',
  templateUrl: './Batch.component.html',
  styleUrls: ['./Batch.component.css'],
  providers: [BatchService]
})
export class BatchComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  id = new FormControl('', Validators.required);
  amount = new FormControl('', Validators.required);
  unit = new FormControl('', Validators.required);
  creationDate = new FormControl('', Validators.required);
  expirationDate = new FormControl('', Validators.required);
  state = new FormControl('', Validators.required);
  certificated = new FormControl('', Validators.required);
  previousEvents = new FormControl('', Validators.required);
  previousOperator = new FormControl('', Validators.required);
  currentOperator = new FormControl('', Validators.required);
  product = new FormControl('', Validators.required);

  constructor(public serviceBatch: BatchService, fb: FormBuilder) {
    this.myForm = fb.group({
      id: this.id,
      amount: this.amount,
      unit: this.unit,
      creationDate: this.creationDate,
      expirationDate: this.expirationDate,
      state: this.state,
      certificated: this.certificated,
      previousEvents: this.previousEvents,
      previousOperator: this.previousOperator,
      currentOperator: this.currentOperator,
      product: this.product
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceBatch.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
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
   * @param {String} name - the name of the asset field to update
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
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

     
  

  addAsset(form: any): Promise<any> {
    this.asset = {
      'id':this.id.value,
      'amount': this.amount.value,
      'unit': this.unit.value,
      'creationDate': '2020-02-01T04:08:00.000Z',
      'expirationDate': '2020-02-01T04:08:00.000Z',
      'state': this.state.value,
      'certificated': this.certificated.value,
      'previousEvents': [this.previousEvents.value],
      'previousOperator': this.previousOperator.value,
      'currentOperator': this.currentOperator.value,
      'product':'resource:org.doptrace.Product#'+this.product.value
    };

    this.myForm.setValue({
      'id': null,
      'amount': null,
      'unit': null,
      'creationDate': null,
      'expirationDate': null,
      'state': null,
      'certificated': null,
      'previousEvents': null,
      'previousOperator': null,
      'currentOperator': null,
      'product': null
    });
    

    return this.serviceBatch.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'id': null,
        'amount': null,
        'unit': null,
        'creationDate': null,
        'expirationDate': null,
        'state': null,
        'certificated': null,
        'previousEvents': null,
        'previousOperator': null,
        'currentOperator': null,
        'product': null
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


  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.doptrace.Batch',
      'amount': this.amount.value,
      'unit': this.unit.value,
      'creationDate': this.creationDate.value,
      'expirationDate': this.expirationDate.value,
      'state': this.state.value,
      'certificated': this.certificated.value,
      'previousEvents': this.previousEvents.value,
      'previousOperator': this.previousOperator.value,
      'currentOperator': this.currentOperator.value,
      'product': this.product.value
    };

    return this.serviceBatch.updateAsset(form.get('id').value, this.asset)
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


  deleteAsset(): Promise<any> {

    return this.serviceBatch.deleteAsset(this.currentId)
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

    return this.serviceBatch.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'id': null,
        'amount': null,
        'unit': null,
        'creationDate': null,
        'expirationDate': null,
        'state': null,
        'certificated': null,
        'previousEvents': null,
        'previousOperator': null,
        'currentOperator': null,
        'product': null
      };

      if (result.id) {
        formObject.id = result.id;
      } else {
        formObject.id = null;
      }

      if (result.amount) {
        formObject.amount = result.amount;
      } else {
        formObject.amount = null;
      }

      if (result.unit) {
        formObject.unit = result.unit;
      } else {
        formObject.unit = null;
      }

      if (result.creationDate) {
        formObject.creationDate = result.creationDate;
      } else {
        formObject.creationDate = null;
      }

      if (result.expirationDate) {
        formObject.expirationDate = result.expirationDate;
      } else {
        formObject.expirationDate = null;
      }

      if (result.state) {
        formObject.state = result.state;
      } else {
        formObject.state = null;
      }

      if (result.certificated) {
        formObject.certificated = result.certificated;
      } else {
        formObject.certificated = null;
      }

      if (result.previousEvents) {
        formObject.previousEvents = result.previousEvents;
      } else {
        formObject.previousEvents = null;
      }

      if (result.previousOperator) {
        formObject.previousOperator = result.previousOperator;
      } else {
        formObject.previousOperator = null;
      }

      if (result.currentOperator) {
        formObject.currentOperator = result.currentOperator;
      } else {
        formObject.currentOperator = null;
      }

      if (result.product) {
        formObject.product = result.product;
      } else {
        formObject.product = null;
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
      'id': null,
      'amount': null,
      'unit': null,
      'creationDate': null,
      'expirationDate': null,
      'state': null,
      'certificated': null,
      'previousEvents': null,
      'previousOperator': null,
      'currentOperator': null,
      'product': null
      });
  }

}
