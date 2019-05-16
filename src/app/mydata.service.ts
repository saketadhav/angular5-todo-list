import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import {Observable} from 'rxjs';

import {HttpClient,HttpParams,HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class MydataService {

  private goals = new BehaviorSubject<any>([]);
  goal = this.goals.asObservable();

  constructor(private http: HttpClient) {
  }

  changeGoal(goal){
    this.goals.next(goal);
  }

  getGoals() {
    return this.http.get<any[]>('http://localhost/GoalsWebApi/api/Goals');
  }

  addGoal(goalText) {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    var url = 'http://localhost/GoalsWebApi/api/Goals';
    var body = {"Id":0, "GoalText":goalText};
    console.log('url : ', url);
    console.log('body : ', body);
    return this.http.post<string>(url, body).subscribe();
  }

  removeGoal(goalText) {
    var url = `http://localhost/GoalsWebApi/api/Goals?goaltext=${goalText}`;
    console.log('url : ', url);
    console.log('goalText : ', goalText);
    return this.http.delete(url).subscribe();
  }

}
