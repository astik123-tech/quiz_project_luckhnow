import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
interface quiz {
    contentKey: string;
    author_Name: string;
    duration:string;
    number_of_questoin:string;
    contest_name:string;
}
@Injectable({
  providedIn: 'root'
})
export class QuizService {
  baseUrl = environment.url;
  constructor(private http: HttpClient) {}

  createQuiz(data:quiz){
    return this.http.post(`${this.baseUrl}/createQuiz`,data)
  }
  checkContestKet(contestKey:string){
    const data={
      contestKey
    }
    return this.http.post(`${this.baseUrl}/checkContestKey`,data)
  }

  getQuestion(contestKey:string){
    const data={
      contestKey
    }
    return this.http.post(`${this.baseUrl}/getQuestion`,data)
  }
  postResult(data:any){
    return this.http.put(`${this.baseUrl}/postResult/${data.userid}/contestkey/${data.contestKey}`,data)
  }
  
  getScheduledContest(){
    const data = JSON.parse(localStorage.getItem("userData"))
    return this.http.get(`${this.baseUrl}/getScheduledContest/${data.id}`)
  }
  
  getRanking(contestKey:string){
    return this.http.get(`${this.baseUrl}/getRanking/${contestKey}`)
  }

  postfeedback(data:any){
    return this.http.post(`${this.baseUrl}/postfeedback`,data)
  }

  get_contest(){
    return this.http.get(`${this.baseUrl}/getcontest`)
  }
}
