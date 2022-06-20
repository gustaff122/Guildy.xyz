import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TaskInterface } from '../interfaces/task-interface';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private API_URL = environment.apiURL;
  public uid!: string;

  constructor(
    private httpClient: HttpClient,
    private userService: UserService
  ) {
    this.userService.getSelf().subscribe(res => {
      this.uid = res.uid!
    })
  }

  
  createTask(task: TaskInterface, project: string) {
    return this.httpClient.post(`${this.API_URL}/task/`, {task: task, project: project})
  }

  patchTask(task: TaskInterface, project: string) {
    return this.httpClient.patch<string>(`${this.API_URL}/task/`, {task: task, project: project})
  }

  moveTask(task: TaskInterface, project: string, category: string) {
    return this.httpClient.patch<string>(`${this.API_URL}/task/move`, {task: task, project: project, category: category})
  }


  //unused
  getTask(project: string, task: string) {
    return this.httpClient.post<TaskInterface>(`${this.API_URL}/task/data/`, {project: project, task: task})
  }
}
