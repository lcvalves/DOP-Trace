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

import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import * as sinon from 'sinon';
import { DataService } from '../data.service';
import { Industry_RetailerComponent } from './Industry_Retailer.component';
import { Industry_RetailerService } from './Industry_Retailer.service';
import { Observable } from 'rxjs'

describe('Industry_RetailerComponent', () => {
  let component: Industry_RetailerComponent;
  let fixture: ComponentFixture<Industry_RetailerComponent>;

  let mockIndustry_RetailerService;
  let mockDataService

  beforeEach(async(() => {

    mockIndustry_RetailerService = sinon.createStubInstance(Industry_RetailerService);
    mockIndustry_RetailerService.getAll.returns([]);
    mockDataService = sinon.createStubInstance(DataService);

    TestBed.configureTestingModule({
      declarations: [ Industry_RetailerComponent ],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule
      ],
      providers: [
        {provide: Industry_RetailerService, useValue: mockIndustry_RetailerService },
        {provide: DataService, useValue: mockDataService },
      ]
    });

    fixture = TestBed.createComponent(Industry_RetailerComponent);
    component = fixture.componentInstance;

  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the table when a Industry_Retailer is added', fakeAsync(() => {
    let loadAllSpy = sinon.stub(component, 'loadAll');
    sinon.stub(component.serviceIndustry_Retailer, 'addAsset').returns(new Observable<any>(observer => {
      observer.next('');
      observer.complete();
    }));

    component.addAsset({});

    tick();
    
    expect(loadAllSpy.callCount).toBe(1);

    loadAllSpy.restore();
  }));

  it('should update the table when a Industry_Retailer is updated', fakeAsync(() => {
    let loadAllSpy = sinon.stub(component, 'loadAll');
    sinon.stub(component.serviceIndustry_Retailer, 'updateAsset').returns(new Observable<any>(observer => {
      observer.next('');
      observer.complete();
    }));

    // mock form to be passed to the update function
    let mockForm = new FormGroup({
      id: new FormControl('id')
    });

    component.updateAsset(mockForm);

    tick();

    expect(loadAllSpy.callCount).toBe(1);

    loadAllSpy.restore();
  }));

  it('should update the table when a Industry_Retailer is deleted', fakeAsync(() => {
    let loadAllSpy = sinon.stub(component, 'loadAll');
    sinon.stub(component.serviceIndustry_Retailer, 'deleteAsset').returns(new Observable<any>(observer => {
      observer.next('');
      observer.complete();
    }));

    component.setId('id');
    
    component.deleteAsset();

    tick();

    expect(loadAllSpy.callCount).toBe(1);

    loadAllSpy.restore();
  }));  

});
