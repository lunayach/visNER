import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NerService {

  API = environment.api_endpoint;
  HEADERS = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

  constructor(private http: HttpClient) {
  }

  getTags(query: string) {
    return this.http.post(this.API, {message: query}, this.HEADERS);
  }

}
