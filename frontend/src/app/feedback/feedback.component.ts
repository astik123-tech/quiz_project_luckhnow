import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { QuizService } from '../service/quiz.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  feedbackForm: FormGroup;
  constructor(
    private router:Router,
    private formbuilder: FormBuilder,
    private quiz:QuizService
  ) { }
  ngOnInit(){
    this.feedbackForm = this.formbuilder.group({
      comment: ['',[Validators.required]]
     })
  }
  onSubmit(){
    if(!this.feedbackForm.valid){ alert("Invalid Form"); return}
    let userData =JSON.parse( localStorage.getItem("userData"))
    let data ={
      comment:this.feedbackForm.value.comment,
      _id:userData.id,
      userName:userData.name
    }
    this.quiz.postfeedback(data).subscribe((res)=>{
      alert("Successful..!!")
      this.router.navigate(['/play-quiz'])
    },(error:any)=>{alert(error.message)})
  }
}
