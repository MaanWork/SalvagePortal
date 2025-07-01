import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, throwError, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { Environments } from "../../../environment/environments";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = Environments.CommonApiUrl;
  }


  // Check if the user is online before making an API request.
  private isOnline(): boolean {
    return navigator.onLine;
  }

  
  // Get common HTTP headers for API requests.
  private getHttpHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer '+ sessionStorage.getItem('UserToken') || ''
    });
  }

  private gettempHttpHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('TempToken') || ''
    });
  }

  // Get common HTTP headers for file upload requests.
  private getFileUploadHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Accept': '*/*',
      'Authorization': 'Bearer ' + (sessionStorage.getItem('UserToken') || '')
    });
  }
  
  // Handle errors from API responses.
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      errorMessage = `Server Error (${error.status}): ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  
  //  GET request 
  get<T>(apiRoute: string, params?: any): Observable<T> {
    if (!this.isOnline()) {
      console.error("No internet connection. API call aborted.");
      return of(null as T);
    }
    if (params == "view-auction") {
      if (sessionStorage.getItem('UserToken')) {
        return this.http.get<T>(`${this.baseUrl}${apiRoute}`, {
          headers: this.getHttpHeaders(),
        }).pipe(catchError(this.handleError));
      } else {
        return this.http.get<T>(`${this.baseUrl}${apiRoute}`, {
          headers: this.gettempHttpHeaders(),
        }).pipe(catchError(this.handleError));
      }
    } else {
      return this.http.get<T>(`${this.baseUrl}${apiRoute}`, {
        headers: this.getHttpHeaders(),
        params
      }).pipe(catchError(this.handleError));
    }
    
  }

  //POST request with body data.
  post<T>(apiRoute: string, body: any, params?: any): Observable<T> {
    if (!this.isOnline()) {
      console.error("No internet connection. API call aborted.");
      return of(null as T);
    }
    return this.http.post<T>(`${this.baseUrl}${apiRoute}`, body, { headers: this.getHttpHeaders(), params })
      .pipe(catchError(this.handleError));
  }

  
  // PUT request with body data.
  put<T>(apiRoute: string, body: any, params?: any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}${apiRoute}`, body, { headers: this.getHttpHeaders(), params })
      .pipe(catchError(this.handleError));
  }

  
  //PATCH request with body data.
  patch<T>(apiRoute: string, body: any, params?: any): Observable<T> {
    return this.http.patch<T>(`${this.baseUrl}${apiRoute}`, body, { headers: this.getHttpHeaders(), params })
      .pipe(catchError(this.handleError));
  }

  
  //DELETE request.
  delete<T>(apiRoute: string, params?: any): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}${apiRoute}`, { headers: this.getHttpHeaders(), params })
      .pipe(catchError(this.handleError));
  }

  
  //Download a file (Blob response type).
  downloadFile(apiRoute: string): Observable<Blob> {
    return this.http.get(`${this.baseUrl}${apiRoute}`, { headers: this.getHttpHeaders(), responseType: 'blob' })
      .pipe(catchError(this.handleError));
  }

  
  //Upload a file using PUT request.
  uploadFile(apiRoute: string, file: Blob, contentType: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', contentType);
    return this.http.put(`${this.baseUrl}${apiRoute}`, file, { headers })
      .pipe(catchError(this.handleError));
  }

  // Upload a file using POST request.
  uploadImage<T>(apiRoute: string, body: any, params?: any): Observable<T> {
    if (!this.isOnline()) {
      console.error("No internet connection. API call aborted.");
      return of(null as T);
    }
    return this.http.post<T>(`${this.baseUrl}${apiRoute}`, body, { 
      headers: this.getFileUploadHeaders(), params })
      .pipe(catchError(this.handleError));
  }
  
}
