import { Component, OnInit } from '@angular/core';
import {trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import {MydataService} from '../mydata.service';
import { observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [

    trigger('goals',[
      transition('* => *',[

        query(':enter', style({opacity : 0}), {optional:true}),

        query(':enter', stagger('300ms',[
          animate('.6s ease-in', keyframes([
            style({opacity:0, transform:'translateY(-75%)', offset:0}),
            style({opacity:0.5, transform:'translateY(35%)', offset:0.3}),
            style({opacity:1, transform:'translateY(0)', offset:1})
          ]))
        ]), {optional:true}),

        query(':leave', stagger('300ms',[
          animate('.6s ease-in', keyframes([
            style({opacity:1, transform:'translateY(0)', offset:0}),
            style({opacity:0.5, transform:'translateY(35%)', offset:0.3}),
            style({opacity:0, transform:'translateY(-75%)', offset:1})
          ]))
        ]), {optional:true}),

      ])
    ])

  ]

})
export class HomeComponent implements OnInit {

  itemCount : number;
  btnText : string = "Add an item";
  goalText : string;
  goals = [];

  constructor(private _data : MydataService) { }

  ngOnInit() {

    var goals = this._data.getGoals().subscribe(
      a => this.goals = a
    );
    this._data.changeGoal(this.goals);
    console.log('itemCount on init : ', this.goals.length);
    this.itemCount = this.goals.length;

    }

  addItem(){
    this.goals.push(this.goalText);
    this._data.addGoal(this.goalText);
    this.goalText = "";
    this._data.changeGoal(this.goals);
    this.itemCount = this.goals.length;
  }

  removeItem(i){
    this._data.removeGoal(this.goals[i]);
    this.goals.splice(i,1);
    this._data.changeGoal(this.goals);
    this.itemCount = this.goals.length;
  }

}
