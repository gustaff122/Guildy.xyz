import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Project } from '../interfaces/project-interface';
import { ProjectPatchName } from '../interfaces/project-patchname-interface';
import { TaskInterface } from '../interfaces/task-interface';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})


export class ProjectService {

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
  
  createProject(name: string) {
    return this.httpClient.post(`${this.API_URL}/projects/new`, {uid: this.uid, title: name}, { responseType: 'text' }) //why <string> does not work?
  }

  getAllProjects(uid: string) {
    return this.httpClient.get<Project[]>(`${this.API_URL}/projects/userprojects/${uid}`)
  }

  getProject(id: string) {
    return this.httpClient.get<Project>(`${this.API_URL}/projects/${id}`)
  }

  patchProjetName(projectName: ProjectPatchName) {
    return this.httpClient.patch<ProjectPatchName>(`${this.API_URL}/projects/title/`, projectName)
  }

  addProjectWorkers(project: string, worker: string) {
    return this.httpClient.post(`${this.API_URL}/projects/workers/`, {project: project, worker: worker}, {responseType: 'text'}) //why <string> does not work?
  }

  removeProjectWorkers(project: string, worker: string) {
    return this.httpClient.patch(`${this.API_URL}/projects/workers/`, {project: project, worker: worker}, {responseType: 'text'}) //why <string> does not work?
  }

  deleteProject(project: string) {
    return this.httpClient.post(`${this.API_URL}/projects/remove/`, {project: project}, {responseType: 'text'}) //why <string> does not work?
  }
}
