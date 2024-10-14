import { InputMaybe } from './../ui/gql/graphql';
import { Seller } from '@vendure/core';
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
    patchEntity,
} from '@vendure/core';
import { omit } from '@vendure/common/lib/omit';
import { ORGANIZATIONS_PLUGIN_OPTIONS } from '../constants';
import { Organization } from '../entities/organization.entity';
import { OrganizationBranch } from '../entities/organization-branch.entity';
import { PluginInitOptions } from '../types';
import { OrganizationAddress } from '../entities/organization-address.entity';
import { OrganizationType } from '../entities/organization-type.entity';
import { CreateOrganizationInput, UpdateOrganizationInput } from '../gql/generated';

@Injectable()
export class OrganizationService {
    constructor(
        private connection: TransactionalConnection,
        private listQueryBuilder: ListQueryBuilder, @Inject(ORGANIZATIONS_PLUGIN_OPTIONS) private options: PluginInitOptions
    ) { }

    findAll(
        ctx: RequestContext,
        options?: ListQueryOptions<Organization>,
        relations?: RelationPaths<Organization>,
    ): Promise<PaginatedList<Organization>> {
        return this.listQueryBuilder
            .build(Organization, options, {
                relations,
                ctx,
            }
            ).getManyAndCount().then(([items, totalItems]) => {
                return {
                    items,
                    totalItems,
                }
            }
            );
    }

    findOne(
        ctx: RequestContext,
        id: ID,
        relations?: RelationPaths<Organization>,
    ): Promise<Organization | null> {
        return this.connection
            .getRepository(ctx, Organization)
            .findOne({
                where: { id },
                relations,
            });
    }

    async create(ctx: RequestContext, input: CreateOrganizationInput, relations?: RelationPaths<Organization>,): Promise<Organization> {
        const organization = new Organization(input);
        if (input.ownerId) {
            const owner = await this.connection.getRepository(ctx, Seller).findOne({ where: { id: input.ownerId } });
            if (owner) {
                organization.owner = owner;
            }
        }
        const newEntity = await this.connection.getRepository(ctx, Organization).save(organization);
        return assertFound(this.findOne(ctx, newEntity.id, relations));
    }

    async update(ctx: RequestContext, input: UpdateOrganizationInput, relations?: RelationPaths<Organization>,): Promise<Organization> {
        const entity = await this.connection.getEntityOrThrow(ctx, Organization, input.id);
        const updatedEntity = patchEntity(entity, omit(input, ['typeId', 'ownerId', 'branchesId', 'collaboratorsId', 'affiliatedWidthId', 'addressesId']));

        updatedEntity.owner = await this.loadRelatedEntity(ctx, input.ownerId, Seller);
        updatedEntity.type = await this.loadRelatedEntity(ctx, input.typeId, OrganizationType);

        updatedEntity.branches = await this.loadRelatedEntities(ctx, input.branchesId, OrganizationBranch);
        updatedEntity.collaborators = await this.loadRelatedEntities(ctx, input.collaboratorsId, Seller);
        updatedEntity.affiliatedWidth = await this.loadRelatedEntities(ctx, input.affiliatedWidthId, Organization);
        updatedEntity.addresses = await this.loadRelatedEntities(ctx, input.addressesId, OrganizationAddress);

        await this.connection.getRepository(ctx, Organization).save(updatedEntity, { reload: false });
        return assertFound(this.findOne(ctx, updatedEntity.id, relations));
    }

    async delete(ctx: RequestContext, id: ID): Promise<DeletionResponse> {
        const entity = await this.connection.getEntityOrThrow(ctx, Organization, id);
        try {
            await this.connection.getRepository(ctx, Organization).remove(entity);
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

    private async loadRelatedEntities<T>(
        ctx: RequestContext,
        ids: InputMaybe<string[]> | undefined,
        entityClass: any
    ): Promise<any> {
        if (!ids) {
            return [];
        }
        const entities = [];
        for (const id of ids) {
            const entity = await this.connection.getEntityOrThrow(ctx, entityClass, id);
            entities.push(entity);
        }
        return entities;
    }

    private async loadRelatedEntity<T>(
        ctx: RequestContext,
        id: InputMaybe<string> | undefined,
        entityClass: any
    ): Promise<any> {
        if (!id) {
            return;
        }
        return await this.connection.getEntityOrThrow(ctx, entityClass, id);
    }

}
