import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Account, LoginModalService, Principal } from '../shared';

import { /*Component,*/ AfterViewInit, Renderer, ElementRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
/*import { JhiEventManager } from 'ng-jhipster';*/

import { LoginService } from '../shared/login/login.service';
import { StateStorageService } from '../shared/auth/state-storage.service';
import { Client, ClientService } from '../entities/client';
import { HttpResponse } from '@angular/common/http';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: [
        'home.css',
        'home.scss'
    ]

})
export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;
    authenticationError: boolean;
    password: string;
    rememberMe: boolean;
    username: string;
    credentials: any;
    typepaiement: string;
    clients: Client[];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    dataSource: MatTableDataSource<Client>;
    displayedColumns = ['nomClient', 'villeClient', 'adresseClient'];

    constructor(
        private principal: Principal,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager,

        // private eventManager: JhiEventManager,
        private loginService: LoginService,
        private stateStorageService: StateStorageService,
        private elementRef: ElementRef,
        private renderer: Renderer,
        private router: Router,
        private clientService: ClientService,
        // public activeModal: NgbActiveModal
    ) {
        this.credentials = {};
    }

    ngOnInit() {
            this.principal.identity().then((account) => {
            this.account = account;
            this.load(account.entreprise.id);
            sessionStorage.setItem('entreprise_id', account.entreprise.id );
            this.registerAuthenticationSuccess();
        });
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', (message) => {
            this.principal.identity().then((account) => {
                this.account = account;
                this.router.navigate(['/']);
            });
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }
    cancel() {
        this.credentials = {
            username: null,
            password: null,
            rememberMe: true
        };
        this.authenticationError = false;
        // this.activeModal.dismiss('cancel');
    }

    register() {
        // this.activeModal.dismiss('to state register');
        this.router.navigate(['/register']);
    }

    requestResetPassword() {
        // this.activeModal.dismiss('to state requestReset');
        this.router.navigate(['/reset', 'request']);
    }
    load(id) {
        this.clientService.findClient(id)
            .subscribe((clientResponse: HttpResponse<Client[]>) => {
                this.clients = clientResponse.body;
                this.dataSource = new MatTableDataSource(this.clients);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            });
}
applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
  }
}
