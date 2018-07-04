import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Facture } from './facture.model';
import { FacturePopupService } from './facture-popup.service';
import { FactureService } from './facture.service';
import { Chantier, ChantierService } from '../chantier';
import { Travaux, TravauxService } from '../travaux';
import { Entreprise, EntrepriseService } from '../entreprise';

@Component({
    selector: 'jhi-facture-dialog',
    templateUrl: './facture-dialog.component.html'
})
export class FactureDialogComponent implements OnInit {

    facture: Facture;
    isSaving: boolean;

    chantiers: Chantier[];

    travauxes: Travaux[];

    entreprises: Entreprise[];
    dateCreationDp: any;
    validiteDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private factureService: FactureService,
        private chantierService: ChantierService,
        private travauxService: TravauxService,
        private entrepriseService: EntrepriseService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.chantierService.query()
            .subscribe((res: HttpResponse<Chantier[]>) => { this.chantiers = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.travauxService.query()
            .subscribe((res: HttpResponse<Travaux[]>) => { this.travauxes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.entrepriseService.query()
            .subscribe((res: HttpResponse<Entreprise[]>) => { this.entreprises = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.facture.id !== undefined) {
            this.subscribeToSaveResponse(
                this.factureService.update(this.facture));
        } else {
            this.subscribeToSaveResponse(
                this.factureService.create(this.facture));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Facture>>) {
        result.subscribe((res: HttpResponse<Facture>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Facture) {
        this.eventManager.broadcast({ name: 'factureListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackChantierById(index: number, item: Chantier) {
        return item.id;
    }

    trackTravauxById(index: number, item: Travaux) {
        return item.id;
    }

    trackEntrepriseById(index: number, item: Entreprise) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-facture-popup',
    template: ''
})
export class FacturePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private facturePopupService: FacturePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.facturePopupService
                    .open(FactureDialogComponent as Component, params['id']);
            } else {
                this.facturePopupService
                    .open(FactureDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
