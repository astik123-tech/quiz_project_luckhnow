import { Component, OnInit } from '@angular/core';
import { QuizService } from '../service/quiz.service';

import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface question {
  question: string;
  optionOne: string;
  optionTwo: string;
  optionThree: string;
  optionFour: string;
  CorrectAnswer: string;
}

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
})
export class ResultComponent implements OnInit {
  private constestkey;
  AllQuestion: Array<question>;
  total_question: number;
  time_in_min: number;
  currentQuestion: question;
  currentIndex: number = 0;
  selectedAnswer: string;
  marksGain: number = 0;
  count: number = 0;

  ///
  contest_name: string;
  number_of_questoin: any;
  duration: any;
  author_Name: string;

  ///
  started_time: any;
  answerForm: FormGroup;
  hour: number;
  min: number;
  second: number = 0;

  constructor(
    private router: Router,
    private formbuilder: FormBuilder,
    private quizService: QuizService
  ) {}

  ngOnInit(): void {
    this.answerForm = this.formbuilder.group({
      answer: [''],
    });
    this.get_Localstorage_Data_Handler();
    this.get_Question_Handler();
    if (!localStorage.getItem('selectedAnswerWithQuestion'))
      localStorage.setItem('selectedAnswerWithQuestion', '[]');
    // this.duration_maintain();
    // this.calculate_remaining_time();
  }
  onSubmit() {
    this.Next_Page();
    this.Save_Answer_In_Localstorage_Handler(
      this.currentQuestion,
      this.answerForm.value
    );
    this.Calculate_Marks_Handler(this.currentQuestion, this.answerForm.value);
    this.Next_Question_Handler(++this.currentIndex);
  }

  Save_Answer_In_Localstorage_Handler(question: any, { answer }) {
    let AllQuestionWithAnswer = JSON.parse(
      localStorage.getItem('selectedAnswerWithQuestion')
    );
    AllQuestionWithAnswer.push({ ...question, answer: answer });
    localStorage.setItem(
      'selectedAnswerWithQuestion',
      JSON.stringify(AllQuestionWithAnswer)
    );
  }

  Calculate_Marks_Handler({ CorrectAnswer }, { answer }) {
    if (CorrectAnswer === answer) {
      this.marksGain++;
      localStorage.setItem('marksGain', this.marksGain.toString());
    }
  }

  Next_Question_Handler(index) {
    index = parseInt(index);
    this.currentQuestion = this.AllQuestion[index];
    this.answerForm.patchValue({
      answer: false,
    });
  }
  Next_Page() {
    this.count = this.count + 1;
    if (this.count == this.number_of_questoin)
      this.router.navigate(['/completed']);
  }

  get_Localstorage_Data_Handler() {
    this.constestkey = localStorage.getItem('contestKey');
    this.contest_name = localStorage.getItem('contest_name');
    this.number_of_questoin = localStorage.getItem('number_of_questoin');
    this.author_Name = localStorage.getItem('author_Name');
    this.min = this.duration = parseInt(localStorage.getItem('duration'));
    this.started_time = localStorage.getItem('starting_time');
  }

  get_Question_Handler() {
    this.quizService.getQuestion(this.constestkey).subscribe(
      (res: any) => {
        (this.AllQuestion = res.questions),
          (this.total_question = res.NoQ),
          (this.time_in_min = res.time);
        this.currentQuestion = this.AllQuestion[0];
      },
      (error) => {
        alert('Internal Server Error');
      }
    );
  }

  // calculate_remaining_time() {
  //   let current = new Date();
  //   let arrayCurrent = current.toString().split(' ');
  //   let time = arrayCurrent[4].split(':');
  //   let current_hour = time[0];
  //   let current_min = time[1];
  //   let current_sec = time[2];
  //   let start_time = this.started_time.split(':');
  //   this.hour = parseInt(start_time[0]) - parseInt(current_hour);
  //   let a = Math.abs(parseInt(current_min) - parseInt(start_time[1]));
  //   let b = Math.abs(parseInt(current_sec) - parseInt(start_time[2]));
  //   this.min = Math.abs(this.min - a);
  //   this.second = Math.abs(this.second - b);
  //   if (this.min > this.duration) {
  //     alert('Time up..');
  //     this.router.navigate(['/completed']);
  //   }
  // }

  // duration_maintain() {
  //   setInterval(() => {
  //     if (this.second === 0) {
  //       this.min--;
  //       this.second = 60;
  //     }
  //     this.second--;
  //     if (this.min === 0 && this.second === 0) {
  //       alert('Time up..');
  //       this.router.navigate(['/completed']);
  //     }
  //   }, 1000);
  // }
}
