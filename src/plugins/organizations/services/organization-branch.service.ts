import { Inject, Injectable } from '@nestjs/common';
import { DeletionResponse, DeletionResult } from '@vendure/common/lib/generated-types';
import { ID, PaginatedList } from '@vendure/common/lib/shared-types';
import {
    Asset,
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
import { CreateOrganizationBranchInput, InputMaybe, UpdateOrganizationBranchInput } from '../gql/generated';

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

        const { parentId, ...restInput } = input;

        const parentEntity = (parentId) && await this.connection.getEntityOrThrow(ctx, OrganizationBranch, parentId);
        const isRoot = (!parentEntity) ? true : false;

        const newEntity = await this.connection.getRepository(ctx, OrganizationBranch).save({
            ...restInput,
            parent: parentEntity ? parentEntity : undefined,
            isRoot,
        });

        return assertFound(this.findOne(ctx, newEntity.id));
    }

    async update(ctx: RequestContext, input: UpdateOrganizationBranchInput): Promise<OrganizationBranch> {
        const entity = await this.connection.getEntityOrThrow(ctx, OrganizationBranch, input.id);
        const { parentId, logo, ...restInput } = input;
        const newlogo = (logo) ? await this.connection.getEntityOrThrow(ctx, Asset, logo) : undefined;
        const parentEntity = (parentId) && await this.connection.getEntityOrThrow(ctx, OrganizationBranch, parentId);
        const isRoot = (parentEntity) ? false : (parentId === null) ? true : undefined;

        const updatedEntity = patchEntity(entity, restInput);
        await this.connection.getRepository(ctx, OrganizationBranch).save(
            {
                ...updatedEntity,
                parent: parentEntity ? parentEntity : (parentId === null) ? null : undefined,
                isRoot,
                logo: newlogo,
            },
            { reload: false }
        );
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
