import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { AuthdataService } from 'src/app/services/auth/authdata.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userservice: UserService,
    private mservice: ToastService,
    private _router: Router,
    private authdata: AuthdataService) { }
  password: any;
  username: any;
  ngOnInit(): void {
  }
  logmein() {
    this.userservice.logmein(this.username, this.password).subscribe(data => {
      if (data.flag) {
        this.mservice.generateMessage('SUCCESS', 'User Logged in successfully', '')
        this.authdata.setToken(data.user.token);
        this._router.navigateByUrl('/users');
      }
    });

  }
}
