import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map, mergeMap } from 'rxjs';
import { User } from 'src/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: Subject<User> = new Subject<User>();
  user$ = this.user.asObservable();

  constructor(private http: HttpClient) { }

  login(body: any) {
    return this.http.post<User>("http://172.17.87.26:3000/user/login", body).pipe(
      map((resp: User) => {
        this.user.next(resp)
        return resp;
      })
    );
  }

  register(body: any) {

  }
}
