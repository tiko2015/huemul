import {
    DeepPartial,
    VendureEntity,
    Asset,
    Product,
    Channel,
    Seller,
} from '@vendure/core';
import { Column, Entity, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { OrganizationAddress } from './organization-address.entity';
import { OrganizationBranch } from './organization-branch.entity';
import { OrganizationType } from './organization-type.entity';

@Entity()
export class Organization extends VendureEntity {
    constructor(input?: DeepPartial<Organization>) {
        super(input);
    }

    @OneToMany(() => OrganizationAddress, (address) => address.organization)
    addresses: OrganizationAddress[];

    @ManyToMany(() => Channel)
    @JoinTable()
    channels: Channel[];

    @OneToMany(() => Product, (product) => (product.customFields as any).organization)
    products: Product[];

    @ManyToMany(() => Organization)
    @JoinTable()
    affiliatedWidth: Organization[];

    @ManyToOne(() => Seller, seller => (seller.customFields as any).organization)
    owner: Seller;

    @ManyToMany(() => Seller)
    @JoinTable()
    collaborators: Seller[];

    @ManyToOne(() => OrganizationType, type => type.organizations)
    type: OrganizationType;

    @ManyToMany(() => OrganizationBranch)
    @JoinTable()
    branches: OrganizationBranch[];

    @Column()
    code: string;

    @Column('varchar', { length: 255, default: '' })
    name: string;

    @Column({ default: true })
    enabled: boolean;

    @Column('text', { nullable: true, default: null })
    description: string;

    @Column('varchar', { length: 150, nullable: true })
    email: string;

    @Column('simple-array', { nullable: true })
    linksRRSS: string[];

    @ManyToOne(() => Asset, { onDelete: 'SET NULL', eager: true })
    logo: Asset;

    @ManyToOne(() => Asset, { onDelete: 'SET NULL', eager: true })
    banner: Asset;
}
