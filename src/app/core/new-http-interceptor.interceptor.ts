import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, finalize, switchMap, tap, throwError } from 'rxjs';

import { ToastrService } from 'ngx-toastr';
import { SessionMgmtService } from '../services/session-mgmt.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

export const NewHttpInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const sessionService = inject(SessionMgmtService);
  const http = inject(HttpClient);
  const toastr = inject(ToastrService);
  const router = inject(Router);

  req = req.clone({
    setHeaders: {
        Authorization: `Bearer ${sessionService.getToken}`
    }
  });
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        if(confirm("Your token got expired! Do you want to get new token")){
          return http.post<any>(`${environment.apiUrl}/User/getNewJwtToken`,{
            id:sessionService.getUserData().id,
            token:sessionService.getToken,
            refreshToken:sessionService.getRefreshToken
          })
          .pipe(tap((res: any) => {
            if(res.status){
                sessionService.setToken(res.data.token);
                sessionService.setRefreshToken(res.data.refreshToken);
            } 
            else{
              toastr.warning("Session Expired!.. Logging-off");
              sessionService.clearSession();
              router.navigate(['/']);
            }
          })).pipe(
              switchMap((token: any) => {
                  // this.isRefreshing = false;
                  // this.refreshTokenSubject.next(this.sessionService?.getUserData?.token!=undefined?this.sessionService.getUserData.token:'');
                  return next(req = req.clone({
                      setHeaders: {
                          Authorization: `Bearer ${sessionService.getToken}`
                      }
                  }));
              })
          );
        }
        else{
          sessionService.clearSession();
          console.log(error);
          router.navigate(['/']);
          return throwError(()=>new Error("User Denied to get new Token"));
        }
      }
      else{
        return  throwError(()=>new Error("Something Went wrong"));
      }
    //   Pass the error along to the calling service
      
    }),
    finalize(() => {
    //   toastr.info('Unauthorized Interceptor Call Completed');
    })
  );
};


