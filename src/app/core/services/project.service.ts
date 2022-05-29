import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UserState } from 'src/app/shared/store/user.state';
import { environment } from 'src/environments/environment';
import { Project } from '../interfaces/project-interface';
import { ProjectPatchName } from '../interfaces/project-patchname-interface';
import { TaskInterface } from '../interfaces/task-interface';
import { SignService } from './sign.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private API_URL = environment.apiURL;
  public uid!: string;

  constructor(
    private httpClient: HttpClient,
    private signService: SignService
  ) { 
    this.signService.getSelf().subscribe(res => {
      this.uid = res.uid!
    })
  }

  createProject() {
    return this.httpClient.post<Project>(`${this.API_URL}/projects/new`, {"uid": this.uid}).subscribe(res => console.log(res))
  }

  getAllProjects(uid: string) {
    return this.httpClient.get<Project>(`${this.API_URL}/projects/userprojects/${uid}`)
  }

  getProject(id: string) {
    return this.httpClient.get<Project>(`${this.API_URL}/projects/${id}`)
  }

  patchProjetName(projectName: ProjectPatchName) {
    return this.httpClient.patch<ProjectPatchName>(`${this.API_URL}/projects/title/`, projectName)
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

  addProjectWorkers(project: string, worker: string) {
    return this.httpClient.post<string>(`${this.API_URL}/projects/workers/`, {project: project, worker: worker})
  }

  removeProjectWorkers(project: string, worker: string) {
    return this.httpClient.patch<string>(`${this.API_URL}/projects/workers/`, {project: project, worker: worker})
  }

  getTaskCategory(project: string, task: string) {
    return this.httpClient.post(`${this.API_URL}/task/category/`, {project: project, task: task}, {responseType: 'text'})
  }
}
``