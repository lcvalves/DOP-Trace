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

import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

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
//------
import { RegisterComponent } from './Register/Register.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Producer', component: ProducerComponent },
  { path: 'Industry_Retailer', component: Industry_RetailerComponent },
  { path: 'Logistics', component: LogisticsComponent },
  { path: 'CertificationEntity', component: CertificationEntityComponent },
  { path: 'ProductRegistration', component: ProductRegistrationComponent },
  { path: 'QualityAssessment', component: QualityAssessmentComponent },
  { path: 'Transformation', component: TransformationComponent },
  { path: 'Storage', component: StorageComponent },
  { path: 'Sale', component: SaleComponent },
  { path: 'Transport', component: TransportComponent },
  { path: 'Analysis', component: AnalysisComponent },
  { path: 'Discard', component: DiscardComponent },
  { path: 'Batch', component: BatchComponent },
  { path: 'Product', component: ProductComponent },
  { path: 'DOP_Product', component: DOP_ProductComponent },
  { path: 'SysAdmin', component: SysAdminComponent },
  { path: 'Worker', component: WorkerComponent },
  { path: 'WorkerAdmin', component: WorkerAdminComponent },
  { path: 'transactionProductRegistration', component: transactionProductRegistrationComponent },
  { path: 'transactionQualityAssessement', component: transactionQualityAssessementComponent },
  { path: 'transactionTransformation', component: transactionTransformationComponent },
  { path: 'transactionStorage', component: transactionStorageComponent },
  { path: 'transactionSale', component: transactionSaleComponent },
  { path: 'transactionTransport', component: transactionTransportComponent },
  { path: 'transactionAnalysis', component: transactionAnalysisComponent },
  { path: 'transactionDiscard', component: transactionDiscardComponent },
  { path: 'setupDemo', component: setupDemoComponent },

  { path: 'Register', component: RegisterComponent },

  { path: '**', redirectTo: '' },


];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: []
})
export class AppRoutingModule { }
