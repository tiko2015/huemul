import { addNavMenuSection } from '@vendure/admin-ui/core';

export default [
    addNavMenuSection(
        {
            id: 'organizations',
            label: 'Organizaciones',
            items: [
                {
                    id: 'organization-list',
                    label: 'Entidades',
                    routerLink: ['/extensions/organizations/entity'],
                    icon: 'employee-group',
                },
                {
                    id: 'branch-list',
                    label: 'Rubros',
                    routerLink: ['/extensions/organizations/organization-branch'],
                    icon: 'tag',
                },
                {
                    id: 'types-list',
                    label: 'Tipos',
                    routerLink: ['/extensions/organizations/organization-type'],
                    icon: 'bullet-list',
                },
                {
                    id: 'event-list',
                    label: 'Eventos',
                    routerLink: ['#'],
                    icon: 'event',
                },
                {
                    id: 'post-list',
                    label: 'Anuncios',
                    routerLink: ['#'],
                    icon: 'bell',
                },
            ],
            requiresPermission: 'ReadOrganization',
        },
        'catalog'
    ),
];
