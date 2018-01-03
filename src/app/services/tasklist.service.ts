import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { CommonService } from './common.service';
interface Tasklist {
  title: string,
  details: string,
  length: number
}

@Injectable()
export class TasklistService {
  private tasklists: BehaviorSubject<any> = new BehaviorSubject({});
  tasklist = this.tasklists.asObservable();
  constructor(
    private http: HttpClient,
    private cs: CommonService
  ) { }

  refreshTasklist(tasklist) {
    this.tasklists.next(tasklist);
  }

  getTasklist(skip, limit): Observable<Tasklist> {
    return this.http.get<Tasklist>(this.cs.endpoint + '/tasklist', {
      params: new HttpParams()
        .set("skip", skip)
        .set("limit", limit)
    });
  }

  addTasklist(tasklist): Observable<Tasklist> {
    return this.http.post<Tasklist>(this.cs.endpoint + '/tasklist', tasklist);
  }

  editTasklist(_id, tasklist): Observable<Tasklist> {
    let headers = new HttpHeaders()
    headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.put<Tasklist>(this.cs.endpoint + '/tasklist/' + _id, tasklist, {headers});
  }

  deleteTasklist(_id) {
    return this.http.delete<Tasklist>(this.cs.endpoint + '/tasklist/' + _id);
  }
}
