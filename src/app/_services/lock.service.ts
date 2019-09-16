import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Lock } from '../_models';

@Injectable()
export class LockService {
    constructor(private http: HttpClient) { }

    getCompanyLocks(id: number) {
        return this.http.get<Lock[]>(`${config.apiUrl}/locks/company/` + id);
    }

    locking(id: number, isLocked: boolean) {
      return this.http.patch(`${config.apiUrl}/locks/` + id + '/locking', { isLocked: isLocked});
  }
}