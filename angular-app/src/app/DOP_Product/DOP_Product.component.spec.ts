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
import { DOP_ProductComponent } from './DOP_Product.component';
import { DOP_ProductService } from './DOP_Product.service';
import { Observable } from 'rxjs'

describe('DOP_ProductComponent', () => {
  let component: DOP_ProductComponent;
  let fixture: ComponentFixture<DOP_ProductComponent>;

  let mockDOP_ProductService;
  let mockDataService

  beforeEach(async(() => {

    mockDOP_ProductService = sinon.createStubInstance(DOP_ProductService);
    mockDOP_ProductService.getAll.returns([]);
    mockDataService = sinon.createStubInstance(DataService);

    TestBed.configureTestingModule({
      declarations: [ DOP_ProductComponent ],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule
      ],
      providers: [
        {provide: DOP_ProductService, useValue: mockDOP_ProductService },
        {provide: DataService, useValue: mockDataService },
      ]
    });

    fixture = TestBed.createComponent(DOP_ProductComponent);
    component = fixture.componentInstance;

  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the table when a DOP_Product is added', fakeAsync(() => {
    let loadAllSpy = sinon.stub(component, 'loadAll');
    sinon.stub(component.serviceDOP_Product, 'addAsset').returns(new Observable<any>(observer => {
      observer.next('');
      observer.complete();
    }));

    component.addAsset({});

    tick();
    
    expect(loadAllSpy.callCount).toBe(1);

    loadAllSpy.restore();
  }));

  it('should update the table when a DOP_Product is updated', fakeAsync(() => {
    let loadAllSpy = sinon.stub(component, 'loadAll');
    sinon.stub(component.serviceDOP_Product, 'updateAsset').returns(new Observable<any>(observer => {
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

  it('should update the table when a DOP_Product is deleted', fakeAsync(() => {
    let loadAllSpy = sinon.stub(component, 'loadAll');
    sinon.stub(component.serviceDOP_Product, 'deleteAsset').returns(new Observable<any>(observer => {
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
