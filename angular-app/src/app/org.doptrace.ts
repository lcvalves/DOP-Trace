import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.doptrace{
   export enum Units {
      KG,
      L,
      UNIT,
   }
   export enum State {
      REGISTERED,
      IN_TRANSIT,
      TRANSFORMED,
      CERTIFIED,
      STORED,
      SOLD,
      DISCARDED,
      DISABLED,
   }
   export abstract class User extends Participant {
      username: string;
      firstname: string;
      lastname: string;
      password: string;
      phoneNumber: string;
      email: string;
   }
   export class SysAdmin extends User {
   }
   export class Worker extends User {
      operator: Operator;
   }
   export class WorkerAdmin extends Worker {
   }
   export abstract class Operator extends Asset {
      id: string;
      name: string;
      description: string;
      street: string;
      zip: string;
      city: string;
      country: string;
      phoneNumber: string;
      email: string;
   }
   export class Producer extends Operator {
   }
   export class Industry_Retailer extends Operator {
   }
   export class Logistics extends Operator {
   }
   export class CertificationEntity extends Operator {
   }
   export abstract class Events extends Asset {
      id: string;
      description: string;
      latitude: number;
      longitude: number;
      dateTime: Date;
      worker: Worker;
   }
   export class ProductRegistration extends Events {
      newBatch: Batch;
      operator: Producer;
   }
   export class QualityAssessment extends Events {
      amountDowned: number;
      newBatch: Batch;
      operator: Industry_Retailer;
      assessedBatch: Batch;
   }
   export class Transformation extends Events {
      newBatch: Batch;
      processes: string[];
      operator: Industry_Retailer;
      usedBatches: Batch[];
      amountPerBatch: number[];
   }
   export class Storage extends Events {
      operator: Industry_Retailer;
      storedBatches: Batch[];
   }
   export class Sale extends Events {
      salePrice: number[];
      newBatch: Batch;
      seller: Industry_Retailer;
      buyer: Industry_Retailer;
      amountPerBatch: number[];
      soldBatches: Batch[];
   }
   export class Transport extends Events {
      operator: Logistics;
      destinationAddress: Industry_Retailer;
      transportedBatches: Batch[];
   }
   export class Analysis extends Events {
      certificated: boolean;
      operator: CertificationEntity;
      batch: Batch;
   }
   export class Discard extends Events {
      motive: string;
      operator: Industry_Retailer;
      discardedBatches: Batch[];
   }
   export class Batch extends Asset {
      id: string;
      amount: number;
      unit: Units;
      creationDate: Date;
      expirationDate: Date;
      state: State;
      certificated: boolean;
      previousEvents: Events[];
      previousOperator: Operator;
      currentOperator: Operator;
      product: Product;
   }
   export class Product extends Asset {
      id: string;
      name: string;
      description: string;
   }
   export class DOP_Product extends Product {
      regions: string[];
      requirements: string[];
   }
   export class transactionProductRegistration extends Transaction {
      productRegistration: ProductRegistration;
   }
   export class transactionQualityAssessement extends Transaction {
      quality: QualityAssessment;
   }
   export class transactionTransformation extends Transaction {
      transformation: Transformation;
   }
   export class transactionStorage extends Transaction {
      storage: Storage;
   }
   export class transactionSale extends Transaction {
      sale: Sale;
   }
   export class transactionTransport extends Transaction {
      transport: Transport;
   }
   export class transactionAnalysis extends Transaction {
      analysis: Analysis;
   }
   export class transactionDiscard extends Transaction {
      discard: Discard;
   }
   export class setupDemo extends Transaction {
   }
// }
