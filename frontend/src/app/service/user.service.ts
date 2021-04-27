import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.url;
  constructor(private http: HttpClient) {}

  addUser(data:any){
    return this.http.post(`${this.baseUrl}/addNewUser`,data)
  }

  getAllUser(){
    const user = JSON.parse( localStorage.getItem('userData'))
    return this.http.get(`${this.baseUrl}/getAllUsers/${user.id}`)
  }
  deleteUser(userId){
    return this.http.delete(`${this.baseUrl}/deleteUserById/${userId}`)
  }
}
