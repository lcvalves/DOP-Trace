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

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { DataService } from './data.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { HttpClientModule } from '@angular/common/http';

import{transactionProductRegistrationService} from "../app/transactionProductRegistration/transactionProductRegistration.service"


import { ProducerComponent } from './Producer/Producer.component';
import { Industry_RetailerComponent } from './Industry_Retailer/Industry_Retailer.component';
import { LogisticsComponent } from './Logistics/Logistics.component';
import { CertificationEntityComponent } from './CertificationEntity/CertificationEntity.component';
import { ProductRegistrationComponent } from './ProductRegistration/ProductRegistration.component';
import { QualityAssessmentComponent } from './QualityAssessment/QualityAssessment.component';
import { TransformationComponent } from './Transformation/Transformation.component';
import { StorageComponent } from './Storage/Storage.component';
import { SaleComponent } from './Sale/Sale.component';
import { TransportComponent } from './Transport/Transport.component';
import { AnalysisComponent } from './Analysis/Analysis.component';
import { DiscardComponent } from './Discard/Discard.component';
import { BatchComponent } from './Batch/Batch.component';
import { ProductComponent } from './Product/Product.component';
import { DOP_ProductComponent } from './DOP_Product/DOP_Product.component';

import { SysAdminComponent } from './SysAdmin/SysAdmin.component';
import { WorkerComponent } from './Worker/Worker.component';
import { WorkerAdminComponent } from './WorkerAdmin/WorkerAdmin.component';

import { transactionProductRegistrationComponent } from './transactionProductRegistration/transactionProductRegistration.component';
import { transactionQualityAssessementComponent } from './transactionQualityAssessement/transactionQualityAssessement.component';
import { transactionTransformationComponent } from './transactionTransformation/transactionTransformation.component';
import { transactionStorageComponent } from './transactionStorage/transactionStorage.component';
import { transactionSaleComponent } from './transactionSale/transactionSale.component';
import { transactionTransportComponent } from './transactionTransport/transactionTransport.component';
import { transactionAnalysisComponent } from './transactionAnalysis/transactionAnalysis.component';
import { transactionDiscardComponent } from './transactionDiscard/transactionDiscard.component';
import { setupDemoComponent } from './setupDemo/setupDemo.component';

import { RegisterComponent } from './Register/Register.component';
import { HttpHandler } from '@angular/common/http';



import {FilterAssetPipe} from './Batch/FilterAsset.pipe';

  @NgModule({
   declarations: [
      AppComponent,
      HomeComponent,
      ProducerComponent,
      Industry_RetailerComponent,
      LogisticsComponent,
      CertificationEntityComponent,
      ProductRegistrationComponent,
      QualityAssessmentComponent,
      TransformationComponent,
      StorageComponent,
      SaleComponent,
      TransportComponent,
      AnalysisComponent,
      DiscardComponent,
      BatchComponent,
      ProductComponent,
      DOP_ProductComponent,
      SysAdminComponent,
      WorkerComponent,
      WorkerAdminComponent,
      transactionProductRegistrationComponent,
      transactionQualityAssessementComponent,
      transactionTransformationComponent,
      transactionStorageComponent,
      transactionSaleComponent,
      transactionTransportComponent,
      transactionAnalysisComponent,
      transactionDiscardComponent,
      setupDemoComponent,
      RegisterComponent,
      FilterAssetPipe
   ],
   imports: [
      BrowserModule,
      FormsModule,
      ReactiveFormsModule,
      HttpModule,
      AppRoutingModule,
      HttpClientModule
   ],
   providers: [
      DataService,
      transactionProductRegistrationService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
