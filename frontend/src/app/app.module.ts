import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { StartupComponent } from './startup/startup.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { ResultComponent } from './result/result.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { LoginComponent } from './login/login.component';
import { QuizCompletedComponent } from './quiz-completed/quiz-completed.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { FeedbackComponent } from './feedback/feedback.component';
import { PreviewComponent } from './preview/preview.component';
import { ContestCardComponent } from './contest-card/contest-card.component';
@NgModule({
  declarations: [
    FeedbackComponent,
    LoginComponent,
    PreviewComponent,
    QuizCompletedComponent,
    RegisterComponent,
    ResultComponent,
    ScheduleComponent,
    StartupComponent,
    AppComponent,
    ContestCardComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    ChartsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
