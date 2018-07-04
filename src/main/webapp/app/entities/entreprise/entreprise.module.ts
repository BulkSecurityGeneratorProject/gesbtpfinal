import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GesBtpSharedModule } from '../../shared';
import {
    EntrepriseService,
    EntreprisePopupService,
    EntrepriseComponent,
    EntrepriseDetailComponent,
    EntrepriseDialogComponent,
    EntreprisePopupComponent,
    EntrepriseDeletePopupComponent,
    EntrepriseDeleteDialogComponent,
    entrepriseRoute,
    entreprisePopupRoute,
} from './';

const ENTITY_STATES = [
    ...entrepriseRoute,
    ...entreprisePopupRoute,
];

@NgModule({
    imports: [
        GesBtpSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EntrepriseComponent,
        EntrepriseDetailComponent,
        EntrepriseDialogComponent,
        EntrepriseDeleteDialogComponent,
        EntreprisePopupComponent,
        EntrepriseDeletePopupComponent,
    ],
    entryComponents: [
        EntrepriseComponent,
        EntrepriseDialogComponent,
        EntreprisePopupComponent,
        EntrepriseDeleteDialogComponent,
        EntrepriseDeletePopupComponent,
    ],
    providers: [
        EntrepriseService,
        EntreprisePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GesBtpEntrepriseModule {}
