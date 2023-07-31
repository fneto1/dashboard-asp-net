import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ServerMessage } from '../shared/server-message';
import { Server } from '../shared/server';

@Injectable({
  providedIn: 'root',
})
export class ServerService {
  constructor(private _http: HttpClient) {}

  getServers(): Observable<Server[]> {
    return this._http
      .get<Server[]>('http://localhost:5260/api/server')
      .pipe(catchError(this.handleError));
  }

  handleError(error: any) {
    const errMsg = error.message
      ? error.message
      : error.status
      ? `${error.status} - ${error.statusText}`
      : 'Server error';

    return throwError(() => new Error(errMsg));
  }

  handleServerMessage(msg: ServerMessage): Observable<any> {
    const url = `http://localhost:5260/api/server/${msg.id}`;
    return this._http.put(url, msg);
  }
}
