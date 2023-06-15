import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SessionMgmtService } from '../services/session-mgmt.service';

@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {

  constructor(private route:Router,private sessionService:SessionMgmtService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if(request.url!=environment.apiUrl+'/User/login'){
      request = request.clone({  
        setHeaders: {
            Authorization: `Bearer ${this.sessionService.getToken()}`
        }
      });
    }
    return next.handle(request);
  }

  routeToErrorPage(){
    this.route.navigate(['/error/401']);
  }
}
