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

import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { transactionProductRegistration } from '../org.doptrace';
import 'rxjs/Rx';
import { BehaviorSubject, Subject } from 'rxjs/Rx';
import { FormControl, FormGroup } from '@angular/forms';







// Can be injected into a constructor
@Injectable()
export class transactionProductRegistrationService {

  

  todo: Subject<any>



  

  private NAMESPACE = 'transactionProductRegistration';

  constructor(private dataService: DataService<transactionProductRegistration>) {

    this.todo = new Subject<any>()
  
  };

  setTodo(t: string){
    this.todo.next(t)
}

  
  

  public getAll(): Observable<transactionProductRegistration[]> {
      
      return this.dataService.getAll(this.NAMESPACE);
      
  }

  public getTransaction(id: any): Observable<transactionProductRegistration> {
    return this.dataService.getSingle(this.NAMESPACE, id);
  }

  public addTransaction(itemToAdd: any): Observable<transactionProductRegistration> {
    return this.dataService.add(this.NAMESPACE, itemToAdd);
  }

  public updateTransaction(id: any, itemToUpdate: any): Observable<transactionProductRegistration> {
    return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
  }

  public deleteTransaction(id: any): Observable<transactionProductRegistration> {
    return this.dataService.delete(this.NAMESPACE, id);
  }

}

