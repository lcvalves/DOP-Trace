import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class RegisterServiceService {

constructor(private httpClient: HttpClient) { }


checkWallet() {
    return this.httpClient.get('http://localhost:3000/api/wallet', {withCredentials: true}).toPromise();
  }

  signUp(data) {
    const worker = {
      $class: 'org.doptrace.SysAdmin',
      username: 'bilbo1',
      //operator:'resource:org.doptrace.Producer#PROD_001',
      password:'bilbo',
      firstname: 'bilbo',
      lastname: 'Baggins',
      phoneNumber: '1231231',
      email:'email@email.com'
    };

    return this.httpClient.post('http://localhost:3001/api/SysAdmin', worker).toPromise()
      .then(() => {
        const identity = {
          participant: 'org.doptrace.SysAdmin#' + data.username,
          userID: data.username,
          options: {}
        };

        console.log('aqui')
        
        return this.httpClient.post('http://localhost:3001/api/system/identities/issue', identity, {responseType: 'blob' }).toPromise();

        

      }).then((cardData:any) => {
        

        console.log('CARD-DATA', cardData);

        const file = new File([cardData], 'myCard.card', {type: 'application/octet-stream', lastModified: Date.now()});

        
        const formData = new FormData();

        formData.append('card', file);

        

        const headers = new HttpHeaders();
        headers.set('Content-Type', 'multipart/form-data');
        return this.httpClient.post('http://localhost:3000/api/wallet/import', formData, {
          withCredentials: true,
          headers
        }).toPromise();
      });

      

      
      
  }
  

  getCurrentUser() {
    return this.httpClient.get('http://localhost:3000/api/system/ping', {withCredentials: true}).toPromise()
      .then((data) => {
        return data['participant'];
      });
      
  }
  
  



  }
