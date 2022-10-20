import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  server: string = "http://localhost/api-php-v2/";
  
  constructor(private http: HttpClient) {
         
   }
   

   apiPHP(endpoint: string ,dados:any){
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.post(this.server + endpoint, JSON.stringify(dados), httpOptions).map(res => res)
  }

  public uploadFile(data) {
    let uploadURL = `${this.server}controller-upload.php`;
    return this.http.post<any>(uploadURL, data);
  }

//   public authClient(endpoint: string ,dados:any){
//     const httpOptions = {
//       headers: new HttpHeaders({'Content-Type': 'application/json'})
//     }
//     return this.http.post(this.server + endpoint, JSON.stringify(dados), httpOptions).map(res => res)
//   }}
}