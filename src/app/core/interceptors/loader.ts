import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, finalize, throwError } from 'rxjs';

import { Router } from '@angular/router';
import { LoaderService } from '../service/loader.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

    constructor(private loadingService: LoaderService, private router: Router) { }
    private totalRequests = 0;
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.totalRequests++;
        this.loadingService.setLoading(true);
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                // if (error.status === 403) {
                //     this.router.navigate(['/home']);
                //     alert('Session expired or unauthorized. Redirecting to login...');
                // }
                return throwError(() => error); // rethrow to let components handle if needed
            }),
            finalize(() => {
                this.totalRequests--;
                if (this.totalRequests === 0) {
                    this.loadingService.setLoading(false);
                }
            })
        );
    }
}
