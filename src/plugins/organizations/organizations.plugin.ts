import { PluginCommonModule, Type, VendurePlugin } from '@vendure/core';
import { AdminUiExtension } from '@vendure/ui-devkit/compiler';
import * as path from 'path';

import { adminApiExtensions, shopApiExtensions } from './api/api-extensions';
import { OrganizationAddressAdminResolver } from './api/organization-address-admin.resolver';
import { OrganizationAdminResolver } from './api/organization-admin.resolver';
import { OrganizationBranchAdminResolver } from './api/organization-branch-admin.resolver';
import { OrganizationTypeAdminResolver } from './api/organization-type-admin.resolver';
import { ORGANIZATIONS_PLUGIN_OPTIONS, organizationPermission } from './constants';
import { OrganizationAddress } from './entities/organization-address.entity';
import { OrganizationBranch } from './entities/organization-branch.entity';
import { OrganizationType } from './entities/organization-type.entity';
import { Organization } from './entities/organization.entity';
import { OrganizationAddressService } from './services/organization-address.service';
import { OrganizationBranchService } from './services/organization-branch.service';
import { OrganizationTypeService } from './services/organization-type.service';
import { OrganizationService } from './services/organization.service';
import { PluginInitOptions } from './types';

@VendurePlugin({
    imports: [PluginCommonModule],
    providers: [{ provide: ORGANIZATIONS_PLUGIN_OPTIONS, useFactory: () => OrganizationsPlugin.options }, OrganizationService, OrganizationAddressService, OrganizationBranchService, OrganizationTypeService],
    configuration: config => {
        // Plugin-specific configuration
        // such as custom fields, custom permissions,
        // strategies etc. can be configured here by
        // modifying the `config` object.
        config.authOptions.customPermissions.push(organizationPermission);
        config.customFields.Product.push({
            name: 'organization',
            type: 'relation',
            graphQLType: 'Organization',
            public: false,
            entity: Organization,
            eager: true,
            ui: { component: 'organization' },
        });
        config.customFields.Seller.push({
            name: 'organization',
            list: true,
            type: 'relation',
            entity: Organization,
            internal: true,
        });
        return config;
    },
    compatibility: '^3.0.0',
    entities: [OrganizationAddress, OrganizationBranch, OrganizationType, Organization],
    adminApiExtensions: {
        schema: adminApiExtensions,
        resolvers: [OrganizationAddressAdminResolver, OrganizationBranchAdminResolver, OrganizationAdminResolver, OrganizationTypeAdminResolver]
    },
    shopApiExtensions: {
        schema: shopApiExtensions,
        resolvers: [OrganizationAddressAdminResolver, OrganizationBranchAdminResolver, OrganizationAdminResolver, OrganizationTypeAdminResolver],
    },
})
export class OrganizationsPlugin {
    static options: PluginInitOptions;

    static init(options: PluginInitOptions): Type<OrganizationsPlugin> {
        this.options = options;
        return OrganizationsPlugin;
    }

    static ui: AdminUiExtension = {
        id: 'organizations-ui',
        extensionPath: path.join(__dirname, 'ui'),
        routes: [{ route: 'organizations', filePath: 'routes.ts' }],
        providers: ['providers.ts'],
    };
}
