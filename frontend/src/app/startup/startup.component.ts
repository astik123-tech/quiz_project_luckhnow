import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuizService } from '../service/quiz.service';
@Component({
  selector: 'app-startup',
  templateUrl: './startup.component.html',
  styleUrls: ['./startup.component.css'],
})
export class StartupComponent implements OnInit {
  quizForm: FormGroup;
  contest: Array<any> = [];
  duration:Array<number>=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]
  question:Array<number>=[1,2,3,4,5,6,7,8,9,10]
    constructor(
    private formbuilder: FormBuilder,
    private QuizService: QuizService
  ) {}

  ngOnInit(): void {
    let _contentKey =  localStorage.getItem("_contentKey");
    let _contest_Name = localStorage.getItem("_contest_Name");
    
    this.quizForm = this.formbuilder.group({
      contentKey: [_contentKey, [Validators.required]],
      author_Name: ['', [Validators.required]],
      duration: ['', [Validators.required]],
      number_of_questoin: ['', [Validators.required]],
      contest_name: [_contest_Name, [Validators.required]],
    });
  this.getContestHandler()
  }

  getContestHandler() {
    this.QuizService.getScheduledContest().subscribe(
      (res: any) => {
        this.contest = res;
      },
      (error: any) => {
        alert(error);
      }
    );
  }
  get h() {
    return this.quizForm.controls;
  }

  onSubmit() {
    if (!this.quizForm.valid) {
      alert('Invalid Form');
      return;
    }
    const data = JSON.parse(localStorage.getItem("userData"))
    this.QuizService.createQuiz({...this.quizForm.value,_userId:data.id}).subscribe(
      (res) => {
        alert(res);
        this.getContestHandler()
      },
      (error) => { 
       
        alert(error.message ? error.error.message :"Internal Server Error");
      }
    );
  }
}
