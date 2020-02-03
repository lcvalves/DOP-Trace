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

import { AngularTestPage } from './app.po';
import { ExpectedConditions, browser, element, by } from 'protractor';
import {} from 'jasmine';


describe('Starting tests for angular-app', function() {
  let page: AngularTestPage;

  beforeEach(() => {
    page = new AngularTestPage();
  });

  it('website title should be angular-app', () => {
    page.navigateTo('/');
    return browser.getTitle().then((result)=>{
      expect(result).toBe('angular-app');
    })
  });

  it('network-name should be projeto@0.0.2',() => {
    element(by.css('.network-name')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('projeto@0.0.2.bna');
    });
  });

  it('navbar-brand should be angular-app',() => {
    element(by.css('.navbar-brand')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('angular-app');
    });
  });

  
    it('Producer component should be loadable',() => {
      page.navigateTo('/Producer');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Producer');
      });
    });

    it('Producer table should have 10 columns',() => {
      page.navigateTo('/Producer');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(10); // Addition of 1 for 'Action' column
      });
    });
  
    it('Industry_Retailer component should be loadable',() => {
      page.navigateTo('/Industry_Retailer');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Industry_Retailer');
      });
    });

    it('Industry_Retailer table should have 10 columns',() => {
      page.navigateTo('/Industry_Retailer');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(10); // Addition of 1 for 'Action' column
      });
    });
  
    it('Logistics component should be loadable',() => {
      page.navigateTo('/Logistics');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Logistics');
      });
    });

    it('Logistics table should have 10 columns',() => {
      page.navigateTo('/Logistics');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(10); // Addition of 1 for 'Action' column
      });
    });
  
    it('CertificationEntity component should be loadable',() => {
      page.navigateTo('/CertificationEntity');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('CertificationEntity');
      });
    });

    it('CertificationEntity table should have 10 columns',() => {
      page.navigateTo('/CertificationEntity');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(10); // Addition of 1 for 'Action' column
      });
    });
  
    it('ProductRegistration component should be loadable',() => {
      page.navigateTo('/ProductRegistration');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('ProductRegistration');
      });
    });

    it('ProductRegistration table should have 9 columns',() => {
      page.navigateTo('/ProductRegistration');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(9); // Addition of 1 for 'Action' column
      });
    });
  
    it('QualityAssessment component should be loadable',() => {
      page.navigateTo('/QualityAssessment');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('QualityAssessment');
      });
    });

    it('QualityAssessment table should have 11 columns',() => {
      page.navigateTo('/QualityAssessment');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(11); // Addition of 1 for 'Action' column
      });
    });
  
    it('Transformation component should be loadable',() => {
      page.navigateTo('/Transformation');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Transformation');
      });
    });

    it('Transformation table should have 12 columns',() => {
      page.navigateTo('/Transformation');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(12); // Addition of 1 for 'Action' column
      });
    });
  
    it('Storage component should be loadable',() => {
      page.navigateTo('/Storage');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Storage');
      });
    });

    it('Storage table should have 9 columns',() => {
      page.navigateTo('/Storage');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(9); // Addition of 1 for 'Action' column
      });
    });
  
    it('Sale component should be loadable',() => {
      page.navigateTo('/Sale');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Sale');
      });
    });

    it('Sale table should have 13 columns',() => {
      page.navigateTo('/Sale');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(13); // Addition of 1 for 'Action' column
      });
    });
  
    it('Transport component should be loadable',() => {
      page.navigateTo('/Transport');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Transport');
      });
    });

    it('Transport table should have 10 columns',() => {
      page.navigateTo('/Transport');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(10); // Addition of 1 for 'Action' column
      });
    });
  
    it('Analysis component should be loadable',() => {
      page.navigateTo('/Analysis');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Analysis');
      });
    });

    it('Analysis table should have 10 columns',() => {
      page.navigateTo('/Analysis');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(10); // Addition of 1 for 'Action' column
      });
    });
  
    it('Discard component should be loadable',() => {
      page.navigateTo('/Discard');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Discard');
      });
    });

    it('Discard table should have 10 columns',() => {
      page.navigateTo('/Discard');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(10); // Addition of 1 for 'Action' column
      });
    });
  
    it('Batch component should be loadable',() => {
      page.navigateTo('/Batch');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Batch');
      });
    });

    it('Batch table should have 12 columns',() => {
      page.navigateTo('/Batch');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(12); // Addition of 1 for 'Action' column
      });
    });
  
    it('Product component should be loadable',() => {
      page.navigateTo('/Product');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Product');
      });
    });

    it('Product table should have 4 columns',() => {
      page.navigateTo('/Product');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(4); // Addition of 1 for 'Action' column
      });
    });
  
    it('DOP_Product component should be loadable',() => {
      page.navigateTo('/DOP_Product');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('DOP_Product');
      });
    });

    it('DOP_Product table should have 6 columns',() => {
      page.navigateTo('/DOP_Product');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(6); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('SysAdmin component should be loadable',() => {
      page.navigateTo('/SysAdmin');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('SysAdmin');
      });
    });

    it('SysAdmin table should have 7 columns',() => {
      page.navigateTo('/SysAdmin');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(7); // Addition of 1 for 'Action' column
      });
    });
  
    it('Worker component should be loadable',() => {
      page.navigateTo('/Worker');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Worker');
      });
    });

    it('Worker table should have 8 columns',() => {
      page.navigateTo('/Worker');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(8); // Addition of 1 for 'Action' column
      });
    });
  
    it('WorkerAdmin component should be loadable',() => {
      page.navigateTo('/WorkerAdmin');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('WorkerAdmin');
      });
    });

    it('WorkerAdmin table should have 8 columns',() => {
      page.navigateTo('/WorkerAdmin');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(8); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('transactionProductRegistration component should be loadable',() => {
      page.navigateTo('/transactionProductRegistration');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('transactionProductRegistration');
      });
    });
  
    it('transactionQualityAssessement component should be loadable',() => {
      page.navigateTo('/transactionQualityAssessement');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('transactionQualityAssessement');
      });
    });
  
    it('transactionTransformation component should be loadable',() => {
      page.navigateTo('/transactionTransformation');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('transactionTransformation');
      });
    });
  
    it('transactionStorage component should be loadable',() => {
      page.navigateTo('/transactionStorage');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('transactionStorage');
      });
    });
  
    it('transactionSale component should be loadable',() => {
      page.navigateTo('/transactionSale');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('transactionSale');
      });
    });
  
    it('transactionTransport component should be loadable',() => {
      page.navigateTo('/transactionTransport');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('transactionTransport');
      });
    });
  
    it('transactionAnalysis component should be loadable',() => {
      page.navigateTo('/transactionAnalysis');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('transactionAnalysis');
      });
    });
  
    it('transactionDiscard component should be loadable',() => {
      page.navigateTo('/transactionDiscard');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('transactionDiscard');
      });
    });
  
    it('setupDemo component should be loadable',() => {
      page.navigateTo('/setupDemo');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('setupDemo');
      });
    });
  

});