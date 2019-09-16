import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User, Lock, Event } from '../_models';
import { UserService, LockService, EventService } from '../_services';
import { Router } from '@angular/router';

@Component({templateUrl: 'home.component.html'})
export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];
    locks: Lock[] = [];
    events: Event[] = [];
    companyId: number;
    isAdmin = false;

    constructor(
        private userService: UserService, 
        private lockService: LockService,
        private eventService: EventService,
        private router: Router) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        if (this.currentUser.role === "Admin") {
            this.isAdmin = true;
            this.loadAllUsers();
            this.getEvents();
        }
        else {
            this.getUser(Number(this.currentUser.id));
        }
    }

    locking(id: number, isLocked: boolean) {
        console.log('reached', id, isLocked);
        this.lockService.locking(id, isLocked).pipe(first()).subscribe(data => {
            window.location.reload();
        });
    }

    private getUser(id: number) {
        this.userService.getById(id).pipe(first()).subscribe(user => { 
            this.companyId = user['companyId'];
            if (this.companyId) {
                this.getCompanyLocks(this.companyId);
            }
        });
    }

    private getCompanyLocks(id: number) {
        this.lockService.getCompanyLocks(id).pipe(first()).subscribe(locks => { 
            this.locks = locks;
            for(let i = 0; i < this.locks.length; i++){
                if (this.locks[i]['locked_state'] === 'Unlocked') {
                    this.locks[i]['isLocked'] = false;
                } else {
                    this.locks[i]['isLocked'] = true;
                }
            }
            console.log(locks);
        });
    }

    private loadAllUsers() {
        this.userService.getAll().pipe(first()).subscribe(users => { 
            this.users = users;
        });
    }

    private getEvents() {
        this.eventService.getEvents().pipe(first()).subscribe(events => { 
            this.events = events;
            console.log(events);
        });
    }
}