import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';

import { Task } from '../../models/task.model';
import { TasksService } from '../../services/tasks.service';
import { OverlayService } from 'src/app/core/services/overlay/overlay.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.page.html',
  styleUrls: ['./task-list.page.scss'],
})
export class TaskListPage implements OnInit {
  $tasks: Observable<Task[]>;

  constructor(
    private tasksService: TasksService,
    private navCtrl: NavController,
    private overlayService: OverlayService) { }

  async ngOnInit(): Promise<void> {
    const loading = await this.overlayService.loading({ message: 'Carregando...' });
    loading.present();

    this.$tasks = this.tasksService.getAll();
    this.$tasks.pipe(take(1)).subscribe(() => loading.dismiss());
  }

  onUpdate(task: Task) {
    this.navCtrl.navigateForward(['tasks', 'edit', task.id]);
  }

  async onDelete(task: Task): Promise<void> {
    this.overlayService.alert({
      message: `Deseja realmente deletar a task "${task.title}"?`,
      buttons: [
        {
          text: 'Sim',
          handler: async () => {
            await this.tasksService.delete(task);
            await this.overlayService.toast({ message: `Task "${task.title}" deletado com sucesso` });
          }
        }
      ]
    });
  }

  async onDone(task: Task): Promise<void> {
    const newTask = { ...task, done: !task.done };
    await this.tasksService.update(newTask);
    this.overlayService.toast({ message: `Task "${task.title}" ${newTask.done ? 'completado' : 'atualizado'}` });
  }
}
