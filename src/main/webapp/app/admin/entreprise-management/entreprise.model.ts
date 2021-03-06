import { BaseEntity, User } from './../../shared';

export class Entreprise implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public users?: User[],
    ) {
    }
}
