import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../service/quiz.service';

@Component({
  selector: 'app-contest-card',
  templateUrl: './contest-card.component.html',
  styleUrls: ['./contest-card.component.css'],
})
export class ContestCardComponent implements OnInit {
  constructor(private router: Router, private quiz: QuizService) {}
  contest:any;
  ngOnInit(): void {
    this.fetch_contest()
  }

  next_page(key, name) {
    localStorage.setItem("_contentKey",key);
    localStorage.setItem("_contest_Name",name);
    this.router.navigate(['/create-quiz']);
  }

  fetch_contest() {
    this.quiz.get_contest().subscribe(
      (res) => {
        this.contest =  res
      },
      (error) => {
        alert(error.message ? error.message : 'Internal Server Error');
      }
    );
  }
}
