import { Component, signal, computed, OnInit } from '@angular/core';
import { TitleCasePipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Task } from '../../models/task';
import { TruncatePipe } from '../../pipes/truncate-pipe';
import { TaskService } from '../../services/task';

@Component({
  selector: 'app-task-list',
  imports: [TitleCasePipe, DatePipe, TruncatePipe, RouterLink],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskListComponent implements OnInit {
  // Signals for state
  tasks = signal<Task[]>([]);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);

  completedTasksCount = computed(() => this.tasks().filter((t) => t.completed).length);

  // Inject the service
  constructor(private taskService: TaskService) {}

  // Subscribe to HTTP call on initialization
  ngOnInit() {
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load tasks from API.');
        this.loading.set(false);
      },
    });
  }

  toggleCompletion(taskId: number) {
    this.tasks.update((tasks) =>
      tasks.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t)),
    );
  }
}
