import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaskListPage } from './task-list.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { TaskItemComponent } from '../../components/task-item/task-item.component';

const routes: Routes = [
  {
    path: '',
    component: TaskListPage
  }
];

@NgModule({
  declarations: [
    TaskListPage,
    TaskItemComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class TaskListPageModule { }
