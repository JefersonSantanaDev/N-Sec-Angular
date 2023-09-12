import { Component, OnInit } from '@angular/core';
import { UserStoreService } from 'src/app/services/UserStoreService';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public users: any = [];
  public role: string;

  public fullName: string = '';
  constructor(
    private api: ApiService,
    private auth: AuthService,
    private userStore: UserStoreService
  ) {}

  ngOnInit() {
    this.api.getUsers().subscribe((res) => {
      this.users = res;
    });

    this.userStore.getFullNameFromStore().subscribe((val) => {
      let fullNameFromToken = this.auth.getfullNameFromToken();
      this.fullName = val || fullNameFromToken;
    });

    this.userStore.getRoleFromStore().subscribe((val) => {
      let roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken;
    });
  }

  logout() {
    this.auth.signOut();
  }
}
