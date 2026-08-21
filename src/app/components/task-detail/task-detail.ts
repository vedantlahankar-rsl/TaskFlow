import { Component, input, OnInit, signal } from '@angular/core';
import { TaskService } from '../../services/task';
import { Task } from '../../models/task';
import { TitleCasePipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-task-detail',
  imports: [TitleCasePipe, DatePipe, RouterLink],
  templateUrl: './task-detail.html',
  styleUrl: './task-detail.css',
})
export class TaskDetailComponent implements OnInit {
  id = input.required<string>();
  task = signal<Task | null>(null);

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.getTask(this.id()).subscribe((data) => {
      this.task.set(data);
    });
  }
}
