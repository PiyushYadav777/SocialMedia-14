import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
// import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.BASE_URL;
  private apiKey = environment.API_KEY;

  constructor(private http: HttpClient) { }

  postData(endpoint: string, data: any, isMultipart: boolean = false): Observable<any> {
    const url = `${this.apiUrl}/${endpoint}`;
    let headers = new HttpHeaders({
      'Apikey': this.apiKey
    });
    return this.http.post(url, data, { headers });
  }

  getData(endpoint: string): Observable<any> {
    const url = `${this.apiUrl}/${endpoint}`;
    return this.http.get(url);
  }
}
