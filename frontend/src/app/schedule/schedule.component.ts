import { Component, OnInit } from '@angular/core';
import { QuizService } from '../service/quiz.service'
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  form: FormGroup;
  constructor(
    private QuizService:QuizService, 
    private router:Router,
    private formbuilder: FormBuilder,) { }

  ngOnInit(): void {
   
    this.form = this.formbuilder.group({
      contentKey: ['',[Validators.required]],
    })
    localStorage.removeItem("selectedAnswerWithQuestion")
  }
  onSubmit() {  
    if(!this.form.valid){ alert("Invalid Form"); return}
    this.QuizService.checkContestKet(this.form.value.contentKey).subscribe(
      (res:any)=>{
       if(res.success){
        this.Save_Value_In_Localstorage(res)
       }else{
         alert("contest's key invalid..")
       }
      },(error)=>{alert(error.message)})
  }

  Save_Value_In_Localstorage(res){
         localStorage.setItem("contestKey",this.form.value.contentKey)
         localStorage.setItem("contest_name",res?.contest?.contest_name)
         localStorage.setItem("number_of_questoin",res?.contest?.number_of_questoin)
         localStorage.setItem("author_Name",res?.contest?.author_Name)
         localStorage.setItem("duration",res?.contest?.duration)
         let current = new Date();
         let arrayCurrent = current.toString().split(" ")
         localStorage.setItem("starting_time",arrayCurrent[4]);
         this.router.navigate(['/questions'])
  }
}
