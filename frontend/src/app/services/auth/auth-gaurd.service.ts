import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthdataService } from '../auth/authdata.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService {

  constructor(private _authService: AuthdataService, private _router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this._authService.isAuthenticated() == false) {
      this._router.navigateByUrl('/login');
    }
    else {
      return true
    }
  }

}
