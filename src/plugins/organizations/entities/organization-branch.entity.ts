import {
    DeepPartial,
    VendureEntity
} from '@vendure/core';
import { Column, Entity, ManyToOne } from 'typeorm';


@Entity()
export class OrganizationBranch extends VendureEntity {
    constructor(input?: DeepPartial<OrganizationBranch>) {
        super(input);
    }

    @Column('varchar', { length: 255, default: '' })
    name: string;

    @ManyToOne(() => OrganizationBranch)
    parent: OrganizationBranch;
}
