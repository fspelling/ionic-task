import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.page.html',
  styleUrls: ['./task-list.page.scss'],
})
export class TaskListPage implements OnInit {
  $tasks: Observable<Task[]>;

  constructor() { }

  ngOnInit() {
    this.$tasks = of([
      { id: '', title: 'task 1', done: false },
      { id: '', title: 'task 1', done: true }
    ]);
  }

}