import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  
  isAuthenticated = false;
  private userSub: Subscription;
  constructor( 
    private router:Router,
    private formbuilder: FormBuilder,
    private authService:AuthService
    ) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
    if(this.isAuthenticated){
      this.router.navigate(['/contests'])
    }
    this.loginForm = this.formbuilder.group({
      email: ['',[Validators.required]],
      password: ['',[Validators.required, Validators.minLength(8)]],
    });
  }

  get h(){
    return this.loginForm.controls;
  }

  onSubmit() {  
  
    if(!this.loginForm.valid){ alert("Invalid Form"); return}
    this.authService.login(this.loginForm.value)
    .subscribe(
      (data:any)=>{
       if(data.success){
        this.router.navigate(['/contests']);
       }
      },
      (error:any)=>{
          alert(error?.error?.message ?? "Something want wrong")
      }
    )
  }
  onRegistration(){
    this.router.navigate(['/register'])
  }
}
