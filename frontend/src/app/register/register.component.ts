import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { passwordChecker} from '../customvalidation/password_checker'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup;
  constructor( 
    private router:Router,
    private formbuilder: FormBuilder,
    private AuthService:AuthService
    ) { }

  ngOnInit(): void {
    this.registrationForm = this.formbuilder.group({
      name: ['',[Validators.required]],
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(8)]],
      confirmPassword: ['',[Validators.required, Validators.minLength(8)]],
    },{validators: passwordChecker('password','confirmPassword' )})
  }
  get h(){
    return this.registrationForm.controls;
  }

  onSubmit() {  
    if(!this.registrationForm.valid){ alert("Invalid Form"); return}
    this.AuthService.signup(this.registrationForm.value)
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
  onLogin(){
    this.router.navigate(['/'])
  }
}
