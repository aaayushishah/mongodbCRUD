import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { switchMap, take, filter, tap } from 'rxjs/operators';
import { ToastService } from '../services/toast.service';
import { AuthdataService } from '../services/auth/authdata.service';
@Injectable({
    providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
    private refreshTokenInProgress = false;
    private refreshTokenSubject: Subject<any> = new BehaviorSubject<any>(null);
    constructor(
        private authDataService: AuthdataService,
        private router: Router,
        private mservice: ToastService,
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        debugger;
        if (this.authDataService.isAuthenticated()) {
            return next.handle(this.injectToken(req)).pipe(tap(() => { },
                (err: any) => {
                    if (err instanceof HttpErrorResponse) {
                        if (err.status !== 401) {
                            return;
                        }
                        this.router.navigate(['/login']);
                    }
                }));
        } else {
            this.router.navigate(['/login']);
        }
    }

    injectToken(request: HttpRequest<any>) {
        const token: any = this.authDataService.getToken();
        return request.clone({
            setHeaders: {
                Authorization: `Bearer ${token.token}`
            }
        });
    }
}
