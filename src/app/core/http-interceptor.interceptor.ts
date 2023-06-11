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
import { environment } from 'src/environment/environment';

@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {

  constructor(private route:Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if(request.url!=environment.apiUrl+'/User/login'){
      request = request.clone({  
        setHeaders: {
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
        }
      });
    }
    return next.handle(request);
  }

  routeToErrorPage(){
    this.route.navigate(['/error/401']);
  }
}
