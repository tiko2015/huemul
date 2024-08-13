import { Seller, VendureEntity } from '@vendure/core';
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

// These can be replaced by generated types if you set up code generation
interface CreateOrganizationInput {
    code: string;
    name: string;
    enabled: boolean;
    description: string;
    email: string;
    owner: Seller;
    // Define the input fields here
}
interface UpdateOrganizationInput {
    id: ID;
    code?: string;
    name?: string;
    enabled?: boolean;
    description?: string;
    email?: string;
    owner?: Seller;
    type?: OrganizationType;
    collaborators?: [ID];
    branches?: [ID];
    affiliatedWidth?: [ID];
    linksRRSS?: [string];
    addresses?: [ID];
    // Define the input fields here
}

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

    async create(ctx: RequestContext, input: CreateOrganizationInput): Promise<Organization> {
        const newEntity = await this.connection.getRepository(ctx, Organization).save(input);
        return assertFound(this.findOne(ctx, newEntity.id));
    }

    async update(ctx: RequestContext, input: UpdateOrganizationInput): Promise<Organization> {
        const entity = await this.connection.getEntityOrThrow(ctx, Organization, input.id, {
            relations: ['owner', 'type']
        });
        const updatedEntity = patchEntity(entity, omit(input, ['branches', 'collaborators', 'affiliatedWidth', 'addresses']));

        updatedEntity.branches = await this.loadRelatedEntities(ctx, input.branches, OrganizationBranch);
        updatedEntity.collaborators = await this.loadRelatedEntities(ctx, input.collaborators, Seller);
        updatedEntity.affiliatedWidth = await this.loadRelatedEntities(ctx, input.affiliatedWidth, Organization);
        updatedEntity.addresses = await this.loadRelatedEntities(ctx, input.addresses, OrganizationAddress);

        await this.connection.getRepository(ctx, Organization).save(updatedEntity, { reload: false });
        return assertFound(this.findOne(ctx, updatedEntity.id));
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
        ids: ID[] | undefined,
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
}
