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
import { OrganizationBranch } from '../entities/organization-branch.entity';
import { PluginInitOptions } from '../types';

// These can be replaced by generated types if you set up code generation
interface CreateOrganizationBranchInput {
    name: string;
    parent: OrganizationBranch;
    // Define the input fields here
}
interface UpdateOrganizationBranchInput {
    id: ID;
    name?: string;
    parent?: OrganizationBranch;
    // Define the input fields here
}

@Injectable()
export class OrganizationBranchService {
    constructor(
        private connection: TransactionalConnection,
        private listQueryBuilder: ListQueryBuilder, @Inject(ORGANIZATIONS_PLUGIN_OPTIONS) private options: PluginInitOptions
    ) { }

    findAll(
        ctx: RequestContext,
        options?: ListQueryOptions<OrganizationBranch>,
        relations?: RelationPaths<OrganizationBranch>,
    ): Promise<PaginatedList<OrganizationBranch>> {
        return this.listQueryBuilder
            .build(OrganizationBranch, options, {
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
        relations?: RelationPaths<OrganizationBranch>,
    ): Promise<OrganizationBranch | null> {
        return this.connection
            .getRepository(ctx, OrganizationBranch)
            .findOne({
                where: { id },
                relations,
            });
    }

    async create(ctx: RequestContext, input: CreateOrganizationBranchInput): Promise<OrganizationBranch> {
        const newEntity = await this.connection.getRepository(ctx, OrganizationBranch).save(input);
        return assertFound(this.findOne(ctx, newEntity.id));
    }

    async update(ctx: RequestContext, input: UpdateOrganizationBranchInput): Promise<OrganizationBranch> {
        const entity = await this.connection.getEntityOrThrow(ctx, OrganizationBranch, input.id, {
            relations: ['parent'],
        });
        const updatedEntity = patchEntity(entity, input);
        await this.connection.getRepository(ctx, OrganizationBranch).save(updatedEntity, { reload: false });
        return assertFound(this.findOne(ctx, updatedEntity.id));
    }

    async delete(ctx: RequestContext, id: ID): Promise<DeletionResponse> {
        const entity = await this.connection.getEntityOrThrow(ctx, OrganizationBranch, id);
        try {
            await this.connection.getRepository(ctx, OrganizationBranch).remove(entity);
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
