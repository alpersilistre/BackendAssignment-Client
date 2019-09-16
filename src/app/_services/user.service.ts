import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${config.apiUrl}/accounts/users`);
    }

    getById(id: number) {
        return this.http.get(`${config.apiUrl}/accounts/users/` + id);
    }

    register(user: User) {
        return this.http.post(`${config.apiUrl}/accounts/register`, user);
    }
}