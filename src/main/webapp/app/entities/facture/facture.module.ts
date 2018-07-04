import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GesBtpSharedModule } from '../../shared';
import {
    FactureService,
    FacturePopupService,
    FactureComponent,
    FactureDetailComponent,
    FactureDialogComponent,
    FacturePopupComponent,
    FactureDeletePopupComponent,
    FactureDeleteDialogComponent,
    factureRoute,
    facturePopupRoute,
    FactureResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...factureRoute,
    ...facturePopupRoute,
];

@NgModule({
    imports: [
        GesBtpSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        FactureComponent,
        FactureDetailComponent,
        FactureDialogComponent,
        FactureDeleteDialogComponent,
        FacturePopupComponent,
        FactureDeletePopupComponent,
    ],
    entryComponents: [
        FactureComponent,
        FactureDialogComponent,
        FacturePopupComponent,
        FactureDeleteDialogComponent,
        FactureDeletePopupComponent,
    ],
    providers: [
        FactureService,
        FacturePopupService,
        FactureResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GesBtpFactureModule {}
