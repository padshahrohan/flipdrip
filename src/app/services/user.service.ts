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

  getApprovalListOfSellers() {
    return this.http.get<Response<User[]>>(this.url + '/admin/getApprovalListOfSellers');
  }

  approveSellerTokens(id: string) {
    let body = {
      SellerId : id
    }
    return this.http.put(this.url + '/admin/sellerTokensApproved', body);
  }

  getCurrentUser() {
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

  getApprovalListOfBuyers(sellerId: any) {
    return this.http.get<any>(this.url + `seller/getApprovalListOfBuyers?SellerId=${sellerId}`);
  }
}
