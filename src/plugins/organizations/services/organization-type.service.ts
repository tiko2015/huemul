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
import { ORGANIZATIONS_PLUGIN_OPTIONS } from '../constants';
import { OrganizationType } from '../entities/organization-type.entity';
import { PluginInitOptions } from '../types';

// These can be replaced by generated types if you set up code generation
interface CreateOrganizationTypeInput {
    code: string;
    name: string;
    // Define the input fields here
}
interface UpdateOrganizationTypeInput {
    id: ID;
    code?: string;
    name?: string;
    // Define the input fields here
}

@Injectable()
export class OrganizationTypeService {
    constructor(
        private connection: TransactionalConnection,
        private listQueryBuilder: ListQueryBuilder, @Inject(ORGANIZATIONS_PLUGIN_OPTIONS) private options: PluginInitOptions
    ) {}

    findAll(
        ctx: RequestContext,
        options?: ListQueryOptions<OrganizationType>,
        relations?: RelationPaths<OrganizationType>,
    ): Promise<PaginatedList<OrganizationType>> {
        return this.listQueryBuilder
            .build(OrganizationType, options, {
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
        relations?: RelationPaths<OrganizationType>,
    ): Promise<OrganizationType | null> {
        return this.connection
            .getRepository(ctx, OrganizationType)
            .findOne({
                where: { id },
                relations,
            });
    }

    async create(ctx: RequestContext, input: CreateOrganizationTypeInput): Promise<OrganizationType> {
        const newEntity = await this.connection.getRepository(ctx, OrganizationType).save(input);
        return assertFound(this.findOne(ctx, newEntity.id));
    }

    async update(ctx: RequestContext, input: UpdateOrganizationTypeInput): Promise<OrganizationType> {
        const entity = await this.connection.getEntityOrThrow(ctx, OrganizationType, input.id);
        const updatedEntity = patchEntity(entity, input);
        await this.connection.getRepository(ctx, OrganizationType).save(updatedEntity, { reload: false });
        return assertFound(this.findOne(ctx, updatedEntity.id));
    }

    async delete(ctx: RequestContext, id: ID): Promise<DeletionResponse> {
        const entity = await this.connection.getEntityOrThrow(ctx, OrganizationType, id);
        try {
            await this.connection.getRepository(ctx, OrganizationType).remove(entity);
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
