import { registerRouteComponent } from '@vendure/admin-ui/core';
import { OrganizationListComponent } from './components/organization-list/organization-list.component';
import { OrganizationDetailComponent } from './components/organization-detail/organization-detail.component';
import { getOrganizationDetailDocument } from './components/organization-detail/organization-detail.component.graphql';
import { OrganizationTypeListComponent } from './components/organization-type-list/organization-type-list.component';
import { getOrganizationTypeDetailDocument } from './components/organization-type-detail/organization-type-detail.component.graphql';
import { OrganizationTypeDetailComponent } from './components/organization-type-detail/organization-type-detail.component';
import { OrganizationBranchListComponent } from './components/organization-branch-list/organization-branch-list.component';
import { getOrganizationBranchDetailDocument } from './components/organization-branch-detail/organization-branch-detail.component.graphql';
import { OrganizationBranchDetailComponent } from './components/organization-branch-detail/organization-branch-detail.component';

export default [
    registerRouteComponent({
        component: OrganizationListComponent,
        path: 'entity',
        title: 'Entidades',
        breadcrumb: 'Entidades',
    }),
    registerRouteComponent({
        path: 'entity/:id',
        component: OrganizationDetailComponent,
        query: getOrganizationDetailDocument,
        entityKey: 'organization',
        getBreadcrumbs: (entity) => [
            {
                label: 'Entidades',
                link: ['/extensions', 'organizations'],
            },
            {
                label: `#${entity?.id} (${entity?.name})`,
                link: [],
            },
        ],
    }),
    registerRouteComponent({
        component: OrganizationBranchListComponent,
        path: 'organization-branch',
        title: 'Rubros',
        breadcrumb: 'Rubros',
    }),
    registerRouteComponent({
        path: 'organization-branch/:id',
        component: OrganizationBranchDetailComponent,
        query: getOrganizationBranchDetailDocument,
        entityKey: 'organizationBranch',
        getBreadcrumbs: (entity) => [
            {
                label: 'Rubro',
                link: ['/extensions', 'organization-branch'],
            },
            {
                label: `#${entity?.id} (${entity?.name})`,
                link: [],
            },
        ],
    }),
    registerRouteComponent({
        component: OrganizationTypeListComponent,
        path: 'organization-type',
        title: 'Tipos de organizacion',
        breadcrumb: 'Tipo de organización',
    }),
    registerRouteComponent({
        path: 'organization-type/:id',
        component: OrganizationTypeDetailComponent,
        query: getOrganizationTypeDetailDocument,
        entityKey: 'organizationType',
        getBreadcrumbs: (entity) => [
            {
                label: 'Tipo de entidades',
                link: ['/extensions', 'organization-type'],
            },
            {
                label: `#${entity?.id} (${entity?.name})`,
                link: [],
            },
        ],
    }),
];
