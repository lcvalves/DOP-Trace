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
import { QualityAssessmentComponent } from './QualityAssessment.component';
import { QualityAssessmentService } from './QualityAssessment.service';
import { Observable } from 'rxjs'

describe('QualityAssessmentComponent', () => {
  let component: QualityAssessmentComponent;
  let fixture: ComponentFixture<QualityAssessmentComponent>;

  let mockQualityAssessmentService;
  let mockDataService

  beforeEach(async(() => {

    mockQualityAssessmentService = sinon.createStubInstance(QualityAssessmentService);
    mockQualityAssessmentService.getAll.returns([]);
    mockDataService = sinon.createStubInstance(DataService);

    TestBed.configureTestingModule({
      declarations: [ QualityAssessmentComponent ],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule
      ],
      providers: [
        {provide: QualityAssessmentService, useValue: mockQualityAssessmentService },
        {provide: DataService, useValue: mockDataService },
      ]
    });

    fixture = TestBed.createComponent(QualityAssessmentComponent);
    component = fixture.componentInstance;

  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the table when a QualityAssessment is added', fakeAsync(() => {
    let loadAllSpy = sinon.stub(component, 'loadAll');
    sinon.stub(component.serviceQualityAssessment, 'addAsset').returns(new Observable<any>(observer => {
      observer.next('');
      observer.complete();
    }));

    component.addAsset({});

    tick();
    
    expect(loadAllSpy.callCount).toBe(1);

    loadAllSpy.restore();
  }));

  it('should update the table when a QualityAssessment is updated', fakeAsync(() => {
    let loadAllSpy = sinon.stub(component, 'loadAll');
    sinon.stub(component.serviceQualityAssessment, 'updateAsset').returns(new Observable<any>(observer => {
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

  it('should update the table when a QualityAssessment is deleted', fakeAsync(() => {
    let loadAllSpy = sinon.stub(component, 'loadAll');
    sinon.stub(component.serviceQualityAssessment, 'deleteAsset').returns(new Observable<any>(observer => {
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
