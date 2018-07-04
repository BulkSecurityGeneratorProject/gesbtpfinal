import { BaseEntity } from './../../shared';

export const enum EtatAffectation {
    'TERMINER',
    'EN_COURS',
    'EN_RETARD'
}

export class Affectation implements BaseEntity {
    constructor(
        public id?: number,
        public dateDebut?: any,
        public dateFin?: any,
        public etat?: EtatAffectation,
        public travauxNomTrav?: string,
        public travauxId?: number,
        public chantierNomChantier?: string,
        public chantierId?: number,
        public employes?: BaseEntity[],
    ) {
    }
}
