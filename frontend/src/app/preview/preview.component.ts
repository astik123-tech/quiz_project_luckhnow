import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {
  panelOpenState = false;
  question:Array<any>
  constructor() { }

  ngOnInit(): void {
  
   this.getQuestion()
  }
 
  getQuestion=()=>{
    this.question = ((JSON.parse(localStorage.getItem("selectedAnswerWithQuestion"))))
    let length = this.question.length;
    for(let i=0;i<length;i++){
      for(let j=i+1; j<length;j++){
        if(this.question[i] === false)
            this.question[j] = 0;
        if(this.question[i]._id === this.question[j]._id){
          this.question[j] = 0;
        }
      }
    }
    
  }
}
