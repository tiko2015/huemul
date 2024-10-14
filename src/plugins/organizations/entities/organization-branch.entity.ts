import { ID } from '@vendure/common/lib/shared-types';
import {
    DeepPartial,
    VendureEntity,
    EntityId,
    Asset
} from '@vendure/core';
import { Column, Entity, TreeParent, TreeChildren, ManyToOne } from 'typeorm';
@Entity()
export class OrganizationBranch extends VendureEntity {
    constructor(input?: DeepPartial<OrganizationBranch>) {
        super(input);
    }

    @Column('varchar', { length: 255, default: '' })
    name: string;

    @Column({ default: false })
    isPrivate: boolean;

    @Column({ default: false })
    isRoot: boolean;

    @Column('varchar', { length: 255, default: '' })
    slug: string;

    @TreeChildren()
    children: OrganizationBranch[];

    @TreeParent()
    parent: OrganizationBranch | null;

    @EntityId({ nullable: true })
    parentId: ID;

    @ManyToOne(() => Asset, { onDelete: 'SET NULL', eager: true })
    logo: Asset;
}
