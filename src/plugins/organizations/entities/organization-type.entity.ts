import {
    DeepPartial,
    VendureEntity
} from '@vendure/core';
import { Column, Entity, OneToMany } from 'typeorm';
import { Organization } from './organization.entity';


@Entity()
export class OrganizationType extends VendureEntity {
    constructor(input?: DeepPartial<OrganizationType>) {
        super(input);
    }

    @Column()
    code: string;

    @Column('varchar', { length: 255, default: '' })
    name: string;

    @OneToMany(() => Organization, organization => organization.type)
    organizations: Organization[];
}
