import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Event } from '../_models';

@Injectable()
export class EventService {
    constructor(private http: HttpClient) { }

    getEvents() {
        return this.http.get<Event[]>(`${config.apiUrl}/events`);
    }
}