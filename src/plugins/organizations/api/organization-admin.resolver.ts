import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DeletionResponse, Permission } from '@vendure/common/lib/generated-types';
import {
    Allow,
    Ctx,
    ID,
    ListQueryOptions,
    PaginatedList,
    RelationPaths,
    Relations,
    RequestContext,
    Transaction
} from '@vendure/core';
import { Organization } from '../entities/organization.entity';
import { OrganizationService } from '../services/organization.service';
import { CreateOrganizationInput, UpdateOrganizationInput } from '../gql/generated';

@Resolver()
export class OrganizationAdminResolver {
    constructor(private organizationService: OrganizationService) { }

    @Query()
    @Allow(Permission.Public)
    async organization(
        @Ctx() ctx: RequestContext,
        @Args() args: { id: ID },
        @Relations(Organization) relations: RelationPaths<Organization>,
    ): Promise<Organization | null> {
        return this.organizationService.findOne(ctx, args.id, relations);
    }

    @Query()
    @Allow(Permission.Public)
    async organizations(
        @Ctx() ctx: RequestContext,
        @Args() args: { options: ListQueryOptions<Organization> },
        @Relations(Organization) relations: RelationPaths<Organization>,
    ): Promise<PaginatedList<Organization>> {
        return this.organizationService.findAll(ctx, args.options || undefined, relations);
    }

    @Mutation()
    @Transaction()
    @Allow(Permission.Owner)
    async createOrganization(
        @Ctx() ctx: RequestContext,
        @Args() args: { input: CreateOrganizationInput },
        @Relations(Organization) relations: RelationPaths<Organization>,
    ): Promise<Organization> {
        return this.organizationService.create(ctx, args.input, relations);
    }

    @Mutation()
    @Transaction()
    @Allow(Permission.Owner)
    async updateOrganization(
        @Ctx() ctx: RequestContext,
        @Args() args: { input: UpdateOrganizationInput },
        @Relations(Organization) relations: RelationPaths<Organization>,
    ): Promise<Organization> {
        return this.organizationService.update(ctx, args.input, relations);
    }

    @Mutation()
    @Transaction()
    @Allow(Permission.Owner)
    async deleteOrganization(@Ctx() ctx: RequestContext, @Args() args: { id: ID }): Promise<DeletionResponse> {
        return this.organizationService.delete(ctx, args.id);
    }
}
