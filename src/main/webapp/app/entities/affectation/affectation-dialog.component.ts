import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Affectation } from './affectation.model';
import { AffectationPopupService } from './affectation-popup.service';
import { AffectationService } from './affectation.service';
import { Travaux, TravauxService } from '../travaux';
import { Chantier, ChantierService } from '../chantier';
import { Employe, EmployeService } from '../employe';

@Component({
    selector: 'jhi-affectation-dialog',
    templateUrl: './affectation-dialog.component.html'
})
export class AffectationDialogComponent implements OnInit {

    affectation: Affectation;
    isSaving: boolean;

    travauxes: Travaux[];

    chantiers: Chantier[];

    employes: Employe[];
    dateDebutDp: any;
    dateFinDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private affectationService: AffectationService,
        private travauxService: TravauxService,
        private chantierService: ChantierService,
        private employeService: EmployeService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        const id1 = +sessionStorage.getItem('entreprise_id');
        this.travauxService.query()
            .subscribe((res: HttpResponse<Travaux[]>) => { this.travauxes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.chantierService.findChantier(id1)
            .subscribe((res: HttpResponse<Chantier[]>) => {
                this.chantiers = res.body;
                const id = +sessionStorage.getItem('idChantier');
                let chantier1: Chantier = new Chantier();
                for (const chantier of this.chantiers) {
                    if (chantier.id === id) {
                        chantier1 = chantier;
                    }
                }
                this.chantiers = [];
                this.chantiers.push(chantier1);
                // this.affectation.chantierId = chantier1.clientId;
                // this.affectation.chantierNomChantier = chantier1.nomChantier;
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.employeService.findEmploye(+sessionStorage.getItem('entreprise_id'))
            .subscribe((res: HttpResponse<Employe[]>) => { this.employes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        if (!this.compareDate( this.affectation.dateDebut , this.affectation.dateFin )) {
            alert('La date de fin doit etre supperieur à la date de debut');
            this.onSaveError();
            this.jhiAlertService.error('the start date must be less than the end date', null, null);
           // this.router.navigate( ['chantiers/' + +sessionStorage.getItem('idClient')] );
        } else {
        this.isSaving = true;
        this.affectation.chantierId = +sessionStorage.getItem('idChantier');
        if (this.affectation.id !== undefined) {
            this.subscribeToSaveResponse(
                this.affectationService.update(this.affectation));
        } else {
            this.subscribeToSaveResponse(
                this.affectationService.create(this.affectation));
        }
    }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Affectation>>) {
        result.subscribe((res: HttpResponse<Affectation>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Affectation) {
        this.eventManager.broadcast({ name: 'affectationListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackTravauxById(index: number, item: Travaux) {
        return item.id;
    }

    trackChantierById(index: number, item: Chantier) {
        return item.id;
    }

    trackEmployeById(index: number, item: Employe) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
    compareDate(date1: any, date2: any) {
        const a1 = +date1['year'];
        const b1 = +date2['year'];
        const a2 = +date1['month'];
        const b2 = +date2['month'];
        const a3 = +date1['day'];
        const b3 = +date2['day'];
        if ( a1 <= b1 ) {
            if ( a2 <= b2 ) {
                if ( a3 <= b3 ) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
}

@Component({
    selector: 'jhi-affectation-popup',
    template: ''
})
export class AffectationPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private affectationPopupService: AffectationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.affectationPopupService
                    .open(AffectationDialogComponent as Component, params['id']);
            } else {
                this.affectationPopupService
                    .open(AffectationDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
