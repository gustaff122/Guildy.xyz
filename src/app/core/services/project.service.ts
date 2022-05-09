import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UserState } from 'src/app/shared/store/user.state';
import { environment } from 'src/environments/environment';
import { Project } from '../interfaces/project-interface';
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

  patchProjetName(title: string, id: string) {
    return this.httpClient.patch(`${this.API_URL}/projects/title`, {title: title, id: id})
  }
}
