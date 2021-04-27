import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'App';
  isAuthenticated = false;
  private userSub: Subscription;
  constructor(private authService:AuthService){}
  ngOnInit(){
     this.authService.autoLogin()
     this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }
  logout(){
    this.authService.logout()
  }
  
}