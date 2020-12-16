import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable ,  throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ApiService {
  constructor(
    private http: HttpClient
  ) {}

  private formatErrors(error: any) {
    return  throwError(error.error);
  }
  headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${environment.api_url}${path}`, { params, headers: this.headersConfig})
      .pipe(catchError(this.formatErrors));
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${environment.api_url}${path}`,
      JSON.stringify(body),
      { headers: this.headersConfig}
    ).pipe(catchError(this.formatErrors));
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(
      `${environment.api_url}${path}`,
      JSON.stringify(body),
      { headers: this.headersConfig}
    ).pipe(catchError(this.formatErrors));
  }

  postFile(path:string, fileToUpload: File): Observable<any>{
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload);
    return this.http.post<any>(`${environment.api_url}${path}`,formData, {
      reportProgress: true,
      observe: 'events'
    })
    .pipe(catchError(this.formatErrors));
  }

  delete(path): Observable<any> {
    return this.http.delete(
      `${environment.api_url}${path}`,
      { headers: this.headersConfig}
    ).pipe(catchError(this.formatErrors));
  }
}
