import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map, mergeMap } from 'rxjs';
import { Response } from 'src/model/response.model';
import { User } from 'src/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser: User;
  url = 'http://172.17.86.148:3000';

  constructor(private http: HttpClient) { }

  getCurrentUser () {
    const user = localStorage.getItem('currentUser');
    if (user) {
      return JSON.parse(user);
    } else {
      return null;
    }
    
  }

  login(body: any) {
    return this.http.post<Response<User>>(this.url + "/user/login", body).pipe(
      map((resp: Response<User>) => {
        localStorage.setItem('currentUser', JSON.stringify(resp.result));
        return resp.result;
      })
    );
  }

  register(body: any) {
    return this.http.post(this.url + "/user/register", body);
  }

  logout() {
    localStorage.removeItem('currentUser');
  }
}
