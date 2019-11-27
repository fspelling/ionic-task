import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

import { TasksService } from '../../services/tasks.service';
import { OverlayService } from 'src/app/core/services/overlay/overlay.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-task-save',
  templateUrl: './task-save.page.html',
  styleUrls: ['./task-save.page.scss'],
})
export class TaskSavePage implements OnInit {
  taskForm: FormGroup;
  titlePage: string;
  taskId: string;

  constructor(
    private fb: FormBuilder,
    private tasksService: TasksService,
    private navCtrl: NavController,
    private overlayServcie: OverlayService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.createForm();
    this.init();
  }

  init() {
    const taskId = this.route.snapshot.paramMap.get('id');
    if (!taskId) {
      this.titlePage = 'Create Task';
      return;
    }

    this.taskId = taskId;
    this.titlePage = 'Edit Task';

    this.tasksService.getById(taskId)
      .pipe(take(1))
      .subscribe(({ title, done }) => {
        this.taskForm.get('title').setValue(title);
        this.taskForm.get('done').setValue(done);
      });
  }

  private createForm() {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      done: [false]
    });
  }

  async onSubmit(): Promise<void> {
    const loading = await this.overlayServcie.loading({ message: 'Salvando' });
    loading.present();

    try {
      !this.taskId ?
        await this.tasksService.create(this.taskForm.value) :
        await this.tasksService.update({ id: this.taskId, ...this.taskForm.value });

      this.navCtrl.navigateBack('/tasks');
    } catch (error) {
      console.log('error = ', error);
      (await this.overlayServcie.toast({ message: error.message })).present();
    } finally {
      loading.dismiss();
    }
  }
}
