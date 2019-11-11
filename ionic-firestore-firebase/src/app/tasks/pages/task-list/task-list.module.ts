import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaskListPage } from './task-list.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from '../../components/components.module';

const routes: Routes = [
  {
    path: '',
    component: TaskListPage
  }
];

@NgModule({
  declarations: [
    TaskListPage
  ],
  imports: [
    SharedModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ]
})
export class TaskListPageModule { }
