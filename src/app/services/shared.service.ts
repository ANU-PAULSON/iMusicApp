import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private httpClient:HttpClient) { }
  private restapiserver="http://localhost:27205/";
  public sendPostRequest(user)
  {
    return this.httpClient.post(this.restapiserver+"api/User",user);
  }
  userAuthentication(login) {

    return this.httpClient.post(this.restapiserver + "api/User/login", login);
  }  
  public AddFav(reqBody, url) {
    return this.httpClient.post(this.restapiserver + url ,reqBody);
  }
  getFav(url) {
    return this.httpClient.get(this.restapiserver + url)
  }
}
