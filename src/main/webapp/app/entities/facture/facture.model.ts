import { BaseEntity } from './../../shared';

export class Facture implements BaseEntity {
    constructor(
        public id?: number,
        public dateCreation?: any,
        public validite?: any,
        public remise?: number,
        public chantierNomChantier?: string,
        public chantierId?: number,
        public travauxNomTrav?: string,
        public travauxId?: number,
        public entrepriseName?: string,
        public entrepriseId?: number,
        public factures?: BaseEntity[],
    ) {
    }
}
