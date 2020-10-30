import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserData } from 'src/app/interfaces/user-data';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  chars = new Array(30);
  users$: Observable<UserData[]> = this.userService.getUsers();

  constructor(
    private userService: UserService,
    private viewportScroller: ViewportScroller
  ) {}

  ngOnInit(): void {}

  scrollTo(target: string) {
    this.viewportScroller.scrollToAnchor(target);
  }
}
