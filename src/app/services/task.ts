import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/todos';

  constructor(private http: HttpClient) {}

  // Fetch a list of tasks
  getTasks(): Observable<Task[]> {
    return this.http.get<any[]>(`${this.apiUrl}?_limit=5`).pipe(
      map((todos) =>
        todos.map((todo) => ({
          id: todo.id,
          title: todo.title,
          description: 'Fetched from JSONPlaceholder API...',
          priority: todo.id % 2 === 0 ? 'high' : 'low',
          completed: todo.completed,
          dueDate: '2025-10-31',
        })),
      ),
    );
  }

  // Fetch a single task by ID
  getTask(id: string): Observable<Task> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map((todo) => ({
        id: todo.id,
        title: todo.title,
        description: 'Fetched from JSONPlaceholder API...',
        priority: 'medium',
        completed: todo.completed,
        dueDate: '2025-10-31',
      })),
    );
  }
}
