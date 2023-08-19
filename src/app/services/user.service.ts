import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map, mergeMap } from 'rxjs';
import { Response } from 'src/model/response.model';
import { User } from 'src/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'http://172.17.86.148:3000';
  user: Subject<User> = new Subject<User>();
  user$ = this.user.asObservable();

  constructor(private http: HttpClient) { }

  login(body: any) {
    return this.http.post<Response<User>>(this.url + "/user/login", body).pipe(
      map((resp: Response<User>) => {
        this.user.next(resp.result);
        return resp.result;
      })
    );
  }

  register(body: any) {
    return this.http.post(this.url + "/user/register", body);
  }

  logout() {
    this.user.complete();
  }
}
