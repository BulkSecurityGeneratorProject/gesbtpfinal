import { BaseEntity } from './../../shared';

export const enum EtatChantier {
    'A_L_ETUDE',
    'EN_COURS',
    'EN_RETARD',
    'PERDU'
}

export class Chantier implements BaseEntity {
    constructor(
        public id?: number,
        public nomChantier?: string,
        public descriptionChantier?: string,
        public ville?: string,
        public adresse?: string,
        public etatChantier?: EtatChantier,
        public dateDebutReelle?: any,
        public dateFinReelle?: any,
        public dateDebutPrevu?: any,
        public dateFinPrevu?: any,
        public clientNomClient?: string,
        public clientId?: number,
        public affectation3S?: BaseEntity[],
        public chantiers?: BaseEntity[],
        public facture2S?: BaseEntity[],
    ) {
    }
}
