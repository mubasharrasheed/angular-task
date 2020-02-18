import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  usersbyhour={};
  showCount = false;
  usersCount = [];
  eventForm = new FormGroup({
    type: new FormControl('', [Validators.required]),
    userId: new FormControl('', [Validators.required]),
    time: new FormControl('', [Validators.required]),
  });

  constructor(private router: Router) { }

  ngOnInit() {
  }

  logout() {
    localStorage.setItem('token', '');
    this.router.navigate(['/login']);
  }

  addEvent() {

  }

  activeUserCount() {
    // assumed login events got from backend in a day
    let events = [
      { type: "login", userId: 1, timestamp: 1582002369 },
      { type: "login", userId: 2, timestamp: 1582002369 },
      { type: "login", userId: 1, timestamp: 1582005600 },
      { type: "login", userId: 2, timestamp: 1582005600 },
      { type: "login", userId: 1, timestamp: 1582005700 }
    ]
    this.getActiveUsersFromEvents(events);
  }

  getActiveUsersFromEvents(events){
    // calculating active users in each hour
    events.map((value, index, array)=>{
      let date = new Date(value['timestamp'] * 1000);
      let hour = date.getHours();
      this.usersbyhour[hour] = this.usersbyhour[hour]||[];
      this.usersbyhour[hour].push(value);
    });
    for (let o in this.usersbyhour) {
      this.usersCount.push([Number(o), [...new Set(this.usersbyhour[Number(o)].map(x => x.userId))].length]);
    }
    this.showCount = true;
  }
}
