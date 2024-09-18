import { Inject, Injectable } from '@nestjs/common';
import { DeletionResponse, DeletionResult } from '@vendure/common/lib/generated-types';
import { ID, PaginatedList } from '@vendure/common/lib/shared-types';
import {
    ListQueryBuilder,
    ListQueryOptions,
    RelationPaths,
    RequestContext,
    TransactionalConnection,
    assertFound,
    patchEntity
} from '@vendure/core';
import { Point } from 'geojson';
import { ORGANIZATIONS_PLUGIN_OPTIONS } from '../constants';
import { Organization } from '../entities/organization.entity';
import { OrganizationAddress } from '../entities/organization-address.entity';
import { PluginInitOptions } from '../types';
import { CreateOrganizationAddressInput, UpdateOrganizationAddressInput } from '../gql/generated'

@Injectable()
export class OrganizationAddressService {
    constructor(
        private connection: TransactionalConnection,
        private listQueryBuilder: ListQueryBuilder,
        @Inject(ORGANIZATIONS_PLUGIN_OPTIONS) private options: PluginInitOptions
    ) { }

    async findAll(
        ctx: RequestContext,
        options?: ListQueryOptions<OrganizationAddress>,
        relations?: RelationPaths<OrganizationAddress>,
    ): Promise<PaginatedList<OrganizationAddress>> {
        const qb = this.listQueryBuilder.build(OrganizationAddress, options, {
            relations,
            ctx,
            customPropertyMap: {
                organizationName: 'organization.name',
                organizationType: 'organization.type',
            },
        });

        const [items, totalItems] = await qb.getManyAndCount();
        return {
            items,
            totalItems,
        };
    }

    async findAllByDistance(
        ctx: RequestContext,
        args: {
            take?: number,
            longitude?: number,
            latitude?: number,
            name?: string,
            type?: ID,
        },
        relations?: RelationPaths<OrganizationAddress>,
    ): Promise<PaginatedList<OrganizationAddress>> {
        const { take, longitude, latitude, name, type } = { ...args };

        const qb = this.connection.getRepository(ctx, OrganizationAddress).createQueryBuilder('organizationaddress');

        qb.leftJoinAndSelect('organizationaddress.organization', 'organization');
        qb.leftJoinAndSelect('organization.type', 'organizationType');

        if (longitude !== undefined && latitude !== undefined) {
            qb.addSelect(`
                ST_Distance(
                    organizationAddress.location::geography,
                    ST_SetSRID(ST_MakePoint(:longitude, :latitude), 4326)::geography
                ) AS distance
            `)
                .setParameter('longitude', longitude)
                .setParameter('latitude', latitude)
                .orderBy('distance', 'ASC');
        }

        if (name) qb.andWhere('organization.name ILIKE :name', { name: `%${name}%` });

        if (type) qb.andWhere('organization.typeId = :type', { type });

        if (take) qb.limit(take);

        const [items, totalItems] = await qb.getManyAndCount();

        return {
            items,
            totalItems,
        };
    }

    findOne(
        ctx: RequestContext,
        id: ID,
        relations?: RelationPaths<OrganizationAddress>,
    ): Promise<OrganizationAddress | null> {
        return this.connection
            .getRepository(ctx, OrganizationAddress)
            .findOne({
                where: { id },
                relations,
            });
    }

    async create(ctx: RequestContext, input: CreateOrganizationAddressInput): Promise<OrganizationAddress> {
        let location: Point | null = null;
        let organization: Organization | undefined;

        if (input.location) {
            location = {
                type: 'Point',
                coordinates: [input.location.longitude, input.location.latitude],
            };
        }
        if (input.organization) {
            organization = await this.connection.getEntityOrThrow(ctx, Organization, input.organization);
        }

        const updatedEntity = this.connection.getRepository(ctx, OrganizationAddress).create({
            ...input,
            location,
            organization
        });

        const newEntity = await this.connection.getRepository(ctx, OrganizationAddress).save(updatedEntity);
        return assertFound(this.findOne(ctx, newEntity.id));
    }

    async update(ctx: RequestContext, input: UpdateOrganizationAddressInput): Promise<OrganizationAddress> {
        const entity = await this.connection.getEntityOrThrow(ctx, OrganizationAddress, input.id);
        if (input.location) {
            const point: Point = {
                type: 'Point',
                coordinates: [input.location.longitude, input.location.latitude],
            };

            entity.location = point;
        }
        if (input.organization) {
            entity.organization = await this.connection.getEntityOrThrow(ctx, Organization, input.organization);
        }

        const { location, organization, ...restInput } = input;
        const updatedEntity = patchEntity(entity, restInput);
        await this.connection.getRepository(ctx, OrganizationAddress).save(updatedEntity, { reload: false });
        return assertFound(this.findOne(ctx, updatedEntity.id));
    }

    async delete(ctx: RequestContext, id: ID): Promise<DeletionResponse> {
        const entity = await this.connection.getEntityOrThrow(ctx, OrganizationAddress, id);
        try {
            await this.connection.getRepository(ctx, OrganizationAddress).remove(entity);
            return {
                result: DeletionResult.DELETED,
            };
        } catch (e: any) {
            return {
                result: DeletionResult.NOT_DELETED,
                message: e.toString(),
            };
        }
    }
}
