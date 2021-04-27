import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartType } from 'chart.js';
import { QuizService } from '../service/quiz.service';

@Component({
  selector: 'app-quiz-completed',
  templateUrl: './quiz-completed.component.html',
  styleUrls: ['./quiz-completed.component.css'],
})
export class QuizCompletedComponent implements OnInit {
         rank = [];
         total:number=0;
  public marksGain: number = 0;
  public totalQuestion: number = 0;
  public wrongAnswer: number = 0;
  public barChartType: ChartType = 'bar';
  public barChartLegend: boolean = true;
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
  };
  public barChartData: ChartDataSets[] = [];

  ngOnInit(): void {
    
    this.totalQuestion = parseInt(localStorage.getItem('number_of_questoin'));
    this.marksGain = parseInt(localStorage.getItem('marksGain'));
    this.wrongAnswer = this.totalQuestion - this.marksGain;
    this.barChartData = [
      {
        backgroundColor: '#0284f5',
        data: [this.totalQuestion],
        label: 'Total Question',
      },
      {
        backgroundColor: '#10c719',
        data: [this.marksGain],
        label: 'Right Answer',
      },
      {
        backgroundColor: '#f51702',
        data: [this.wrongAnswer, 0],
        label: 'Wrong Answer',
      },
    ];
    let userDetail = JSON.parse(localStorage.getItem('userData'));
    let body = {
      questions: JSON.parse(localStorage.getItem('selectedAnswerWithQuestion')),
      user: userDetail.name,
      userid: userDetail.id,
      contestKey: localStorage.getItem('contestKey'),
      totalMarks: this.marksGain,
    };
    this.quizService.postResult(body).subscribe((res)=>{
      this.getRanking();
    },(error)=>{console.log(error);
    })
  }

  constructor(private quizService: QuizService) {}

  getRanking() {
    this.quizService.getRanking(localStorage.getItem('contestKey')).subscribe(
      (res: any) => {
        this.rank = res;
        this.total = this.rank.length
      },
      (error) => {
        alert(error.message ?error.message:"Something went wrong..!" )
      }
    );
  }
}
