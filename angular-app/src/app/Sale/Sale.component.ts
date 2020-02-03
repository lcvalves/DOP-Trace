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
import { SaleService } from './Sale.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-sale',
  templateUrl: './Sale.component.html',
  styleUrls: ['./Sale.component.css'],
  providers: [SaleService]
})
export class SaleComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  salePrice = new FormControl('', Validators.required);
  newBatch = new FormControl('', Validators.required);
  seller = new FormControl('', Validators.required);
  buyer = new FormControl('', Validators.required);
  amountPerBatch = new FormControl('', Validators.required);
  soldBatches = new FormControl('', Validators.required);
  id = new FormControl('', Validators.required);
  description = new FormControl('', Validators.required);
  latitude = new FormControl('', Validators.required);
  longitude = new FormControl('', Validators.required);
  dateTime = new FormControl('', Validators.required);
  worker = new FormControl('', Validators.required);

  constructor(public serviceSale: SaleService, fb: FormBuilder) {
    this.myForm = fb.group({
      salePrice: this.salePrice,
      newBatch: this.newBatch,
      seller: this.seller,
      buyer: this.buyer,
      amountPerBatch: this.amountPerBatch,
      soldBatches: this.soldBatches,
      id: this.id,
      description: this.description,
      latitude: this.latitude,
      longitude: this.longitude,
      dateTime: this.dateTime,
      worker: this.worker
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceSale.getAll()
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
      $class: 'org.doptrace.Sale',
      'salePrice': this.salePrice.value,
      'newBatch': this.newBatch.value,
      'seller': this.seller.value,
      'buyer': this.buyer.value,
      'amountPerBatch': this.amountPerBatch.value,
      'soldBatches': this.soldBatches.value,
      'id': this.id.value,
      'description': this.description.value,
      'latitude': this.latitude.value,
      'longitude': this.longitude.value,
      'dateTime': this.dateTime.value,
      'worker': this.worker.value
    };

    this.myForm.setValue({
      'salePrice': null,
      'newBatch': null,
      'seller': null,
      'buyer': null,
      'amountPerBatch': null,
      'soldBatches': null,
      'id': null,
      'description': null,
      'latitude': null,
      'longitude': null,
      'dateTime': null,
      'worker': null
    });

    return this.serviceSale.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'salePrice': null,
        'newBatch': null,
        'seller': null,
        'buyer': null,
        'amountPerBatch': null,
        'soldBatches': null,
        'id': null,
        'description': null,
        'latitude': null,
        'longitude': null,
        'dateTime': null,
        'worker': null
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
      $class: 'org.doptrace.Sale',
      'salePrice': this.salePrice.value,
      'newBatch': this.newBatch.value,
      'seller': this.seller.value,
      'buyer': this.buyer.value,
      'amountPerBatch': this.amountPerBatch.value,
      'soldBatches': this.soldBatches.value,
      'description': this.description.value,
      'latitude': this.latitude.value,
      'longitude': this.longitude.value,
      'dateTime': this.dateTime.value,
      'worker': this.worker.value
    };

    return this.serviceSale.updateAsset(form.get('id').value, this.asset)
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

    return this.serviceSale.deleteAsset(this.currentId)
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

    return this.serviceSale.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'salePrice': null,
        'newBatch': null,
        'seller': null,
        'buyer': null,
        'amountPerBatch': null,
        'soldBatches': null,
        'id': null,
        'description': null,
        'latitude': null,
        'longitude': null,
        'dateTime': null,
        'worker': null
      };

      if (result.salePrice) {
        formObject.salePrice = result.salePrice;
      } else {
        formObject.salePrice = null;
      }

      if (result.newBatch) {
        formObject.newBatch = result.newBatch;
      } else {
        formObject.newBatch = null;
      }

      if (result.seller) {
        formObject.seller = result.seller;
      } else {
        formObject.seller = null;
      }

      if (result.buyer) {
        formObject.buyer = result.buyer;
      } else {
        formObject.buyer = null;
      }

      if (result.amountPerBatch) {
        formObject.amountPerBatch = result.amountPerBatch;
      } else {
        formObject.amountPerBatch = null;
      }

      if (result.soldBatches) {
        formObject.soldBatches = result.soldBatches;
      } else {
        formObject.soldBatches = null;
      }

      if (result.id) {
        formObject.id = result.id;
      } else {
        formObject.id = null;
      }

      if (result.description) {
        formObject.description = result.description;
      } else {
        formObject.description = null;
      }

      if (result.latitude) {
        formObject.latitude = result.latitude;
      } else {
        formObject.latitude = null;
      }

      if (result.longitude) {
        formObject.longitude = result.longitude;
      } else {
        formObject.longitude = null;
      }

      if (result.dateTime) {
        formObject.dateTime = result.dateTime;
      } else {
        formObject.dateTime = null;
      }

      if (result.worker) {
        formObject.worker = result.worker;
      } else {
        formObject.worker = null;
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
      'salePrice': null,
      'newBatch': null,
      'seller': null,
      'buyer': null,
      'amountPerBatch': null,
      'soldBatches': null,
      'id': null,
      'description': null,
      'latitude': null,
      'longitude': null,
      'dateTime': null,
      'worker': null
      });
  }

}
