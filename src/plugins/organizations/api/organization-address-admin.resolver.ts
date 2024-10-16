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
import { OrganizationAddress } from '../entities/organization-address.entity';
import { OrganizationAddressService } from '../services/organization-address.service';
import { CreateOrganizationAddressInput, UpdateOrganizationAddressInput } from '../gql/generated'

@Resolver()
export class OrganizationAddressAdminResolver {
    constructor(private organizationAddressService: OrganizationAddressService) { }

    @Query()
    @Allow(Permission.Public)
    async organizationAddress(
        @Ctx() ctx: RequestContext,
        @Args() args: { id: ID },
        @Relations(OrganizationAddress) relations: RelationPaths<OrganizationAddress>,
    ): Promise<OrganizationAddress | null> {
        return this.organizationAddressService.findOne(ctx, args.id, relations);
    }

    @Query()
    @Allow(Permission.Public)
    async organizationAddresses(
        @Ctx() ctx: RequestContext,
        @Args() args: { options: ListQueryOptions<OrganizationAddress> },
        @Relations(OrganizationAddress) relations: RelationPaths<OrganizationAddress>,
    ): Promise<PaginatedList<OrganizationAddress>> {
        return this.organizationAddressService.findAll(ctx, args.options || undefined, relations);
    }

    @Query()
    @Allow(Permission.Public)
    async organizationAddressesByDistance(
        @Ctx() ctx: RequestContext,
        @Args() args: {
            take: number
            longitude?: number,
            latitude?: number,
            name?: string,
            type?: ID,
        },
        @Relations(OrganizationAddress) relations: RelationPaths<OrganizationAddress>,
    ): Promise<PaginatedList<OrganizationAddress>> {
        return this.organizationAddressService.findAllByDistance(ctx, args, relations);
    }

    @Mutation()
    @Transaction()
    @Allow(Permission.Owner)
    async createOrganizationAddress(
        @Ctx() ctx: RequestContext,
        @Args() args: { input: CreateOrganizationAddressInput },
    ): Promise<OrganizationAddress> {
        return this.organizationAddressService.create(ctx, args.input);
    }

    @Mutation()
    @Transaction()
    @Allow(Permission.Owner)
    async updateOrganizationAddress(
        @Ctx() ctx: RequestContext,
        @Args() args: { input: UpdateOrganizationAddressInput },
    ): Promise<OrganizationAddress> {
        return this.organizationAddressService.update(ctx, args.input);
    }

    @Mutation()
    @Transaction()
    @Allow(Permission.Owner)
    async deleteOrganizationAddress(@Ctx() ctx: RequestContext, @Args() args: { id: ID }): Promise<DeletionResponse> {
        return this.organizationAddressService.delete(ctx, args.id);
    }
}
