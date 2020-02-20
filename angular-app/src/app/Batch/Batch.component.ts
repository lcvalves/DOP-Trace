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

import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BatchService } from './Batch.service';
import 'rxjs/add/operator/toPromise';


import sigma from 'sigma';





//



@Component({
  selector: 'app-batch',
  templateUrl: './Batch.component.html',
  styleUrls: ['./Batch.component.css'],
  providers: [BatchService]
})
export class BatchComponent implements OnInit {

  @Input() public resultGridList : String;

  //-------------------


   private sigma:any;

   
  

 
//----------------------

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


  }

  
  private graph = {

    

    nodes: [
      
      
      {id: "n0", label: "org.doptrace.ProductRegistration#1", x: 0, y: 0, size: 3, color: '#008cc2'},
      {id: "n1", label: "org.doptrace.QualityAssessment#1", x: 3, y: 1, size: 2, color: '#008cc2'},
      {id: "n2", label: "And a last one", x: 1, y: 3, size: 1, color: '#E57821'}
    ],

    edges: [
      {id: "e0", source: "n0", target: "n1", color: '#282c34', type: 'line', size: 0.5},
      {id: "e1", source: "n1", target: "n2", color: '#282c34', type: 'curve', size: 1},
      {id: "e2", source: "n2", target: "n0", color: '#FF0000', type: 'line', size: 2}
    ]

    
  };
  

  ngOnInit(): void {

    this.loadAll();

    

    this.sigma = new sigma(
      {
        renderer: {
          container: document.getElementById("sigma-container"),
          type: 'canvas'
        },
        settings: {}
      }
    );
    this.sigma.graph.read(this.graph);
    this.sigma.refresh();
    console.log(this.sigma)
  
    
  
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

     
  currentDate = new Date()

  addAsset(form: any): Promise<any> {
    this.asset = {
      'id': Math.floor(Math.random() * 1001),
      'amount': this.amount.value,
      'unit': this.unit.value,
      'creationDate': this.currentDate,
      'expirationDate': this.expirationDate.value,
      'state': this.state.value,
      'certificated': this.certificated.value,
      'previousEvents': [''],
      'previousOperator': this.previousOperator.value,
      'currentOperator': this.currentOperator.value,
      'product':'resource:org.doptrace.Product#'+ this.product.value
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
      'creationDate': this.currentDate,
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
