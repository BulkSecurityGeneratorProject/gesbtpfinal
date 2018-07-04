import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Chantier } from './chantier.model';
import { ChantierPopupService } from './chantier-popup.service';
import { ChantierService } from './chantier.service';
import { Client, ClientService } from '../client';

@Component({
    selector: 'jhi-chantier-dialog',
    templateUrl: './chantier-dialog.component.html'
})
export class ChantierDialogComponent implements OnInit {

    chantier: Chantier;
    isSaving: boolean;

    clients: Client[];
    dateDebutReelleDp: any;
    dateFinReelleDp: any;
    dateDebutPrevuDp: any;
    dateFinPrevuDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private chantierService: ChantierService,
        private clientService: ClientService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.clientService.query()
            .subscribe((res: HttpResponse<Client[]>) => { this.clients = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.chantier.id !== undefined) {
            this.subscribeToSaveResponse(
                this.chantierService.update(this.chantier));
        } else {
            this.subscribeToSaveResponse(
                this.chantierService.create(this.chantier));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Chantier>>) {
        result.subscribe((res: HttpResponse<Chantier>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Chantier) {
        this.eventManager.broadcast({ name: 'chantierListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackClientById(index: number, item: Client) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-chantier-popup',
    template: ''
})
export class ChantierPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private chantierPopupService: ChantierPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.chantierPopupService
                    .open(ChantierDialogComponent as Component, params['id']);
            } else {
                this.chantierPopupService
                    .open(ChantierDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
