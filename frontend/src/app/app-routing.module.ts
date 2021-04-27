import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './service/auth.guard';

import { ResultComponent } from './result/result.component';
import { ScheduleComponent  } from './schedule/schedule.component';
import { StartupComponent   } from './startup/startup.component';
import { QuizCompletedComponent } from './quiz-completed/quiz-completed.component';
import { PreviewComponent } from './preview/preview.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { ContestCardComponent } from './contest-card/contest-card.component';
const routes: Routes = [
  {
    path:'',
    component:LoginComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path:'create-quiz',
    // canActivate: [AuthGuard],
    component:StartupComponent
  },
  {
    path:'preview',
    canActivate: [AuthGuard],
    component:PreviewComponent
  },
  {
    path:'completed',
    // canActivate: [AuthGuard],
    component:QuizCompletedComponent
  },
  {
    path:'questions',
    // canActivate: [AuthGuard],
    component:ResultComponent
  },
  {
    path:'play-quiz',
    //  canActivate: [AuthGuard],
    component:ScheduleComponent
  },
  {
    path:'feedback',
     canActivate: [AuthGuard],
    component:FeedbackComponent
  },
  {
    path:'contests',
    //  canActivate: [AuthGuard],
    component:ContestCardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
