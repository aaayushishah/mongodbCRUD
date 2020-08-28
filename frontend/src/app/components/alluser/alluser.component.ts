import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-alluser',
  templateUrl: './alluser.component.html',
  styleUrls: ['./alluser.component.css']
})
export class AlluserComponent implements OnInit {
  userlist: any = [];
  euser: any;
  editflag = false;
  addflag = false;
  constructor(private userservice: UserService,
    private mservice: ToastService) { }

  ngOnInit(): void {
    this.getallusers();
  }
  getallusers() {
    this.userservice.getAllUser().subscribe(data => {
      if (data.flag) {
        this.userlist = data.outdatalist;
      }
    });
  }
  edituser(list) {
    this.editflag = true;
    this.euser = {};
    this.euser.username = (list.username) ? list.username : '';
    this.euser.firstname = (list.firstname) ? list.firstname : '';
    this.euser.lastname = (list.lastname) ? list.lastname : '';
    this.euser.hash = (list.hash) ? list.hash : '';
    this.euser.address = (list.address) ? list.address : '';
    this.euser.age = (list.age) ? list.age : '';
    this.euser.id = (list.id) ? list.id : '';
  }
  updateUser() {
    this.userservice.updateUser(this.euser).subscribe(data => {
      this.editflag = false;
      this.euser = {
        username: '',
        firstname: '',
        lastname: '',
        hash: '',
        address: '',
        age: '',
        id: ''
      };
      this.getallusers();
      if (data.flag) {
        this.mservice.generateMessage('SUCCESS', 'SUCCESS', data.message);
      } else {
        this.mservice.generateMessage('ERROR', 'FAILED', data.message);
      }
    });
  }
  addUser() {
    this.addflag = true;
    this.euser = {};
  }
  deleteUser(list) {
    this.userservice.deleteUser(list.id).subscribe(data => {
      if (data.flag) {
        this.mservice.generateMessage('SUCCESS', 'SUCCESS', data.message);
        const index = this.userlist.map(e => e.id).indexOf(list.id);
        this.userlist.splice(index, 1);
      } else {
        this.mservice.generateMessage('ERROR', 'FAILED', data.message);
      }
    });
  }
  saveUser() {
    this.userservice.addUser(this.euser).subscribe(data => {
      this.addflag = false;
      this.euser = {
        username: '',
        firstname: '',
        lastname: '',
        hash: '',
        address: '',
        age: '',
        id: ''
      };
      this.getallusers();
      if (data.flag) {
        this.mservice.generateMessage('SUCCESS', 'SUCCESS', data.message);
      } else {
        this.mservice.generateMessage('ERROR', 'FAILED', data.message);
      }
    });
  }
}
